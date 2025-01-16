import React from "react";
import AutoScoringCoralPickupButton from "./AutoScoringCoralPickupButton";

const AutoScoringCoralPickup = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1dvw",
      }}
    >
      {["Station", "Mark 1", "Mark 2", "Mark 3"].map((location) => (
        <div style={{ width: "100%", height: "100%", flex: 1 }}>
          <AutoScoringCoralPickupButton location={location} />
        </div>
      ))}
      {/* <div style={{ flex: 1 }}>
        <AutoScoringCoralPickupButton location="Left" />
      </div>
      
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: 1 }}></div> */}
    </div>
  );
};

export default AutoScoringCoralPickup;
