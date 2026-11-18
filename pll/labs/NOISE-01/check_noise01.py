"""Analytical normalization, transfer, and integration checks for NOISE-01."""
import json
import math
from pathlib import Path
import unittest

from noise01 import budget, integrate, transfers

CFG = json.loads(Path(__file__).with_name('noise01-settings.json').read_text())


class NoiseBudgetTest(unittest.TestCase):
    def test_trapezoid_flat_and_inverse_square(self):
        lo, hi = 12_000, 20_000_000
        grid = [lo * (hi / lo) ** (i / 8192) for i in range(8193)]
        self.assertAlmostEqual(integrate(grid, [2e-15] * len(grid)), 2e-15 * (hi - lo), places=18)
        numerical = integrate(grid, [2e-5 / f**2 for f in grid])
        exact = 2e-5 * (1 / lo - 1 / hi)
        self.assertLess(abs(numerical / exact - 1), 1e-6)

    def test_complementary_and_limit(self):
        for frequency in (1, 1e3, 1e5, 1e7, 1e9):
            gain = transfers(frequency, CFG)
            self.assertAlmostEqual(abs(gain['reference'] / CFG['divide'] + gain['vco'] - 1), 0)
            self.assertEqual(gain['reference'], -gain['divider_pfd'])
        self.assertAlmostEqual(abs(transfers(1, CFG)['reference']), CFG['divide'], places=5)
        self.assertAlmostEqual(abs(transfers(1e9, CFG)['vco']), 1, places=5)

    def test_ssb_to_time_and_separate_spur(self):
        cfg = CFG | {'sources': {'buffer': {'ssb_floor_dbc_per_hz': -150}}}
        freqs, _, _, _, stats = budget(cfg)
        lo, hi = freqs[0], freqs[-1]
        scale = 2 * math.pi * stats['carrier_hz']
        self.assertAlmostEqual(stats['random_rms_time_s'], math.sqrt(2e-15 * (hi-lo)) / scale, places=26)
        self.assertAlmostEqual(stats['pm_spur_rms_time_s'], math.sqrt(2e-7) / scale, places=26)
        without = budget(cfg | {'pm_spurs': []})[-1]
        self.assertEqual(stats['random_rms_time_s'], without['random_rms_time_s'])
        self.assertGreater(stats['combined_rms_time_s_if_independent'], stats['random_rms_time_s'])

    def test_source_sum_and_band_order(self):
        freqs, psd, _, total, stats = budget(CFG)
        self.assertAlmostEqual(integrate(freqs, total), sum(stats['phase_variance_rad2_by_source'].values()))
        self.assertEqual(set(psd), set(CFG['sources']))
        low, _ = CFG['integration_hz']
        narrower = budget(CFG | {'integration_hz': [low, 500_000]})[-1]
        self.assertLess(narrower['random_rms_time_s'], stats['random_rms_time_s'])
        self.assertEqual(narrower['pm_spur_rms_time_s'], 0)
        finer = budget(CFG | {'points': 16385})[-1]
        self.assertLess(abs(finer['random_rms_time_s'] / stats['random_rms_time_s'] - 1), 1e-6)

    def test_invalid_density_and_duplicate_spur(self):
        with self.assertRaises(ValueError):
            budget(CFG | {'sources': {'charge_pump': {'one_sided_a2_per_hz': -1}}})
        with self.assertRaises(ValueError):
            budget(CFG | {'pm_spurs': CFG['pm_spurs'] * 2})


if __name__ == '__main__':
    unittest.main()
