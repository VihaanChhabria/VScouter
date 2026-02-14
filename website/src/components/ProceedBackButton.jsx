import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigateWithBase } from "../utils/useNavigateWithBase";

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
  stateStack = {},
  mode = "",
  stateKey = null,
  onClick = () => {},
  textSize = "5.58dvh",
}) => {
  const navigate = useNavigateWithBase();
  const location = useLocation();

  const buildState = (payload) =>
    stateKey ? { [stateKey]: payload } : { inputs: payload };

  /** Handler for the button being clicked */
  const proceedClick = () => {
    const continueRunning = onClick();
    if (continueRunning === false) {
      console.log("onClick returned false, not proceeding");
      return;
    }

    if (stateStack != {}) {
      localStorage.setItem(mode + "History", JSON.stringify(stateStack));
    }
    if (back) {
      // If the back prop is set to true, pass the inputs as props to the previous page
      inputs = Object.fromEntries(
        Object.entries(inputs).filter(([key, value]) => value !== null),
      );
      console.log(inputs);
      navigate(nextPage, { state: buildState(inputs) });
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
          nextPage == "game-start" &&
          location.pathname.endsWith("endgame-scoring")
        ) {
          // If the next page is the game start page and the current page is the endgame scoring page
          const fullData = {
            data: JSON.parse(localStorage.getItem("scoutingData"))?.data || [],
          };
          console.log("inputs:", inputs);
          fullData.data.push({ ...inputs });
          console.log("fullData:", fullData);
          // Save the inputs to local storage
          localStorage.setItem("scoutingData", JSON.stringify(fullData));
          // for undo button for scoring pages
          // reset history when done with scouting one match
          localStorage.setItem("autoHistory", "[]");
          localStorage.setItem("teleopHistory", "[]");
          navigate(nextPage, {
            state: buildState({
              matchNumber: (parseInt(inputs.matchNumber) + 1).toString(),
              alliance: inputs.alliance,
              scouterInitials: inputs.scouterInitials,
            }),
          });
        } else if (
          nextPage == "game-start" &&
          (location.pathname === "/" || location.pathname === "/ui/")
        ) {
          // for undo button for scoring pages
          // if the user leaves in the middle of the match, this will reset their history
          localStorage.setItem("autoHistory", "[]");
          localStorage.setItem("teleopHistory", "[]");
          navigate(nextPage, { state: buildState(inputs) });
        } else {
          // If the next page is not the game start page, pass the inputs as props to the next page
          console.log(inputs);

          navigate(nextPage, { state: buildState(inputs) });
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
        id={back ? "backButton" : "proceedButton"}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: textSize,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message ? message : back ? "Back" : "Proceed"}
        </h1>
      </div>
    </div>
  );
};

export default ProceedBackButton;
