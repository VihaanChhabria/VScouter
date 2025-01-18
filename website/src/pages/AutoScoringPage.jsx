import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AutoScoringCoralSection from "../components/AutoScoringComponents/AutoScoringCoral/AutoScoringCoralSection";
import AutoScoringAlgaeSection from "../components/AutoScoringComponents/AutoScoringAlgae/AutoScoringAlgaeSection";
import ProceedBackButton from "../components/ProceedBackButton";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  // const [farRing1, setFarRing1] = useState(
  //   states?.inputs?.autoRingStatuses?.farRing1 || "Not Picked"
  // );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "5dvh",
        gap: "5dvh",
      }}
    >
      <div style={{ width: "45%", height: "100%" }}>
        <AutoScoringCoralSection />
      </div>
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
            display: "flex",
            flexDirection: "column",
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
            Autonomous
          </h1>
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
                  nextPage={`/auto-start`}
                  back={true}
                  inputs={{
                    ...(states?.inputs || {}),
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50%",
                  backgroundColor: "gray",
                }}
              >undo (not done)</div>
            </div>
            <div style={{ width: "50%", height: "100%" }}>
              <ProceedBackButton
                nextPage={`/teleop-scoring`}
                inputs={{
                  ...(states?.inputs || {}),
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "55%" }}>
          <AutoScoringAlgaeSection />
        </div>
      </div>
    </div>
  );
};

export default AutoScoringPage;
