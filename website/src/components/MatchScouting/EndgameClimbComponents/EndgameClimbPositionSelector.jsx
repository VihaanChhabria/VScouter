import React from "react";
import BlueClimbImage from "../../../assets/EndgameClimbImages/BlueClimbImage.png";
import RedClimbImage from "../../../assets/EndgameClimbImages/RedClimbImage.png";

const EndgameClimbPositionSelector = ({
  alliance,
  climbPosition,
  setClimbPosition,
  flipField = false,
}) => {
  const isBlue = alliance === "blueAlliance";

  // Red: top = "depot", middle = "middle", bottom = "outpost"
  // Blue: top = "outpost", middle = "middle", bottom = "depot"
  const getPositionForZone = (zone) => {
    const normalizedZone = flipField
      ? zone === "top"
        ? "bottom"
        : zone === "bottom"
          ? "top"
          : zone
      : zone;
    if (normalizedZone === "middle") return "middle";
    if (isBlue) {
      return normalizedZone === "top" ? "outpost" : "depot";
    }
    return normalizedZone === "top" ? "depot" : "outpost";
  };

  const buttonZones = [
    { zone: "top", heightPercent: 25, label: getPositionForZone("top") },
    { zone: "middle", heightPercent: 50, label: getPositionForZone("middle") },
    { zone: "bottom", heightPercent: 25, label: getPositionForZone("bottom") },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "4dvh",
          fontWeight: "bold",
          width: "100%",
          textAlign: "center",
          marginTop: "1dvh",
          marginBottom: "1dvh",
        }}
      >
        Select where the robot climbed
      </h1>
      <img
        src={isBlue ? BlueClimbImage : RedClimbImage}
        style={{
          width: "100%",
          height: "91%",
          objectFit: "fill",
          display: "block",
          borderRadius: "1.5dvh",
          transform: flipField ? "scale(-1, -1)" : undefined,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "9.5%",
          left: flipField ? (isBlue ? undefined : 0) : isBlue ? 0 : undefined,
          right: flipField ? (isBlue ? 0 : undefined) : isBlue ? undefined : 0,
          width: "50%",
          height: "90.5%",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            pointerEvents: "auto",
          }}
        >
          {buttonZones.map(({ zone, heightPercent, label }) => (
            <button
              key={zone}
              type="button"
              onClick={() => {
                if (climbPosition === label) {
                  setClimbPosition("");
                  return;
                }
                setClimbPosition(label);
              }}
              style={{
                flex: heightPercent === 50 ? 2 : 1,
                minHeight: 0,
                backgroundColor: "rgb(133, 133, 133, .50)",
                border: "2px solid rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
              }}
            >
              {climbPosition === label ? (
                <h1
                  style={{
                    color: "white",
                    fontSize: "3.5dvh",
                    fontWeight: "bold",
                    paddingLeft: "1dvw",
                  }}
                >
                  ✓ {label}
                </h1>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EndgameClimbPositionSelector;
