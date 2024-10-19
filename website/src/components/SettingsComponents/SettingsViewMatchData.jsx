import React from "react";

/**
 * @returns A component that displays the current match data stored in local storage.
 */
const SettingsViewMatchData = () => {
  return (
    <>
      <div
        style={{
          width: "95.71vw",
          height: "70.47vh",
          backgroundColor: "#242424",
          border: "7px solid #1D1E1E",
          borderRadius: "3.49vh",
          position: "absolute",
          top: "24.88vh",
          left: "2.15vw",
          overflow: "scroll",
        }}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "2vh" }}>{localStorage.getItem("scoutingData")}</h1>
      </div>
    </>
  );
};

export default SettingsViewMatchData;
