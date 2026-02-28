import React from "react";
import ProceedBackButton from "../../ProceedBackButton";

const EndgameClimbControlSection = ({ states, extraInputs }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "8dvh",
            fontWeight: "bold",
          }}
        >
          Endgame Climb
        </h1>
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "2dvw",
          paddingLeft: "2dvw",
          paddingRight: "2dvw",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.5dvh",
          }}
        >
          <ProceedBackButton
            nextPage={"teleop-scoring"}
            back={true}
            inputs={{
              ...(states?.inputs || {}),
              ...extraInputs
            }}
          />
        </div>

        <div style={{ width: "50%", height: "100%" }}>
          <ProceedBackButton
            nextPage={"endgame-scoring"}
            inputs={{
              ...(states?.inputs || {}),
              ...extraInputs
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EndgameClimbControlSection;
