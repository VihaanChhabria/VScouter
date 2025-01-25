import React from "react";

const EndgameScoringToggle = ({ question, selected, setSelected }) => {
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
      }}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: "6dvh", fontWeight: "bold" }}>
        {question}
      </h1>
    </div>
  );
};

export default EndgameScoringToggle;
