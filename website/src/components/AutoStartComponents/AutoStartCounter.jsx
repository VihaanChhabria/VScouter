import React, { useState } from "react";

const AutoStartCounter = ({ coordX = 439, coordY = 40, startCounter, setStartCounter }) => {
  const [counter, setCounter] = useState(startCounter == null ? 1 : startCounter);

  const checkCounterAndSet = (setTo) => {
    if (setTo > 4) {
      setCounter(4);
    } else if (setTo < 1) {
      setCounter(1);
    } else {
      setCounter(setTo);
      setStartCounter(setTo);
    }
  };

  const plusMinusButtonStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "#BBBBBB",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plusMinusTextStyle = {
    color: "#000000",
    fontSize: "72px",
    fontWeight: "bold",
    userSelect: "none",
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#242424",
          borderRadius: "20px",
          width: "150px",
          height: "350px",
          position: "absolute",
          left: `${coordX}px`,
          top: `${coordY}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={plusMinusButtonStyle} onClick={() => checkCounterAndSet(counter + 1)}>
          <h1 style={plusMinusTextStyle}>+</h1>
        </div>
        <div
          style={{
            width: "100px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#FFFFFF", fontSize: "64px", fontWeight: "bold" }}>{counter}</h1>
        </div>
        <div style={plusMinusButtonStyle} onClick={() => checkCounterAndSet(counter - 1)}>
          <h1 style={plusMinusTextStyle}>−</h1>
        </div>
      </div>
    </>
  );
};

export default AutoStartCounter;
