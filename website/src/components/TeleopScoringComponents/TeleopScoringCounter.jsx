import React from "react";

const TeleopScoringCounter = ({
  coordX = 0,
  coordY = 0,
  width = 0,
  height = 0,
  message = "",
  backgroundColor = "rgba(217, 217, 217, 0.5)",
  rotated = false,
  removed = false,
  setRemoved,
  count,
  setCount,
}) => {
  const clicked = () => {
    let futureCount = count;
    if (!removed) {
      futureCount = futureCount + 1;
    } else {
      futureCount = futureCount - 1;
      setRemoved(false);
    }

    if (futureCount >= 0) {
      setCount(futureCount);
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
          width: `${width}vw`,
          height: `${height}vh`,
          border: "1.16vh solid #5A5A5A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor,
          userSelect: "none",
          transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
          flexDirection: "column",
        }}
        onClick={clicked}
      >
        <h1 style={{ color: "#000000", fontSize: "6.8vh", fontWeight: "bold", lineHeight: "1" }}>{message}</h1>
        <h1 style={{ color: "#000000", fontSize: "8vh", fontWeight: "800"}}>{count}</h1>
      </div>
    </>
  );
};

export default TeleopScoringCounter;
