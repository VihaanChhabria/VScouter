import React from "react";
import MatchDataTypeButton from "./MatchDataTypeButton";

const MatchDataSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "5.58dvh",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Where are you getting your data from?
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10%",
          height: "25%",
          width: "100%",
        }}
      >
        <MatchDataTypeButton useOnline={true} />
        <MatchDataTypeButton useOnline={false} />
      </div>
    </div>
  );
};

export default MatchDataSection;
