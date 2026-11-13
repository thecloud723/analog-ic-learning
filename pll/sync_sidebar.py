"""Regenerate the offline chapter sidebars from the chapter table in README.md."""

import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
GROUPS = (
    ("I · 系统总览", 4),
    ("II · 组成模块", 9),
    ("III · 控制与性能", 13),
    ("IV · 数字与分数合成", 17),
    ("V · 系统实验", 18),
)
SIDEBAR = re.compile(
    r'<aside\b[^>]*(?:id="chapterSidebar"|class="(?:chapters|side)")[^>]*>.*?</aside>',
    re.S,
)


def render_menu(rows, current):
    early = current <= 4
    compact = current >= 17
    group_class, title_class = (
        ("chapter-group", "chapter-group-title") if early else ("group", "group-name")
    )
    parts = ['<nav aria-label="18 章课程目录">']
    start = 0
    for title, end in GROUPS:
        parts.append(f'<div class="{group_class}"><div class="{title_class}">{title}</div>')
        if early:
            parts.append('<ol class="chapter-list">')
        for number, name, filename in rows[start:end]:
            active = int(number) == current
            aria = ' aria-current="page"' if active else ''
            if early:
                label = f'<span class="chapter-index">{number}</span><span>{escape(name)}</span>'
                css = 'chapter-link current' if active else 'chapter-link available'
            elif compact:
                label = f'{number} · {escape(name)}'
                css = 'active' if active else ''
            else:
                label = f'<strong>{number}</strong><span>{escape(name)}</span>'
                css = 'chapter active' if active else 'chapter'
            link = f'<a class="{css}" href="{escape(filename)}"{aria}>{label}</a>'
            if active and current == 1:
                link = f'<button class="{css}" id="chapter01" type="button"{aria}>{label}</button>'
            parts.append(f'<li>{link}</li>' if early else link)
        if early:
            parts.append('</ol>')
        parts.append('</div>')
        start = end
    parts.append('</nav>')
    return '\n'.join(parts)


def main():
    rows = re.findall(
        r'^\| (\d{2}) \| (.*?) \| \[打开\]\(chapters/([^/)]+)\) \|$',
        (ROOT / 'README.md').read_text(encoding='utf-8'),
        re.M,
    )
    if [int(row[0]) for row in rows] != list(range(1, 19)):
        raise ValueError('README.md must list chapters 01–18 in order')
    updates = []
    for number, _, filename in rows:
        path = ROOT / 'chapters' / filename
        page = path.read_text(encoding='utf-8')
        matches = list(SIDEBAR.finditer(page))
        if len(matches) != 1:
            raise ValueError(f'Expected one chapter sidebar in {filename}')
        sidebar = matches[0]
        header = re.split(r'<nav\b|<div class="group">|(?<=</h3>)', sidebar[0], maxsplit=1)[0]
        updated = page[:sidebar.start()] + header + render_menu(rows, int(number)) + '</aside>' + page[sidebar.end():]
        updates.append((path, page, updated))
    for path, page, updated in updates:
        if updated != page:
            path.write_text(updated, encoding='utf-8')


if __name__ == '__main__':
    main()
