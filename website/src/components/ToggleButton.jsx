import React from "react";

const ToggleButton = ({
  question,
  selected,
  setSelected,
  fontSize = "6dvh",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: selected ? "#507144" : "#242424",
        borderColor: "#1D1E1E",
        borderRadius: "3.49dvh",
        borderWidth: "1.63dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2dvh 1dvw",
      }}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: fontSize, fontWeight: "bold", textAlign: "center" }}>
        {question}
      </h1>
    </div>
  );
};

export default ToggleButton;
