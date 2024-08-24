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
    border: "1.63vh solid #1D1E1E",
    width: `${back ? "12.98" : "33.84"}vw`,
    height: `${back ? "17.84" : "35.52"}vh`,
    backgroundColor: "#242424",
    borderRadius: "3.49vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "2.33vh",
  };

  if (back) {
    containerStyle.left = "1.07vw";
  } else {
    containerStyle.right = "1.07vw";
  }

  if (coordX) {
    containerStyle.left = `${coordX}vw`;
  }
  if (coordY) {
    containerStyle.top = `${coordY}vh`;
  }

  return (
    <>
      <div style={containerStyle} onClick={proceedClick}>
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>
          {back ? "Back" : "Proceed"}
        </h1>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProceedBackButton;
