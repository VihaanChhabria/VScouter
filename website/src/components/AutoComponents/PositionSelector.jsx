import React, { useEffect, useRef, useState } from "react";
import FullFieldMap from "../../assets/FullFieldMap.png";
import DriveIcon from "../../assets/DriveIcon.svg";
import ShotIcon from "../../assets/ShotIcon.svg";
import { toast } from "react-toastify";

const PositionSelector = ({ driveType, robotPositions, setRobotPositions }) => {
  const fieldWidthPercent = 75;
  const robotSize = 50;

  const realFieldSize = {
    width: 17.3736,
    height: 7.9248,
  };

  const imageDivRef = useRef(null);
  const robotPositionsDivRef = useRef(null);

  const [imagePixelSize, setImagePixelSize] = useState({
    width: 0,
    height: 0,
  });

  const [imageOffset, setImageOffset] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const div = imageDivRef.current;
    if (!div) return;

    const rect = div.getBoundingClientRect();

    const imageWidthPixels = rect.width * ((fieldWidthPercent + 100) / 100);
    const imageHeightPixels = rect.height;

    // background-position: left center
    const offsetX = 0;
    const offsetY = (rect.height - imageHeightPixels) / 2;

    setImagePixelSize({
      width: imageWidthPixels,
      height: imageHeightPixels,
    });

    setImageOffset({
      x: offsetX,
      y: offsetY,
    });
  }, [window.innerWidth, window.innerHeight]);

  const pixelsToMetersX = (px) =>
    (px / imagePixelSize.width) * realFieldSize.width;
  const pixelsToMetersY = (py) =>
    ((imagePixelSize.height - py) / imagePixelSize.height) *
    realFieldSize.height;

  const metersToPixelsX = (mx) =>
    (mx / realFieldSize.width) * imagePixelSize.width;
  const metersToPixelsY = (my) =>
    imagePixelSize.height - (my / realFieldSize.height) * imagePixelSize.height;

  const handleClick = (event) => {
    if (!driveType) {
      toast.error("Drive type not specified.");
      return;
    }
    const rect = imageDivRef.current.getBoundingClientRect();

    const clickX = event.clientX - rect.left + 25;
    const clickY = event.clientY - rect.top + 25;

    const imageX = clickX - imageOffset.x;
    const imageY = clickY - imageOffset.y;

    if (
      imageX < 0 ||
      imageY < 0 ||
      imageX > imagePixelSize.width ||
      imageY > imagePixelSize.height
    ) {
      console.log("Clicked outside field image");
      toast.error("Please click within the field area.");
      return;
    }

    const positionRange = 0.3; // meters
    if (robotPositions.length > 0) {
      const lastPos = robotPositions[robotPositions.length - 1];
      const distanceX = Math.abs(pixelsToMetersX(imageX) - lastPos.x);
      const distanceY = Math.abs(pixelsToMetersY(imageY) - lastPos.y);

      if (distanceX < positionRange && distanceY < positionRange) {
        console.log("Clicked too close to the last robot position");
        toast.error("Position is too close to the last robot placement.");
        return;
      }
    }

    const fieldX = pixelsToMetersX(imageX);
    const fieldY = pixelsToMetersY(imageY);

    console.log(`Meters: X: ${fieldX.toFixed(2)} m, Y: ${fieldY.toFixed(2)} m`);
    setRobotPositions((prev) => [
      ...prev,
      { x: fieldX, y: fieldY, driveType: driveType },
    ]);
  };

  useEffect(() => {
    robotPositionsDivRef.current.innerHTML = "";
    robotPositions.forEach((position, index) => {
      var div = document.createElement(`robot-position-${index}`);
      div.style.width = `${robotSize}px`;
      div.style.height = `${robotSize}px`;

      const styles = {
        Drive: { bg: "#9E9E9E", icon: DriveIcon },
        Shot: { bg: "#2196F3", icon: ShotIcon },
      };

      const style = styles[position.driveType];
      if (style) {
        div.style.background = style.bg;
        div.style.backgroundImage = `url(${style.icon})`;
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundPosition = "center";
        div.style.backgroundSize = "70%";

        const targetPos =
          position.driveType === "Drive"
            ? robotPositions[index + 1] // next position for drive
            : { x: 4.633, y: 4.04 }; // goal position for shot
        const angle = getAngleToNext(position, targetPos);
        div.style.transform = `rotate(${angle}deg)`;
      }

      div.style.border = "4px solid black";
      div.style.borderRadius = "10%";
      div.style.position = "absolute";
      div.style.left = `${metersToPixelsX(position.x)}px`;
      div.style.top = `${metersToPixelsY(position.y)}px`;
      div.style.zIndex = 10;

      robotPositionsDivRef.current.appendChild(div);
    });
  }, [robotPositions, window.innerWidth, window.innerHeight]);

  const getAngleToNext = (current, next) => {
    if (!next) return 0;
    const dx = metersToPixelsX(next.x) - metersToPixelsX(current.x);
    const dy = metersToPixelsY(next.y) - metersToPixelsY(current.y);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle;
  };

  const generateSplinePath = (points) => {
    if (points.length < 2) return "";

    const toPx = (p) => ({
      x: metersToPixelsX(p.x) + robotSize / 2,
      y: metersToPixelsY(p.y) + robotSize / 2,
    });

    const pts = points.map(toPx);

    let d = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return d;
  };

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
          backgroundSize: `${fieldWidthPercent + 100}% 100%`,
          cursor: "crosshair",
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
            d={generateSplinePath(robotPositions)}
            fill="none"
            stroke="#ff9800"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 6"
          />
        </svg>

        <div ref={robotPositionsDivRef}></div>
      </div>
    </div>
  );
};

export default PositionSelector;
