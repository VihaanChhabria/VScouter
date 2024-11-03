import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * A button component that navigates to the next page in the app.
 *
 * By default, it will navigate to the root page of the app.
 * If the "back" prop is set to true, it will navigate to the previous page.
 * If the "nextPage" prop is set, it will navigate to that page instead.
 * If the "inputs" prop is set, it will pass those inputs as props to the next page.
 * If the "coordX" and "coordY" props are set, the button will be positioned at those coordinates.
 * If the "width" and "height" props are set, the button will have those dimensions.
 * If the "message" prop is set, the button will display that message.
 *
 * @param {bool} back - Whether to navigate to the previous page or not.
 * @param {string} nextPage - The page to navigate to.
 * @param {object} inputs - The inputs to pass to the next page.
 * @param {number} coordX - The x-coordinate to position the button at.
 * @param {number} coordY - The y-coordinate to position the button at.
 * @param {number} width - The width of the button.
 * @param {number} height - The height of the button.
 * @param {string} message - The message to display on the button.
 */
const ProceedBackButton = ({
  back = false,
  nextPage = "/",
  coordX = null,
  coordY = null,
  inputs = {},
  width = null,
  height = null,
  message = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        if (
          nextPage == "/game-start" &&
          location.pathname == "/endgame-scoring"
        ) {
          const fullData = {
            data: JSON.parse(localStorage.getItem("scoutingData"))?.data || [],
          };
          fullData.data.push({ ...inputs });

          localStorage.setItem("scoutingData", JSON.stringify(fullData));
          navigate(nextPage);
        } else {
          navigate(nextPage, { state: { inputs } });
        }
      }
    }
  };
  const containerStyle = {
    border: "1.63dvh solid #1D1E1E",
    width: `${back ? "12.98" : "33.84"}dvw`,
    height: `${back ? "17.84" : "35.52"}dvh`,
    backgroundColor: "#242424",
    borderRadius: "3.49dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "2.33dvh",
  };

  if (back) {
    containerStyle.left = "1.07dvw";
  } else {
    containerStyle.right = "1.07dvw";
  }

  if (coordX) {
    containerStyle.left = `${coordX}dvw`;
  }
  if (coordY) {
    containerStyle.top = `${coordY}dvh`;
  }

  if (width) {
    containerStyle.width = `${width}dvw`;
  }
  if (height) {
    containerStyle.height = `${height}dvh`;
  }

  return (
    <>
      <div style={containerStyle} onClick={proceedClick}>
        <h1
          style={{ color: "#FFFFFF", fontSize: "5.58dvh", fontWeight: "bold" }}
        >
          {back ? "Back" : message ? message : "Proceed"}
        </h1>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProceedBackButton;
