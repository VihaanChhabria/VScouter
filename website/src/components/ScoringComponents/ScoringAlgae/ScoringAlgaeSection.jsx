import React, { useState } from "react";
import ScoringAlgaePlace from "./ScoringAlgaePlace";
import ScoringPickup from "../ScoringPickup";
import { toast } from "react-toastify";

const ScoringAlgaeSection = ({ pickData, placeData }) => {
  const [pickPositionSelected, setPickPositionSelected] = useState("");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#3B3B3B",
        borderColor: "#1D1E1E",
        borderWidth: "2dvh",
        borderRadius: "3.49dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: "7dvh", fontWeight: "bold" }}>
        Algae
      </h1>
      <div
        style={{ width: "90%", height: "45%", marginBottom: "2dvh" }}
        onClick={() => {
          if (pickPositionSelected == "") {
            toast.warn("Please select a pick position first.");
          }
        }}
      >
        <ScoringAlgaePlace
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeData={placeData}
          pickData={pickData}
        />
      </div>
      <div style={{ width: "90%", height: "25%", marginBottom: "2dvh" }}>
        <ScoringPickup
          pickPositions={pickData.map((singlePickData) => {return singlePickData.position})}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
        />
      </div>
    </div>
  );
};

export default ScoringAlgaeSection;
