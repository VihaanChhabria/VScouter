import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProceedBackButton = ({
  back = false,
  nextPage = "/",
  coordX = null,
  coordY = null,
  inputs,
}) => {

  const navigate = useNavigate();
  const proceedClick = () => {
    console.log(inputs)
    const hasNull = Object.values(inputs).some((val) => val === null);
    if (hasNull) {
      toast.error("Fill In All Fields To Proceed");
    }else{
      navigate(nextPage);
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
    </>
  );
};

export default ProceedBackButton;
