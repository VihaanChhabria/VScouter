import React from "react";
import { useNavigate } from "react-router-dom";

const ProceedBackButton = ({ back = false, nextPage = "/" }) => {
  const containerStyle = {
    border: "7px solid #1D1E1E",
    width: "315.37px",
    height: "152.72px",
    backgroundColor: "#242424",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "10px",
    bottom: "10px",
  };

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
