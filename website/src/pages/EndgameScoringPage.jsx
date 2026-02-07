import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import EndgamePageControlSection from "../components/EndgameScoringComponents/EndgamePageControlSection";
import ToggleButton from "../components/ToggleButton";
import SelectOptions from "../components/SelectOptions";

const EndgameScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [comment, setComment] = useState(states?.inputs?.comment || "");

  const [brokenDown, setBrokenDown] = useState(states?.inputs?.broken || false);
  const [brokenDownTime, setBrokenDownTime] = useState(
    states?.inputs?.brokenDownTime || null,
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "2dvh",
        padding: "4dvh 2dvw",
      }}
    >
      <div
        style={{
          height: "100%",
          flex: 0.75 / 2,
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
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.5dvh",
            fontWeight: "bold",
          }}
        >
          Defense
        </h1>
      </div>
      <div
        style={{
          height: "100%",
          flex: 0.75 / 2,
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
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.5dvh",
            fontWeight: "bold",
            marginBottom: "2dvh",
            marginTop: "1dvh",
          }}
        >
          Broken
        </h1>

        <div
          style={{
            paddingLeft: "1.5dvw",
            paddingRight: "1.5dvw",
            width: "100%",
            height: "20%",
          }}
        >
          <ToggleButton
            question={"Broken Down?"}
            selected={brokenDown}
            setSelected={(value) => setBrokenDown(value)}
            fontSize={"4dvh"}
          />
        </div>

        {brokenDown && (
          <div style={{ width: "100%", height: "80%", padding: "0 1.5dvw" }}>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "3dvh",
                fontWeight: "500",
                margin: "1.5dvh 0",
              }}
            >
              How Long Was the Robot Broken Down For?
            </h1>
            <div style={{ width: "100%", height: "75%" }}>
              <SelectOptions
                optionsData={["Shortly", "A Lot", "Whole Match"]}
                optionSelected={brokenDownTime}
                setOptionSelected={(value) => setBrokenDownTime(value)}
                flexDirection={"column"}
              />
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          height: "100%",
          flex: 0.25,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1dvh",
        }}
      >
        <textarea
          style={{
            width: "100%",
            flex: 0.6,
            border: "0.93dvh solid #1D1E1E",
            borderRadius: "2.33dvh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            fontSize: "3.0dvh",
            padding: "1.56dvh",
          }}
          onChange={(e) => setComment(e.target.value)}
          id="comments"
          defaultValue={comment}
          placeholder="Enter Comments Here"
        />
        <div style={{ flex: 0.4, width: "100%" }}>
          <EndgamePageControlSection
            states={states}
            extraInputs={{ comment }}
          />
        </div>
      </div>
    </div>
  );
};

export default EndgameScoringPage;
