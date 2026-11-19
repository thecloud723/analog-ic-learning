"""Write deterministic RTL vectors and verify the average and cancellation boundaries."""
import argparse
import random
from pathlib import Path
from fractions import Fraction

from mash_model import Mash, plan_word


def check_average(width):
    modulus = 1 << width
    for word in (0, 1, modulus // 3, modulus // 2, modulus - 1):
        for enabled in (False, True):
            model = Mash(width)
            count = 16384
            samples = [model.step(word, enabled, 1) for _ in range(count)]
            effective = Fraction(sum(row[1] for row in samples), modulus)
            for column in (2, 3, 4):
                measured_total = sum(row[column] for row in samples)
                assert abs(measured_total - effective) < 3
    assert plan_word(1, 2, width) == modulus // 2
    assert plan_word(7, 8, width) == 7 * modulus // 8


def write_vectors(path, width):
    model = Mash(width)
    limit = (1 << width) - 1
    rng = random.Random(111 + width)
    history = [(0, 0, 0)] * 3
    with path.open('w') as output:
        for i in range(4096):
            reset = int(i % 257 == 0)
            valid = int(rng.randrange(8) != 0)
            word = rng.choice([0, 1, limit, limit // 3, rng.randrange(limit+1)])
            enabled = i % 3 != 0
            amplitude = rng.choice([0, 1, limit, limit // 8])
            seed = rng.choice([0, 1, 0xace1, 0xffff])
            if reset:
                model.reset(seed)
                history = [(0, 0, 0)] * 3
                expected = (0, *model.outputs, *model.residues)
            else:
                expected = model.step(word, enabled, amplitude, valid)
                if valid:
                    _, used, y1, y2, y3, r1, r2, r3 = expected
                    a, b, c = history
                    modulus = limit + 1
                    assert modulus * y1 == used - (r1-a[0])
                    assert modulus * y2 == used - (r2-2*a[1]+b[1])
                    assert modulus * y3 == used - (r3-3*a[2]+3*b[2]-c[2])
                    history = [(r1, r2, r3), a, b]
            row = (reset, valid, word, int(enabled), amplitude, seed, *expected)
            output.write(' '.join(map(str, row)) + '\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('width', type=int)
    parser.add_argument('vectors', type=Path)
    args = parser.parse_args()
    check_average(args.width)
    write_vectors(args.vectors, args.width)
    print(f'WIDTH={args.width}: average conservation and 4096 RTL vectors')
