import React, { useEffect } from "react";

import ReefSideView from "../../../assets/AutoScoringImages/ReefSideView.png";
import ScoringCoralPlaceCounter from "./ScoringCoralPlaceCounter";

const AutoScoringCoralMap = ({
  pickPositionSelected,
  setPickPositionSelected,
  placeData,
  pickData,
}) => {
  
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "80%",
            zIndex: 1,
            color: "white",
            fontSize: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[4, 3, 2, 1].map((item, index) => (
            <div key={index} style={{ width: "100%", height: "25%" }}>
              <ScoringCoralPlaceCounter
                position={`L${item}`}
                placeCount={placeData[index].count}
                setPlaceCount={placeData[index].setCount}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                pickData={pickData}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={ReefSideView} style={{ width: "75%", height: "80%" }} />

          <div
            style={{
              width: "100%",
              height: "20%",
            }}
          >
            <ScoringCoralPlaceCounter
              position={"Drop/Miss"}
              placeCount={placeData[placeData.length - 1].count}
              setPlaceCount={placeData[placeData.length - 1].setCount}
              pickPositionSelected={pickPositionSelected}
              setPickPositionSelected={setPickPositionSelected}
              pickData={pickData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScoringCoralMap;
