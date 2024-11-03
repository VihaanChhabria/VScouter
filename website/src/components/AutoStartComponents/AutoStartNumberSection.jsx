import React from "react";

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
          left: `${coordX}dvw`,
          top: `${coordY}dvh`,
          width: `${width}dvw`,
          height: `${height}dvh`,
          backgroundColor: "rgba(217, 217, 217, 0.5)",
          border: "1.16dvh solid #5A5A5A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <h1 style={{ color: "#000000", fontSize: "5.58dvh" }}>{number}</h1>
      </div>
    </>
  );
};

export default AutoStartNumberSection;
