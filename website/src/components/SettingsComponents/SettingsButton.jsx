import React from "react";

/**
 * A component consisting of a button that displays a question and toggles the given state when clicked.
 *
 * @param {number} width - The width of the button.
 * @param {number} height - The height of the button.
 * @param {string} question - The question to be displayed on the button.
 * @param {boolean} state - The current state of the button.
 * @param {function} setState - A function to update the state of the button.
 * @return {JSX.Element} The rendered button component.
 */
const SettingsButton = ({
  width = 90,
  height = 15,
  question = "Question",
  state,
  setState,
}) => {
  return (
    <>
      <div
        style={{
          width: `${width}dvw`,
          height: `${height}dvh`,
          backgroundColor: "#4A4A4A",
          border: "1.63dvh solid #1D1E1E",
          borderRadius: "3.49dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setState(!state)} // Toggles the state when the button is clicked
      >
        <h1
          style={{ color: "#FFFFFF", fontSize: "5.58dvh", fontWeight: "bold" }}
        >
          {question}
        </h1>
      </div>
    </>
  );
};

export default SettingsButton;
