import React from 'react'

/**
 * A React component that renders a counter to select the endgame scoring trap count.
 *
 * @param {number} coordX - The x-coordinate of the counter's position.
 * @param {number} coordY - The y-coordinate of the counter's position.
 * @param {number} counter - The initial value of the counter.
 * @param {function} setCounter - A function to update the initial value of the counter.
 * @return {JSX.Element} The rendered component.
 */
const EndgameScoringTrapCounter = ({ coordX = 0, coordY = 0, counter, setCounter }) => {

  const checkCounterAndSet = (setTo) => {
    if (setTo > 3) {
      setCounter(3);
    } else if (setTo < 0) {
      setCounter(0);
    } else {
      setCounter(setTo);
    }
  };

  const plusMinusButtonStyle = {
    width: "8.91vw",
    height: "13.09vh",
    backgroundColor: "#BBBBBB",
    borderRadius: "4.65vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plusMinusTextStyle = {
    color: "#000000",
    fontSize: "11.16vh",
    fontWeight: "bold",
    userSelect: "none",
  };
  return (
    <>
      {/* Container */}
      <div
        style={{
          backgroundColor: "#242424",
          borderRadius: "4.65vh",
          width: "13.3vw",
          height: "41.86vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Plus Button */}
        <div style={plusMinusButtonStyle} onClick={() => checkCounterAndSet(counter + 1)}>
          <h1 style={plusMinusTextStyle}>+</h1>
        </div>

        {/* Counter Number */}
        <div
          style={{
            width: "8.87vw",
            height: "5vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#FFFFFF", fontSize: "7.44vh", fontWeight: "bold" }}>{counter}</h1>
        </div>

        {/* Minus Button */}
        <div style={plusMinusButtonStyle} onClick={() => checkCounterAndSet(counter - 1)}>
          <h1 style={plusMinusTextStyle}>−</h1>
        </div>
      </div>
    </>
  );
};

export default EndgameScoringTrapCounter
