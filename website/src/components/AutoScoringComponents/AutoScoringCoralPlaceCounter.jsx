import React from "react";

const AutoScoringCoralCounter = ({ name, count, setCount=() => {} }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      onClick={() => setCount(count + 1)}
    >
      <div
        style={{
          backgroundColor: "rgb(133, 133, 133, .50)",
          border: "0.5dvw solid #1D1E1E",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "2dvh",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "5dvh",
            fontWeight: "bold",
            paddingLeft: "1dvw",
          }}
        >
          {name}
        </h1>
        <h1
          style={{
            color: "white",
            fontSize: "7dvh",
            fontWeight: "bold",
            paddingRight: "1dvw",
          }}
        >
          {count}
        </h1>
      </div>
    </div>
  );
};

export default AutoScoringCoralCounter;
