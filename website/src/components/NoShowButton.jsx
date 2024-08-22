import React, { useState } from "react";

const NoShowButton = ({ coordX = 606, coordY = 72, noShow, setNoShow }) => {

  return (
    <>
      <div
        style={{
          width: "315px",
          height: "78px",
          backgroundColor: "#4A4A4A",
          border: `${noShow ? "20" : "7"}px solid #1D1E1E`,
          borderRadius: "15px",
          position: "absolute",
          left: `${coordX}px`,
          top: `${coordY}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setNoShow(!noShow);
        }}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "bold" }}>No Show</h1>
      </div>
    </>
  );
};

export default NoShowButton;
