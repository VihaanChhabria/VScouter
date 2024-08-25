import React from "react";

/**
 * Renders a counter for the Teleop Scoring Map.
 *
 * The counter displays a message and the count of the component.
 * When the counter is clicked, the count is incremented unless the
 * removed prop is set to true, in which case the count is decremented.
 * The count is only decremented if it is 0 or greater.
 *
 * @param {number} coordX - The x-coordinate of the component.
 * @param {number} coordY - The y-coordinate of the component.
 * @param {number} width - The width of the component.
 * @param {number} height - The height of the component.
 * @param {string} message - The message to display in the component.
 * @param {string} backgroundColor - The background color of the component.
 * @param {boolean} rotated - Whether the component should be rotated.
 * @param {boolean} removed - Whether the function should remove a count.
 * @param {function} setRemoved - The function to set if removed is activated.
 * @param {number} count - The count of the component.
 * @param {function} setCount - The function to set the count.
 * @return {JSX.Element} The rendered TeleopScoringCounter component.
 */
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
      {/* The counter container */}
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
        {/* The message of the counter */}
        <h1 style={{ color: "#000000", fontSize: "6.8vh", fontWeight: "bold", lineHeight: "1" }}>{message}</h1>

        {/* The count of the counter */}
        <h1 style={{ color: "#000000", fontSize: "8vh", fontWeight: "800"}}>{count}</h1>
      </div>
    </>
  );
};

export default TeleopScoringCounter;
