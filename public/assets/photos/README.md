# Mock Photos — Replace With Your Real Images

These JPEG files are **labeled placeholders**. Keep the exact filenames when you replace them.

| File | Where it appears | Replace with |
|------|------------------|--------------|
| `groom.jpg` | Invitation — round portrait above groom name | Solo photo of Sayeethan (400×400 px) |
| `bride.jpg` | Invitation — round portrait above bride name | Solo photo of Prasanciya (400×400 px) |
| `couple-hero.jpg` | We Invite You section — soft background banner | Wide couple photo (1200×600 px) |
| `story-2019.jpg` | Our Story — How We Met | Photo from that period (800×600 px) |
| `story-2020.jpg` | Our Story — First Date | Photo from that period (800×600 px) |
| `story-2023.jpg` | Our Story — Together | Photo from that period (800×600 px) |
| `story-2025.jpg` | Our Story — The Proposal | Photo from that period (800×600 px) |
| `gallery-1.jpg` … `gallery-6.jpg` | Our Moments gallery | Any favourite couple photos (800×1000 px portrait) |

## Regenerate placeholders

If you delete a mock and want it back:

```bash
python3 scripts/generate-mock-photos.py
```

## Tips

- Use `.jpg` or `.jpeg` — keep the same filename
- Compress large photos before adding (under ~500 KB each is ideal for mobile)
- Portrait photos work best for groom, bride, and gallery slots
