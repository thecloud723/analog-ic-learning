"""Reference-clock ADPLL teaching model with a coarse/fine DCO and quantized TDC."""
import csv
from dataclasses import dataclass
import math
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    reference_hz: float = 40e6
    fcw: float = 125.125
    nominal_hz: float = 4.995e9
    fine_gain_hz: float = 100e3
    kp: float = 100
    ki: float = 12
    tdc_lsb_s: float = 2e-12


def simulate(samples, cfg=Settings()):
    """Yield post-measurement state. The computed control drives the next interval."""
    actual = target = integral = 0.0
    frequency = cfg.nominal_hz
    for index in range(1, samples + 1):
        actual += frequency / cfg.reference_hz
        target += cfg.fcw
        edges = math.floor(actual)
        # Time since the last DCO edge, converted to fractional cycles.
        elapsed = (actual - edges) / frequency
        measured_time = round(elapsed / cfg.tdc_lsb_s) * cfg.tdc_lsb_s if cfg.tdc_lsb_s else elapsed
        measured = edges + measured_time * frequency
        error = target - measured
        p = cfg.kp * error
        # Conditional integration prevents driving further into saturation.
        candidate = integral + cfg.ki * error
        if -512 <= p + candidate <= 511 or error * (p + candidate) < 0:
            integral = candidate
        control = max(-512, min(511, round(p + integral)))
        coarse, fine = divmod(control, 64)
        frequency = cfg.nominal_hz + cfg.fine_gain_hz * (64 * coarse + fine)
        yield dict(sample=index, target_cycles=target, dco_edges=edges, tdc_s=measured_time,
                   true_error_cycles=target - actual, measured_error_cycles=error, p=p,
                   integral=integral, control=control, coarse=coarse, fine=fine,
                   next_frequency_hz=frequency)


def save(output, samples=4096, cfg=Settings()):
    rows = list(simulate(samples, cfg))
    with output.open('x', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    return rows


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    parser.add_argument('--tdc-ps', type=float, default=2)
    args = parser.parse_args()
    if not math.isfinite(args.tdc_ps) or args.tdc_ps < 0:
        parser.error('--tdc-ps must be finite and nonnegative')
    save(args.output, cfg=Settings(tdc_lsb_s=args.tdc_ps * 1e-12))
