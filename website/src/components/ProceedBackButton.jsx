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
  inputs = {},
  message = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  /** Handler for the button being clicked */
  const proceedClick = () => {
    if (back) {
      // If the back prop is set to true, pass the inputs as props to the previous page
      inputs = Object.fromEntries(
        Object.entries(inputs).filter(([key, value]) => value !== null)
      );
      navigate(nextPage, { state: { inputs } });
    } else {
      // If the back prop is set to false, check if all inputs have been filled in
      const hasNull = Object.values(inputs).some((val) => {
        if (val === null) {
          return true;
        } else if (Array.isArray(val)) {
          return val.includes(null);
        }
      });
      if (hasNull) {
        // If there are any null inputs, display an error message
        toast.error("Fill In All Fields To Proceed");
      } else {
        if (
          nextPage == "/game-start" &&
          location.pathname == "/endgame-scoring"
        ) {
          // If the next page is the game start page and the current page is the endgame scoring page
          const fullData = {
            data: JSON.parse(localStorage.getItem("scoutingData"))?.data || [],
          };
          fullData.data.push({ ...inputs });
          // Save the inputs to local storage
          localStorage.setItem("scoutingData", JSON.stringify(fullData));
          navigate(nextPage);
        } else {
          // If the next page is not the game start page, pass the inputs as props to the next page
          navigate(nextPage, { state: { inputs } });
        }
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "1.63dvh solid #1D1E1E",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        onClick={proceedClick}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {back ? "Back" : message ? message : "Proceed"}
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProceedBackButton;
