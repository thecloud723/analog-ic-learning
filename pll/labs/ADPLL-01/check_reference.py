from dataclasses import replace
from statistics import mean

from adpll import Settings, simulate

base = Settings()
for lsb_ps in (0, 2, 8):
    config = replace(base, tdc_lsb_s=lsb_ps * 1e-12)
    rows = list(simulate(4096, config))
    tail = rows[-512:]
    assert rows == list(simulate(4096, config))
    for row in rows:
        assert row['control'] == 64 * row['coarse'] + row['fine']
        assert -512 <= row['control'] <= 511 and 0 <= row['fine'] < 64
        assert abs(row['true_error_cycles'] - row['measured_error_cycles']) <= 0.021
    correction = (base.fcw * base.reference_hz - base.nominal_hz) / base.fine_gain_hz
    assert abs(mean(row['integral'] for row in tail) - correction) < 1
    assert max(abs(row['true_error_cycles']) for row in tail) < 0.03
    print(lsb_ps, 'ps: tail integral =', mean(row['integral'] for row in tail),
          'peak phase error (cycles) =', max(abs(row['true_error_cycles']) for row in tail))

saturated = list(simulate(2048, replace(base, fcw=128)))
assert saturated[-1]['control'] == 511
assert max(abs(row['integral']) for row in saturated) <= 511
