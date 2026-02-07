import React from "react";
import ProceedBackButton from "../ProceedBackButton";

const PageControlSection = ({
  stateStack,
  handleUndo,
  states,
  extraInputs,
  pageTitle,
}) => {
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
          {pageTitle}
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
              mode={pageTitle.toLowerCase()}
              stateStack={stateStack}
              nextPage={pageTitle === "Auto" ? "game-start" : "teleop-scoring"}
              back={true}
              inputs={{
                ...(states?.inputs || {}),
                ...extraInputs,
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
            mode={pageTitle.toLowerCase()}
            stateStack={stateStack}
            nextPage={
              pageTitle === "Auto" ? "teleop-scoring" : "endgame-scoring"
            }
            inputs={{
              ...(states?.inputs || {}),
              ...extraInputs,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageControlSection;
