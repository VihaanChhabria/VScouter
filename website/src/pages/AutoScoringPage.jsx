import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AutoScoringCoral from "../components/AutoScoringComponents/AutoScoringCoral/AutoScoringCoralSection";
import AutoScoringAlgaeSection from "../components/AutoScoringComponents/AutoScoringAlgae/AutoScoringAlgaeSection";

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
      <div style={{ width: "50%", height: "100%" }}>
        <AutoScoringCoral />
      </div>
      <div style={{ width: "50%", height: "100%" }}>
        <AutoScoringAlgaeSection />
      </div>
    </div>
  );
};

export default AutoScoringPage;
