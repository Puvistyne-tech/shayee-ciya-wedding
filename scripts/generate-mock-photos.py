#!/usr/bin/env python3
"""Generate labeled mock JPEG placeholders via PPM + macOS sips."""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "photos"

# width, height, bg (r,g,b), accent (r,g,b), title, subtitle
MOCKS = [
    ("groom.jpg", 400, 400, (107, 26, 48), (212, 175, 55), "groom.jpg", "Groom portrait"),
    ("bride.jpg", 400, 400, (139, 115, 85), (245, 230, 216), "bride.jpg", "Bride portrait"),
    ("couple-hero.jpg", 1200, 600, (90, 45, 60), (212, 175, 55), "couple-hero.jpg", "We Invite You banner"),
    ("story-2019.jpg", 800, 600, (75, 55, 70), (212, 175, 55), "story-2019.jpg", "How We Met"),
    ("story-2020.jpg", 800, 600, (65, 75, 95), (212, 175, 55), "story-2020.jpg", "First Date"),
    ("story-2023.jpg", 800, 600, (85, 65, 55), (212, 175, 55), "story-2023.jpg", "Together"),
    ("story-2025.jpg", 800, 600, (95, 45, 65), (212, 175, 55), "story-2025.jpg", "The Proposal"),
    ("gallery-1.jpg", 800, 1000, (60, 70, 90), (245, 215, 142), "gallery-1.jpg", "Gallery photo 1"),
    ("gallery-2.jpg", 800, 1000, (70, 60, 85), (245, 215, 142), "gallery-2.jpg", "Gallery photo 2"),
    ("gallery-3.jpg", 800, 1000, (80, 55, 65), (245, 215, 142), "gallery-3.jpg", "Gallery photo 3"),
    ("gallery-4.jpg", 800, 1000, (55, 80, 75), (245, 215, 142), "gallery-4.jpg", "Gallery photo 4"),
    ("gallery-5.jpg", 800, 1000, (90, 65, 55), (245, 215, 142), "gallery-5.jpg", "Gallery photo 5"),
    ("gallery-6.jpg", 800, 1000, (65, 55, 90), (245, 215, 142), "gallery-6.jpg", "Gallery photo 6"),
]

