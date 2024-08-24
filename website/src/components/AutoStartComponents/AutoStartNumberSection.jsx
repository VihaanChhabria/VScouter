import React from "react";

const AutoStartNumberSection = ({
  number = "1",
  coordX = 0,
  coordY = 0,
  width = 10.84,
  height = 16.51,
  rotated = false,
}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
          width: `${width}vw`,
          height: `${height}vh`,
          backgroundColor: "rgba(217, 217, 217, 0.5)",
          border: "1.16vh solid #5A5A5A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <h1 style={{ color: "#000000", fontSize: "5.58vh" }}>{number}</h1>
      </div>
    </>
  );
};

export default AutoStartNumberSection;
