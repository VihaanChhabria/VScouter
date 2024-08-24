import React, { useState } from "react";

const AutoStartCounter = ({ coordX = 47.1, coordY = 9.3, startCounter, setStartCounter }) => {
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
    width: "10.73vw",
    height: "23.26vh",
    backgroundColor: "#BBBBBB",
    borderRadius: "4.65vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plusMinusTextStyle = {
    color: "#000000",
    fontSize: "16.74vh",
    fontWeight: "bold",
    userSelect: "none",
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#242424",
          borderRadius: "4.65vh",
          width: "16.09vw",
          height: "81.4vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
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
            width: "10.73vw",
            height: "13.95vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#FFFFFF", fontSize: "14.88vh", fontWeight: "bold" }}>{counter}</h1>
        </div>
        <div style={plusMinusButtonStyle} onClick={() => checkCounterAndSet(counter - 1)}>
          <h1 style={plusMinusTextStyle}>−</h1>
        </div>
      </div>
    </>
  );
};

export default AutoStartCounter;