# 5x7 bitmap font for printable ASCII
FONT: dict[str, list[str]] = {
    " ": ["00000"] * 7,
    "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
    ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
    "3": ["01110", "10001", "00001", "00110", "00001", "10001", "01110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
    "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
    "J": ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "Q": ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
    "X": ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "a": ["00000", "00000", "01110", "00001", "01111", "10001", "01111"],
    "b": ["10000", "10000", "10110", "11001", "10001", "10001", "11110"],
    "c": ["00000", "00000", "01110", "10000", "10000", "10001", "01110"],
    "d": ["00001", "00001", "01101", "10011", "10001", "10001", "01111"],
    "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
    "f": ["00110", "01001", "01000", "11100", "01000", "01000", "01000"],
    "g": ["00000", "00000", "01111", "10001", "01111", "00001", "01110"],
    "h": ["10000", "10000", "10110", "11001", "10001", "10001", "10001"],
    "i": ["00100", "00000", "01100", "00100", "00100", "00100", "01110"],
    "j": ["00010", "00000", "00110", "00010", "00010", "10010", "01100"],
    "k": ["10000", "10000", "10010", "10100", "11000", "10100", "10010"],
    "l": ["01100", "00100", "00100", "00100", "00100", "00100", "01110"],
    "m": ["00000", "00000", "11010", "10101", "10101", "10001", "10001"],
    "n": ["00000", "00000", "10110", "11001", "10001", "10001", "10001"],
    "o": ["00000", "00000", "01110", "10001", "10001", "10001", "01110"],
    "p": ["00000", "00000", "11110", "10001", "11110", "10000", "10000"],
    "q": ["00000", "00000", "01101", "10011", "01111", "00001", "00001"],
    "r": ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
    "s": ["00000", "00000", "01111", "10000", "01110", "00001", "11110"],
    "t": ["01000", "01000", "11110", "01000", "01000", "01001", "00110"],
    "u": ["00000", "00000", "10001", "10001", "10001", "10001", "01111"],
    "v": ["00000", "00000", "10001", "10001", "10001", "01010", "00100"],
    "w": ["00000", "00000", "10001", "10001", "10101", "10101", "01010"],
    "x": ["00000", "00000", "10001", "01010", "00100", "01010", "10001"],
    "y": ["00000", "00000", "10001", "10001", "01111", "00001", "01110"],
    "z": ["00000", "00000", "11111", "00010", "00100", "01000", "11111"],
}


def set_pixel(buf: bytearray, w: int, h: int, x: int, y: int, rgb: tuple[int, int, int]) -> None:
    if 0 <= x < w and 0 <= y < h:
        i = (y * w + x) * 3
        buf[i], buf[i + 1], buf[i + 2] = rgb


def fill_rect(
    buf: bytearray,
    w: int,
    h: int,
    x0: int,
    y0: int,
    x1: int,
    y1: int,
    rgb: tuple[int, int, int],
) -> None:
    for y in range(max(0, y0), min(h, y1)):
        for x in range(max(0, x0), min(w, x1)):
            set_pixel(buf, w, h, x, y, rgb)


def draw_text(
    buf: bytearray,
    w: int,
    h: int,
    x: int,
    y: int,
    text: str,
    scale: int,
    rgb: tuple[int, int, int],
) -> None:
    cursor = x
    for ch in text:
        glyph = FONT.get(ch, FONT["?"] if "?" in FONT else FONT[" "])
        for row_idx, row in enumerate(glyph):
            for col_idx, bit in enumerate(row):
                if bit == "1":
                    for sy in range(scale):
                        for sx in range(scale):
                            set_pixel(
                                buf,
                                w,
                                h,
                                cursor + col_idx * scale + sx,
                                y + row_idx * scale + sy,
                                rgb,
                            )
        cursor += (5 * scale) + scale


def text_width(text: str, scale: int) -> int:
    if not text:
        return 0
    return len(text) * (5 * scale + scale) - scale


def render_ppm(
    filename: str,
    width: int,
    height: int,
    bg: tuple[int, int, int],
    accent: tuple[int, int, int],
    title: str,
    subtitle: str,
) -> Path:
    buf = bytearray([bg[0], bg[1], bg[2]] * (width * height))

    border = max(8, min(width, height) // 40)
    fill_rect(buf, width, height, 0, 0, width, border, accent)
    fill_rect(buf, width, height, 0, height - border, width, height, accent)
    fill_rect(buf, width, height, 0, 0, border, height, accent)
    fill_rect(buf, width, height, width - border, 0, width, height, accent)

    inner_margin = border * 3
    fill_rect(
        buf,
        width,
        height,
        inner_margin,
        inner_margin,
        width - inner_margin,
        height - inner_margin,
        (
            min(255, bg[0] + 18),
            min(255, bg[1] + 18),
            min(255, bg[2] + 18),
        ),
    )

    title_scale = max(2, min(width, height) // 120)
    subtitle_scale = max(2, title_scale - 1)

    title_w = text_width(title, title_scale)
    subtitle_w = text_width(subtitle, subtitle_scale)
    title_h = 7 * title_scale
    subtitle_h = 7 * subtitle_scale
    gap = title_scale * 3
    block_h = title_h + gap + subtitle_h

    start_y = (height - block_h) // 2
    draw_text(
        buf,
        width,
        height,
        (width - title_w) // 2,
        start_y,
        title,
        title_scale,
        accent,
    )
    draw_text(
        buf,
        width,
        height,
        (width - subtitle_w) // 2,
        start_y + title_h + gap,
        subtitle,
        subtitle_scale,
        (245, 245, 245),
    )

    ppm_path = OUT_DIR / f"{filename}.ppm"
    jpg_path = OUT_DIR / filename
    with ppm_path.open("wb") as f:
        f.write(f"P6\n{width} {height}\n255\n".encode())
        f.write(buf)

    subprocess.run(
        ["sips", "-s", "format", "jpeg", str(ppm_path), "--out", str(jpg_path)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    ppm_path.unlink(missing_ok=True)
    return jpg_path


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for spec in MOCKS:
        path = render_ppm(*spec)
        print(f"Created {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
