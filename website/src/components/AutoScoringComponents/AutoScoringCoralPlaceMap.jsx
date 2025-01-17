import React from "react";

import ReefSideView from "../../assets/AutoScoringMapImages/ReefSideView.png";
import AutoScoringCoralCounter from "./AutoScoringCoralPlaceCounter";

const AutoScoringCoralMap = ({
  pickPositionSelected,
  setPickPositionSelected,
  placeCounts,
  pickCounts
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
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index} style={{ width: "100%", height: "25%" }}>
              <AutoScoringCoralCounter
                position={`L${item}`}
                placeCount={placeCounts[index].count}
                setPlaceCount={placeCounts[index].setCount}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                pickCounts={pickCounts}
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
          <img src={ReefSideView} style={{ width: "75%", height: "800%" }} />

          <div
            style={{
              width: "100%",
              height: "200%",
            }}
          >
            <AutoScoringCoralCounter
                position={"Drop/Miss"}
                placeCount={placeCounts[placeCounts.length-1].count}
                setPlaceCount={placeCounts[placeCounts.length-1].setCount}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                pickCounts={pickCounts}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScoringCoralMap;