import {
  metersToPixelsX,
  metersToPixelsY,
  REAL_FIELD_SIZE,
} from "./fieldMath.js";

/**
 * Generate a cubic spline SVG path d string through the given points (in meters).
 * Points are converted to pixel space using image dimensions; path is offset by half robot size.
 */
export function generateSplinePath(points, imagePixelSize, robotSize = 50) {
  if (!points?.length || points.length < 2) return "";
  if (!imagePixelSize?.width || !imagePixelSize?.height) return "";

  const { width: iw, height: ih } = imagePixelSize;
  const { width: fw, height: fh } = REAL_FIELD_SIZE;

  const toPx = (p) => ({
    x: metersToPixelsX(p.x, iw, fw) + robotSize / 2,
    y: metersToPixelsY(p.y, ih, fh) + robotSize / 2,
  });

  const pts = points.map(toPx);
  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}
