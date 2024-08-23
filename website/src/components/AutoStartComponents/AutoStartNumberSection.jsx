import React from "react";

const AutoStartNumberSection = ({
  number = "1",
  coordX = 0,
  coordY = 0,
  width = 101,
  height = 71,
  rotate = false,
}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${coordX}px`,
          top: `${coordY}px`,
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "rgba(217, 217, 217, 0.5)",
          border: "5px solid #5A5A5A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <h1 style={{ color: "#000000", fontSize: "24px" }}>{number}</h1>
      </div>
    </>
  );
};

export default AutoStartNumberSection;
