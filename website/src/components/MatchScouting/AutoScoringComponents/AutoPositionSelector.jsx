import React, { useEffect, useRef, useState } from "react";
import FullFieldMap from "../../../assets/FullFieldMap.png";
import { toast } from "react-toastify";

import {
  REAL_FIELD_SIZE,
  pixelsToMetersX,
  pixelsToMetersY,
  metersToPixelsX,
  metersToPixelsY,
  getAngleToNext,
  isWithinPositionRange,
  isPointInsideField,
} from "./fieldMath.js";
import { generateSplinePath } from "./pathUtils.js";
import RobotMarker, { ROBOT_SIZE } from "./RobotMarker.jsx";

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const FIELD_WIDTH_PERCENT = 75;
const POSITION_RANGE_METERS = 0.3;
const GOAL_POSITION = { x: 4.633, y: 4.04 };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const AutoPositionSelector = ({
  driveType,
  robotPositions,
  setRobotPositions,
  showShotInfo,
}) => {
  const imageDivRef = useRef(null);

  const [imagePixelSize, setImagePixelSize] = useState({
    width: 0,
    height: 0,
  });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [glowOn, setGlowOn] = useState(false);

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const div = imageDivRef.current;
    if (!div) return;

    const updateSize = () => {
      const rect = div.getBoundingClientRect();
      const imageWidthPixels = rect.width * ((FIELD_WIDTH_PERCENT + 100) / 100);
      const imageHeightPixels = rect.height;
      const offsetX = 0;
      const offsetY = (rect.height - imageHeightPixels) / 2;

      setImagePixelSize({ width: imageWidthPixels, height: imageHeightPixels });
      setImageOffset({ x: offsetX, y: offsetY });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(div);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const lastIndex = robotPositions.length - 1;
    if (lastIndex < 0) return;
    if (robotPositions[lastIndex].driveType !== "Shot" || !showShotInfo) return;

    let timeoutId;
    const id = setInterval(() => {
      setGlowOn(true);
      timeoutId = setTimeout(() => setGlowOn(false), 500);
    }, 1000);

    return () => {
      clearInterval(id);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [robotPositions, showShotInfo]);

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  const handleClick = (event) => {
    if (!driveType) {
      toast.error("Drive type not specified.");
      return;
    }

    const rect = imageDivRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = event.clientX - rect.left + 25;
    const clickY = event.clientY - rect.top + 25;
    const imageX = clickX - imageOffset.x;
    const imageY = clickY - imageOffset.y;

    if (!isPointInsideField(imageX, imageY, imagePixelSize)) {
      console.log("Clicked outside field image");
      toast.error("Please click within the field area.");
      return;
    }

    const fieldX = pixelsToMetersX(
      imageX,
      imagePixelSize.width,
      REAL_FIELD_SIZE.width,
    );
    const fieldY = pixelsToMetersY(
      imageY,
      imagePixelSize.height,
      REAL_FIELD_SIZE.height,
    );
    const newPosition = { x: fieldX, y: fieldY };

    const lastPos =
      robotPositions.length > 0
        ? robotPositions[robotPositions.length - 1]
        : null;
    if (isWithinPositionRange(newPosition, lastPos, POSITION_RANGE_METERS)) {
      console.log("Clicked too close to the last robot position");
      toast.error("Position is too close to the last robot placement.");
      return;
    }

    console.log(`Meters: X: ${fieldX.toFixed(2)} m, Y: ${fieldY.toFixed(2)} m`);
    setRobotPositions((prev) => [...prev, { ...newPosition, driveType }]);
  };

  // ---------------------------------------------------------------------------
  // Derived values (for render)
  // ---------------------------------------------------------------------------

  const splinePathD = generateSplinePath(
    robotPositions,
    imagePixelSize,
    ROBOT_SIZE,
  );

  const lastIndex = robotPositions.length - 1;
  const lastIsShotAndNeedsInfo =
    lastIndex >= 0 &&
    robotPositions[lastIndex].driveType === "Shot" &&
    showShotInfo;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={imageDivRef}
        onClick={handleClick}
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${FullFieldMap})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: `${FIELD_WIDTH_PERCENT + 100}% 100%`,
          cursor: "crosshair",
          borderRadius: "1.5dvh",
        }}
      >
        <svg
          width={imagePixelSize.width}
          height={imagePixelSize.height}
          style={{
            position: "absolute",
            left: imageOffset.x,
            top: imageOffset.y,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <path
            d={splinePathD}
            fill="none"
            stroke="#ff9800"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 6"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: imageOffset.x,
            top: imageOffset.y,
            width: imagePixelSize.width,
            height: imagePixelSize.height,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {robotPositions.map((position, index) => {
            const targetPos =
              position.driveType === "Drive"
                ? robotPositions[index + 1]
                : GOAL_POSITION;
            const angle = getAngleToNext(
              position,
              targetPos,
              imagePixelSize,
              REAL_FIELD_SIZE,
            );
            const left = metersToPixelsX(
              position.x,
              imagePixelSize.width,
              REAL_FIELD_SIZE.width,
            );
            const top = metersToPixelsY(
              position.y,
              imagePixelSize.height,
              REAL_FIELD_SIZE.height,
            );
            const showGlow =
              lastIsShotAndNeedsInfo && index === lastIndex && glowOn;

            return (
              <RobotMarker
                key={index}
                left={left}
                top={top}
                driveType={position.driveType}
                angle={angle}
                showGlow={showGlow}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AutoPositionSelector;
