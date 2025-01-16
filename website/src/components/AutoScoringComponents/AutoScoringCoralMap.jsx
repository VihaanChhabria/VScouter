import React from "react";

import ReefSideView from "../../assets/AutoScoringMapImages/ReefSideView.png";
import AutoScoringCoralCounter from "./AutoScoringCoralPlaceCounter";

const AutoScoringCoralMap = () => {
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
          <div style={{ width: "100%", height: "25%" }}>
            <AutoScoringCoralCounter name="L4" count={0} setCount={0} />
          </div>
          <div style={{ width: "100%", height: "25%" }}>
            <AutoScoringCoralCounter name="L3" count={0} setCount={0} />
          </div>
          <div style={{ width: "100%", height: "25%" }}>
            <AutoScoringCoralCounter name="L2" count={0} setCount={0} />
          </div>
          <div style={{ width: "100%", height: "25%" }}>
            <AutoScoringCoralCounter name="L1" count={0} setCount={0} />
          </div>
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
            <AutoScoringCoralCounter name="Drop/Miss" count={0} setCount={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScoringCoralMap;
