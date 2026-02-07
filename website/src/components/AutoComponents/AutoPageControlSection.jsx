import React from "react";
import ProceedBackButton from "../ProceedBackButton";

const AutoPageControlSection = ({ stateStack, robotPositions, handleUndo, states}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "25%",
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
          Auto
        </h1>
      </div>

      <div
        style={{
          width: "100%",
          height: "75%",
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
          <div
            style={{
              width: "100%",
              height: "50%",
            }}
          >
            <ProceedBackButton
              mode={"auto"}
              stateStack={stateStack}
              nextPage={"game-start"}
              back={true}
              inputs={{
                ...(states?.inputs || {}),
                autoRobotPositions: robotPositions,
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1.63dvh solid #1D1E1E",
              backgroundColor: "#242424",
              borderRadius: "3.49dvh",
            }}
            onClick={handleUndo}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "5.58dvh",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Undo
            </h1>
          </div>
        </div>
        <div style={{ width: "50%", height: "100%" }}>
          <ProceedBackButton
            mode={"auto"}
            stateStack={stateStack}
            nextPage={"teleop-scoring"}
            inputs={{
              ...(states?.inputs || {}),
              autoRobotPositions: robotPositions,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoPageControlSection;
