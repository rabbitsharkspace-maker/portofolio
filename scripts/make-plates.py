#!/usr/bin/env python3
"""Turn a folder of magenta-plate renders into the transparent webp stills the
gallery hangs.

The four stills of a scene set are rendered on one magenta plate at one camera,
and `src/data/cases.js` relies on them sharing a crop box: she holds her size
and her place while the scene under the reader changes, so the swap reads as one
person moving rather than four pictures cutting. Cropping each file to its own
content would break exactly that, so the box is the union across the whole set —
pass one set per run.

    python3 scripts/make-plates.py ~/Downloads/flow-fastresume

Every image in the folder is treated as one set and written to public/ip/ under
its own basename. Name the files before running; the basename becomes the URL.

    --out    destination directory (default: public/ip)
    --width  output width in px (default: 1100)
    --pad    margin kept around the content, in px (default: 24)
    --key    background colour to remove (default: ff00ff)
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageChops
except ImportError:
    sys.exit("Pillow is missing. Install it with: python3 -m pip install pillow")

SOURCES = {".png", ".jpg", ".jpeg", ".webp"}


def parse_hex(value):
    value = value.lstrip("#")
    if len(value) != 6:
        raise argparse.ArgumentTypeError("colour must be six hex digits, e.g. ff00ff")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def key_out(image, key, inner, outer):
    """Drop the background to transparent and pull the spill off the edges.

    Pixels within `inner` of the key colour go fully transparent, pixels beyond
    `outer` stay fully opaque, and the band between them ramps — which is what
    keeps curls and the fringe of a lace hem from turning into a hard stencil.
    """
    r, g, b = image.convert("RGB").split()
    kr, kg, kb = key

    # Channel maths rather than a per-pixel loop: a full-size render is several
    # million pixels, and in Python that is minutes per image instead of a blink.
    def spread(channel, level):
        flat = Image.new("L", image.size, level)
        return ImageChops.lighter(ImageChops.subtract(channel, flat),
                                  ImageChops.subtract(flat, channel))

    dist = ImageChops.lighter(ImageChops.lighter(spread(r, kr), spread(g, kg)),
                              spread(b, kb))

    span = max(outer - inner, 1)
    ramp = [0 if d <= inner else 255 if d >= outer else round(255 * (d - inner) / span)
            for d in range(256)]
    alpha = dist.point(ramp)

    # Magenta spill shows up as red and blue running ahead of green, so pulling
    # them back toward green kills the pink halo around the curls.
    #
    # Only at the edge, though. Warm skin and a mustard sleeve also carry more
    # red than green, and despilling those turns the whole figure pink — so the
    # correction is weighted by transparency: full where the plate shows through,
    # nil wherever the pixel is solidly her.
    excess = ImageChops.subtract(ImageChops.add(r, b, scale=2), g)
    edge = ImageChops.invert(alpha)
    r = Image.composite(ImageChops.lighter(ImageChops.subtract(r, excess), g), r, edge)
    b = Image.composite(ImageChops.lighter(ImageChops.subtract(b, excess), g), b, edge)

    return Image.merge("RGBA", (r, g, b, alpha))


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src", type=Path, help="folder holding one set of renders")
    ap.add_argument("--out", type=Path, default=Path("public/ip"))
    ap.add_argument("--width", type=int, default=1100)
    ap.add_argument("--pad", type=int, default=24)
    ap.add_argument("--key", type=parse_hex, default=(255, 0, 255))
    ap.add_argument("--inner", type=int, default=60,
                    help="distance from the key colour that counts as background")
    ap.add_argument("--outer", type=int, default=110,
                    help="distance beyond which a pixel is left alone")
    ap.add_argument("--aspect", type=float, default=None, metavar="H_OVER_W",
                    help="pad the box sideways to this height/width ratio; the "
                         "standing plates on the wall are 2.0")
    args = ap.parse_args()

    if not args.src.is_dir():
        sys.exit(f"not a folder: {args.src}")

    files = sorted(p for p in args.src.iterdir() if p.suffix.lower() in SOURCES)
    if not files:
        sys.exit(f"no images in {args.src}")

    print(f"keying {len(files)} images…")
    keyed = {}
    for path in files:
        with Image.open(path) as im:
            keyed[path] = key_out(im, args.key, args.inner, args.outer)
        print(f"  {path.name}")

    # One box for the set, not one per file.
    boxes = [im.getbbox() for im in keyed.values()]
    if any(b is None for b in boxes):
        sys.exit("one image came out fully transparent — check --key and --inner")

    left = min(b[0] for b in boxes)
    top = min(b[1] for b in boxes)
    right = max(b[2] for b in boxes)
    bottom = max(b[3] for b in boxes)

    any_image = next(iter(keyed.values()))
    left = max(0, left - args.pad)
    top = max(0, top - args.pad)
    right = min(any_image.width, right + args.pad)
    bottom = min(any_image.height, bottom + args.pad)

    # The gallery stage is height-constrained, so a plate narrower than the house
    # ratio renders a smaller figure in the same box — she would shrink beside
    # the Serene set for no reason anyone could name. Padding the box out to the
    # ratio costs empty background and keeps her the same size on the wall.
    if args.aspect:
        want = round((bottom - top) / args.aspect)
        grow = want - (right - left)
        if grow > 0:
            left = max(0, left - grow // 2)
            right = min(any_image.width, left + want)
            left = max(0, right - want)

    box = (left, top, right, bottom)

    args.out.mkdir(parents=True, exist_ok=True)
    height = round((bottom - top) * args.width / (right - left))
    print(f"shared crop {right - left}×{bottom - top} → {args.width}×{height}")

    for path, im in keyed.items():
        out = args.out / (path.stem + ".webp")
        im.crop(box).resize((args.width, height), Image.LANCZOS).save(
            out, "WEBP", quality=90, method=6)
        print(f"  → {out}  ({out.stat().st_size // 1024} KB)")

    print(f"\nratio for cases.js:  ratio: \"{args.width} / {height}\"")


if __name__ == "__main__":
    main()
