import React from "react";
import DriveIcon from "../../../assets/DriveIcon.svg";
import ShotIcon from "../../../assets/ShotIcon.svg";

const ROBOT_SIZE = 50;

const DRIVE_TYPE_STYLES = {
  Drive: { bg: "#9E9E9E", icon: DriveIcon },
  Shot: { bg: "#2196F3", icon: ShotIcon },
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
    ...(showGlow
      ? { boxShadow: "0 0 10px 5px rgba(255, 152, 0, 0.7)" }
      : {}),
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
