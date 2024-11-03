import React from "react";

/**
 * A toggle button component that renders a question and allows the user to toggle the state.
 *
 * @param {number} coordX - The x-coordinate of the button.
 * @param {number} coordY - The y-coordinate of the button.
 * @param {number} width - The width of the button.
 * @param {number} height - The height of the button.
 * @param {string} question - The question to be displayed on the button.
 * @param {boolean} state - The current state of the button.
 * @param {function} setState - A function to update the state of the button.
 * @return {JSX.Element} The rendered toggle button component.
 */
const ToggleButton = ({
  coordX = 0,
  coordY = 0,
  width = 10,
  height = 10,
  question = "Question",
  state,
  setState,
}) => {
  return (
    <>
      <div
        style={{
          width: `${width}vw`,
          height: `${height}vh`,
          backgroundColor: "#4A4A4A",
          border: `${state ? "4.65" : "1.63"}vh solid #1D1E1E`, // Increases border size if state is true
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setState(!state)}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>{question}</h1>
      </div>
    </>
  );
};

export default ToggleButton;
