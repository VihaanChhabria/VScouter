import React, { useEffect } from "react";

/**
 * Renders a number section for the Auto Start Map.
 *
 * @param {string} number - The number to be displayed.
 * @param {number} coordX - The x-coordinate of the section.
 * @param {number} coordY - The y-coordinate of the section.
 * @param {number} width - The width of the section.
 * @param {number} height - The height of the section.
 * @param {boolean} rotated - Whether the section should be rotated.
 * @return {JSX.Element} The rendered component.
 */
const AutoStartNumberSection = ({ number, startPoses, setStartPoses }) => {
  const updateStartPoses = () => {
    if (!startPoses[number]) {
      setStartPoses.map((setStartPos) => setStartPos(false));
      setStartPoses[number](true);
      return;
    }
    setStartPoses[number](!startPoses[number]);
  };

  useEffect(() => {
  document.addEventListener("keyup", function onEvent(event) {
    if (event.key === String(number + 1)) {
      updateStartPoses();
    }
  })}, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: startPoses[number]
            ? `rgba(247, 185, 0, 0.5)`
            : `rgba(217, 217, 217, 0.5)`,
          border: "1.16dvh solid #5A5A5A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          updateStartPoses();
        }}
      ></div>
    </>
  );
};

export default AutoStartNumberSection;
