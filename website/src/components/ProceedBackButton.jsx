import React from "react";
import { useNavigate } from "react-router-dom";

const ProceedBackButton = ({ back = false, nextPage = "/", coordX = null, coordY = null }) => {
  console.log(back ? "10" : "0");
  const containerStyle = {
    border: "7px solid #1D1E1E",
    width: `${back ? "121" : "315.37"}px`,
    height: `${back ? "76.72" : "152.72"}px`,
    backgroundColor: "#242424",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10px",
  };

  if (coordX) {
    containerStyle.left = `${coordX}px`;
  }
  if (coordY) {
    containerStyle.top = `${coordY}px`;
  }

  if (back) {
    containerStyle.left = "10px";
  } else {
    containerStyle.right = "10px";
  }

  const textStyle = {
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: "bold",
  };

  const navigate = useNavigate();

  return (
    <>
      <div style={containerStyle} onClick={() => navigate(nextPage)}>
        <h1 style={textStyle}>{back ? "Back" : "Proceed"}</h1>
      </div>
    </>
  );
};

export default ProceedBackButton;
