import React, { useState } from "react";

const TextInput = ({ question = "Match Number", coordX = 10, coordY = 179.52, setTextValue }) => {
  const [upperText, setUpperText] = useState("");

  const typedText = (e) => {
    setUpperText(e.target.value.toUpperCase());
    
    if (setTextValue != "") {
      setTextValue(e.target.value);
    } else {
      setTextValue(null);
    }
  };

  return (
    <>
      <div
        style={{
          border: "7px solid #1D1E1E",
          width: "262.16px",
          height: "85.52px",
          backgroundColor: "#242424",
          borderRadius: "15px",
          position: "absolute",
          left: `${coordX}px`,
          top: `${coordY}px`,
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "24px",
            fontWeight: "bold",
            paddingLeft: "10px",
          }}
        >
          {question}
        </h1>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setUpperText(e.target.value.toUpperCase())}
          style={{
            border: "4px solid #1D1E1E",
            borderRadius: "10px",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            width: "242.44px",
            height: "38.18px",
            marginLeft: "4px",
            marginTop: "-4.5px",
          }}
        />
      </div>
    </>
  );
};

export default TextInput;
