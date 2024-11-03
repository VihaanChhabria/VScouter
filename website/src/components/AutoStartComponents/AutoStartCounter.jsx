import React, { useState } from "react";

/**
 * A React functional component that renders a counter to select the auto start position.
 *
 * @param {number} coordX - The x-coordinate of the counter's position.
 * @param {number} coordY - The y-coordinate of the counter's position.
 * @param {number} startCounter - The initial value of the counter.
 * @param {function} setStartCounter - A function to update the initial value of the counter.
 * @return {JSX.Element} The rendered component.
 */
const AutoStartCounter = ({
  coordX = 47.1,
  coordY = 9.3,
  counter,
  setCounter,
}) => {
  const checkCounterAndSet = (setTo) => {
    if (setTo > 4) {
      setCounter(4);
    } else if (setTo < 1) {
      setCounter(1);
    } else {
      setCounter(setTo);
    }
  };

  const plusMinusButtonStyle = {
    width: "10.73dvw",
    height: "23.26dvh",
    backgroundColor: "#BBBBBB",
    borderRadius: "4.65dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plusMinusTextStyle = {
    color: "#000000",
    fontSize: "16.74dvh",
    fontWeight: "bold",
    userSelect: "none",
  };
  return (
    <>
      {/* Container */}
      <div
        style={{
          backgroundColor: "#242424",
          borderRadius: "4.65dvh",
          width: "16.09dvw",
          height: "81.4dvh",
          position: "absolute",
          left: `${coordX}dvw`,
          top: `${coordY}dvh`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Plus Button */}
        <div
          style={plusMinusButtonStyle}
          onClick={() => checkCounterAndSet(counter + 1)}
        >
          <h1 style={plusMinusTextStyle}>+</h1>
        </div>

        {/* Counter Number */}
        <div
          style={{
            width: "10.73dvw",
            height: "13.95dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "14.88dvh",
              fontWeight: "bold",
            }}
          >
            {counter}
          </h1>
        </div>

        {/* Minus Button */}
        <div
          style={plusMinusButtonStyle}
          onClick={() => checkCounterAndSet(counter - 1)}
        >
          <h1 style={plusMinusTextStyle}>−</h1>
        </div>
      </div>
    </>
  );
};

export default AutoStartCounter;
