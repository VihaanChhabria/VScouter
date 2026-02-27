import React, { useState, useEffect } from "react";
import ProceedBackButton from "../../components/ProceedBackButton";
import ToggleButton from "../../components/ToggleButton";
import FullFieldMapImg from "../../assets/FullFieldMap.png";

const FLIP_FIELD_KEY = "flipField";

const FlipFieldSettingsPage = () => {
  const [flipField, setFlipField] = useState(() => {
    const stored = localStorage.getItem(FLIP_FIELD_KEY);
    return stored !== null ? stored === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem(FLIP_FIELD_KEY, String(flipField));
  }, [flipField]);

  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        flexDirection: "column",
        padding: "2dvh 2dvw",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: "0 0 20dvh",
          minHeight: "20dvh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2dvh 2dvw",
          gap: "2dvw",
        }}
      >
        <div
          style={{
            width: "15dvw",
            height: "100%",
            flexShrink: 0,
          }}
        >
          <ProceedBackButton nextPage="settings/match-scouting" back={true} />
        </div>
        <h1
          style={{
            flex: 1,
            color: "#FFFFFF",
            fontSize: "8dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Flip Field
        </h1>
        <div style={{ width: "15dvw", minWidth: "15dvw", flexShrink: 0 }} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2dvh",
          overflow: "auto",
          padding: "2dvh 8dvw",
        }}
      >
        <p
          style={{
            color: "#FFFFFF",
            fontSize: "4dvh",
            margin: 0,
            textAlign: "center",
          }}
        >
          Are you facing the correct way based on the map below? Look at the
          outpost and depot positions to confirm your orientation.
        </p>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "row",
            gap: "2dvw",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={FullFieldMapImg}
              alt="Full field map - Red left, Blue right, central depot, outposts at far ends"
              style={{
                maxWidth: "100%",
                maxHeight: "50dvh",
                objectFit: "contain",
                borderRadius: "1dvh",
                transform: flipField ? "none" : "scaleX(-1)",
              }}
            />
          </div>
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", height: "50%" }}>
              <ToggleButton
                question={"Flip Field"}
                selected={!flipField}
                setSelected={() => setFlipField(!flipField)}
                fontSize="5dvh"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipFieldSettingsPage;
