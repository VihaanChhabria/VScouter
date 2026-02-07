export const REAL_FIELD_SIZE = {
  width: 17.3736,
  height: 7.9248,
};

/**
 * Convert pixel X to meters (field coordinates).
 */
export function pixelsToMetersX(px, imageWidth, fieldWidth) {
  if (!imageWidth) return 0;
  return (px / imageWidth) * fieldWidth;
}

/**
 * Convert pixel Y to meters. Y axis is flipped (origin at bottom of image).
 */
export function pixelsToMetersY(py, imageHeight, fieldHeight) {
  if (!imageHeight) return 0;
  return ((imageHeight - py) / imageHeight) * fieldHeight;
}

/**
 * Convert meters X to pixels.
 */
export function metersToPixelsX(mx, imageWidth, fieldWidth) {
  if (!fieldWidth) return 0;
  return (mx / fieldWidth) * imageWidth;
}

/**
 * Convert meters Y to pixels. Y axis is flipped.
 */
export function metersToPixelsY(my, imageHeight, fieldHeight) {
  if (!fieldHeight) return 0;
  return imageHeight - (my / fieldHeight) * imageHeight;
}

/**
 * Angle in degrees from current position toward next position (in pixel space).
 * Used for rotating the robot marker.
 */
export function getAngleToNext(current, next, imagePixelSize, realFieldSize) {
  if (!next || !imagePixelSize?.width || !realFieldSize?.width) return 0;
  const { width: iw, height: ih } = imagePixelSize;
  const { width: fw, height: fh } = realFieldSize;
  const dx = metersToPixelsX(next.x, iw, fw) - metersToPixelsX(current.x, iw, fw);
  const dy = metersToPixelsY(next.y, ih, fh) - metersToPixelsY(current.y, ih, fh);
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

/**
 * Returns true if position is within range (in both X and Y) of the last position.
 * Uses the same box check as the original (positionRange in meters).
 */
export function isWithinPositionRange(position, lastPosition, rangeMeters) {
  if (!lastPosition) return false;
  const distanceX = Math.abs(position.x - lastPosition.x);
  const distanceY = Math.abs(position.y - lastPosition.y);
  return distanceX < rangeMeters && distanceY < rangeMeters;
}

/**
 * Clamp (imageX, imageY) to be inside the field image bounds.
 * Returns true if the point is inside bounds.
 */
export function isPointInsideField(imageX, imageY, imagePixelSize) {
  if (!imagePixelSize?.width || !imagePixelSize?.height) return false;
  return (
    imageX >= 0 &&
    imageY >= 0 &&
    imageX <= imagePixelSize.width &&
    imageY <= imagePixelSize.height
  );
}
