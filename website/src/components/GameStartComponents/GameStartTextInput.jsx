import React, { useEffect, useState } from "react";

/**
 * A component that renders a text input with a given question and a button that saves the input to a given state.
 *
 * @param {string} question - The question to be displayed above the text input.
 * @param {number} coordX - The x-coordinate of the text input.
 * @param {number} coordY - The y-coordinate of the text input.
 * @param {string} defaultText - The default text of the text input.
 * @param {function} setTextValue - The function to set the text input value to.
 */
const TextInput = ({
  question = "Match Number",
  coordX = 10,
  coordY = 179.52,
  defaultText,
  setTextValue,
}) => {
  const [upperText, setUpperText] = useState(
    // If the defaultText is null, set the state to an empty string, otherwise set it to the defaultText in uppercase
    defaultText === null ? "" : defaultText.toUpperCase()
  );

  useEffect(() => {
    // If the upperText is not empty, set the textValue to the upperText, otherwise set it to null
    if (upperText != "") {
      setTextValue(upperText);
    } else {
      setTextValue(null);
    }
  }, [upperText]);

  return (
    <>
      <div
        style={{
          border: "7px solid #1D1E1E",
          width: "28.12vw",
          height: "19.89vh",
          backgroundColor: "#242424",
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58vh",
            fontWeight: "bold",
            paddingLeft: "1.07vw",
          }}
        >
          {question}
        </h1>
        <input
          type="text"
          value={upperText}
          onChange={(e) => setUpperText(e.target.value.toUpperCase())}
          style={{
            border: "0.93vh solid #1D1E1E",
            borderRadius: "2.33vh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            width: "26.01vw",
            height: "8.88vh",
            marginLeft: "0.43vw",
            marginTop: "-1.05vh",
            fontSize: "4.0vh",
          }}
        />
      </div>
    </>
  );
};

export default TextInput;
