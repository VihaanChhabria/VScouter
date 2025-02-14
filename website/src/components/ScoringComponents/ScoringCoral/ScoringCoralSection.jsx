import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringCoralPlaceMap from "./ScoringCoralPlaceMap";
import ScoringPickup from "../ScoringPickup";
import { toast } from "react-toastify";

const ScoringCoralSection = ({
  pickData,
  placeData,
  mode,
  coralPreloaded,
  setCoralPreloaded,
}) => {
  const [pickPositionSelected, setPickPositionSelected] = useState("");
  const [hideAutoCoralPreload, setHideAutoCoralPreload] = useState(false)

  useEffect(() => {
    if (coralPreloaded) {
      if (placeData.find((singlePlaceData) => singlePlaceData.count > 0)) {
        setHideAutoCoralPreload(true)
      } else {
        setHideAutoCoralPreload(false)
      }
    }
  }, [placeData]);

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
      <div
        style={{
          width: "90%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5dvh",
            fontWeight: "bold",
            marginBottom: 0,
          }}
        >
          Coral
        </h1>
        {mode == "auto" && hideAutoCoralPreload && (
          <div
            style={{
              width: "25%",
              height: "100%",
              backgroundColor: coralPreloaded ? "#507144" : "#242424",
              border: "1.63dvh solid #1D1E1E",
              borderRadius: "2dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
            onClick={() => setCoralPreloaded(!coralPreloaded)}
          >
            <h1
              style={{ color: "white", fontSize: "3.25dvh", fontWeight: "700" }}
            >
              Preload
            </h1>
          </div>
        )}
      </div>

      <div
        style={{ width: "80%", height: "70%", marginBottom: "1.5dvh" }}
        onClick={() => {
          if (pickPositionSelected == "") {
            toast.warn("Please select a pick position first .");
          }
        }}
      >
        <ScoringCoralPlaceMap
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeData={placeData}
          pickData={pickData}
        />
      </div>
      <div style={{ width: "90%", height: "15%" }}>
        <ScoringPickup
          pickPositions={pickData.map((singlePickData) => {
            return singlePickData.position;
          })}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          place={"Coral"}
        />
      </div>
    </div>
  );
};

export default ScoringCoralSection;