import React from "react";

const ROBOT_SIZE = 50;

// Icons live in public/ so they are always copied to dist; imported assets were being tree-shaken out of the build.
const BASE = import.meta.env.BASE_URL;
const DRIVE_TYPE_STYLES = {
  Drive: { bg: "#9E9E9E", icon: `${BASE}AutoScoringImages/DriveIcon.svg` },
  Shot: { bg: "#2196F3", icon: `${BASE}AutoScoringImages/ShotIcon.svg` },
};

/**
 * A single robot position marker on the field.
 */
function RobotMarker({ left, top, driveType, angle, showGlow }) {
  const style = DRIVE_TYPE_STYLES[driveType];

  const baseStyle = {
    width: `${ROBOT_SIZE}px`,
    height: `${ROBOT_SIZE}px`,
    border: "4px solid black",
    borderRadius: "10%",
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    zIndex: 10,
    transform: `rotate(${angle}deg)`,
    ...(showGlow ? { boxShadow: "0 0 10px 5px rgba(255, 152, 0, 0.7)" } : {}),
  };

  const backgroundStyle = style
    ? {
        background: style.bg,
        backgroundImage: `url(${style.icon})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "70%",
      }
    : {};

  return <div style={{ ...baseStyle, ...backgroundStyle }} />;
}

export default RobotMarker;
export { ROBOT_SIZE };
