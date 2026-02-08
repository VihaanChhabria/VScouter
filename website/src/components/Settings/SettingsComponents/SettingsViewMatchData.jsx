import React from "react";

/**
 * @returns A component that displays the current match data stored in local storage.
 */
const SettingsViewMatchData = () => {
  return (
    <>
      <div
        style={{
          width: "95.71dvw",
          height: "70.47dvh",
          backgroundColor: "#242424",
          border: "1.3dvh solid #1D1E1E",
          borderRadius: "3.49dvh",
          position: "absolute",
          top: "24.88dvh",
          left: "2.15dvw",
          overflow: "scroll",
        }}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "2dvh" }}>
          {localStorage.getItem("scoutingData")}
        </h1>
      </div>
    </>
  );
};

export default SettingsViewMatchData;
