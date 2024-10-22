import React from "react";

/**
 * A React functional component that renders a button to toggle the 'no show' state.
 *
 * @param {number} coordX - The x-coordinate of the button's position.
 * @param {number} coordY - The y-coordinate of the button's position.
 * @param {boolean} noShow - The current 'no show' state.
 * @param {function} setNoShow - A function to update the 'no show' state.
 * @return {JSX.Element} The rendered component.
 */
const AutoStartNoShowButton = ({ coordX = 65.02, coordY = 16.74, noShow, setNoShow }) => {
  return (
    <>
      {/* Render the 'no show' button */}
      <div
        style={{
          width: "33.8vw",
          height: "18.14vh",
          backgroundColor: "#4A4A4A",
          border: `${noShow ? "4.65" : "1.63"}vh solid #1D1E1E`,
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setNoShow(!noShow);
        }}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>No Show</h1>
      </div>
    </>
  );
};

export default AutoStartNoShowButton;
