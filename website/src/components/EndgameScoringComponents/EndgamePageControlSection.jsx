import React from "react";
import ProceedBackButton from "../ProceedBackButton";

const EndgamePageControlSection = ({ states, extraInputs }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1dvh",
      }}
    >
      <div style={{ flex: "0.25", width: "100%" }}>
        <ProceedBackButton
          back={true}
          nextPage="teleop-scoring"
          inputs={{
            ...(states?.inputs || {}),
            ...extraInputs,
          }}
        />
      </div>
      <div style={{ flex: "1", width: "100%" }}>
        <ProceedBackButton
          nextPage={`game-start`}
          inputs={{
            ...(states?.inputs || {}),
            ...extraInputs,
          }}
          message={"Submit"}
        />
      </div>
    </div>
  );
};

export default EndgamePageControlSection;
