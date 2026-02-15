import React, { useState } from "react";
import ProceedBackButton from "../ProceedBackButton";

const HomeStartScoutingButton = () => {
  const [startScoutingClicked, setStartScoutingClicked] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!startScoutingClicked ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1.63dvh solid #1D1E1E",
            backgroundColor: "#242424",
            borderRadius: "3.49dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
          onClick={() => setStartScoutingClicked(true)}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Start Scouting
          </h1>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2dvh",
          }}
        >
          <ProceedBackButton
            nextPage={`game-start`}
            message={"Match Scouting"}
            onClick={() => setStartScoutingClicked(false)}
          />
          <ProceedBackButton
            nextPage={`pit-scouting/start-info`}
            message={"Pit Scouting"}
            onClick={() => setStartScoutingClicked(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HomeStartScoutingButton;
