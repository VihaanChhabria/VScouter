import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProceedBackButton = ({
  back = false,
  nextPage = "/",
  coordX = null,
  coordY = null,
  inputs = {},
}) => {
  const navigate = useNavigate();
  const proceedClick = () => {
    
    if (back) {
      inputs = Object.fromEntries(
        Object.entries(inputs).filter(([key, value]) => value !== null)
      );
      navigate(nextPage, { state: { inputs } });
    } else {
      const hasNull = Object.values(inputs).some((val) => val === null);
      if (hasNull) {
        toast.error("Fill In All Fields To Proceed");
      } else {
        navigate(nextPage, { state: { inputs } });
      }
    }
  };
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

  if (back) {
    containerStyle.left = "10px";
  } else {
    containerStyle.right = "10px";
  }

  if (coordX) {
    containerStyle.left = `${coordX}px`;
  }
  if (coordY) {
    containerStyle.top = `${coordY}px`;
  }

  return (
    <>
      <div style={containerStyle} onClick={proceedClick}>
        <h1 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "bold" }}>
          {back ? "Back" : "Proceed"}
        </h1>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProceedBackButton;
