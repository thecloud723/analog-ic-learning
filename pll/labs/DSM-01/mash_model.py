"""Bit-accurate finite-width MASH 1-1-1 with one registered output stage."""
from dataclasses import dataclass


def plan_word(numerator, denominator, width):
    """Round NUM/DEN to the closest W-bit word, half up, then clamp to [0, 2**W-1]."""
    if width < 2 or not 0 <= numerator < denominator:
        raise ValueError('Expected W >= 2 and 0 <= NUM < DEN')
    modulus = 1 << width
    return min(modulus - 1, (2 * numerator * modulus + denominator) // (2 * denominator))


@dataclass
class Mash:
    width: int

    def __post_init__(self):
        if self.width < 2:
            raise ValueError('WIDTH must be at least 2')
        self.modulus = 1 << self.width
        self.reset(1)

    def reset(self, seed):
        self.residues = (0, 0, 0)
        self.c2 = self.c3 = self.older3 = 0
        self.lfsr = (seed & 0xffff) or 1
        self.outputs = (0, 0, 0, 0)

    def step(self, word, enabled=False, amplitude=0, valid=True):
        if not valid:
            return (0, *self.outputs, *self.residues)
        if not 0 <= word < self.modulus or not 0 <= amplitude < self.modulus:
            raise ValueError('Input word and dither amplitude must fit WIDTH')
        bit = self.lfsr & 1
        dither = amplitude * (bit - ((self.lfsr >> 1) & 1)) if enabled else 0
        used = min(self.modulus - 1, max(0, word + dither))
        self.lfsr = (self.lfsr >> 1) ^ (0xb400 if bit else 0)
        carries = []
        residues = []
        for residue in self.residues:
            carry, used_residue = divmod(residue + (residues[-1] if residues else used), self.modulus)
            carries.append(carry)
            residues.append(used_residue)
        c1, c2, c3 = carries
        second = c1 + c2 - self.c2
        third = second + c3 - 2*self.c3 + self.older3
        self.c2, self.older3, self.c3 = c2, self.c3, c3
        self.residues = tuple(residues)
        self.outputs = (used, c1, second, third)
        return (1, *self.outputs, *self.residues)
