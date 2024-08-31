import React, { useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleButton from "../ToggleButton";
import { useNavigate } from "react-router-dom";

  /**
   * This component is used to fetch match data from a given URL.
   * The user can either scan a QR code or enter the URL manually.
   * Once the data is fetched, the user is navigated to the home page.
   * @returns A JSX element containing the QR code scanner, manual input, and a done button in a container.
   */
const SettingsMatchDataScanner = () => {
  const [matchDataURL, setMatchDataURL] = useState(""); // The URL to the match data (can be got from both the QR code or the text box)
  const [useManual, setUseManual] = useState(false); // Indicating if the text box should be used to get the URL

  const navigate = useNavigate();

  useEffect(() => {
    if (useManual) {
      // Getting the URL from the text box if the manual toggle is on
      const input = document.querySelector("input");
      setMatchDataURL(input.value);
    } else {
      setMatchDataURL("");
    }
  }, [useManual]);

  const doneClick = async () => {
    try {
      const res = await fetch(matchDataURL); // Fetching the data from the URL
      const fullData = await res.json();
      const matches = fullData.matches;

      localStorage.setItem("matchData", JSON.stringify(matches)); // Storing the data in local storage so it can be accessed if the website is refreshed

      toast.success(
        "Match Data Fetched: " + JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0]
      ); // Notifying the user that the data has been fetched

      navigate("/"); // Navigating back to the home page
    } catch (err) {
      // If anything goes wrong, notify the user
      toast.error("Invalid URL");
      console.log(err);
    }
  };

  return (
    <>
      {/* Container */}
      <div
        style={{
          width: "95.71vw",
          height: "70.47vh",
          backgroundColor: "#242424",
          border: "7px solid #1D1E1E",
          borderRadius: "3.49vh",
          position: "absolute",
          top: "24.88vh",
          left: "2.15vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "3.97vw",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58vh",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Scan QR Code:
          </h1>

          {/* QR Code Scanner */}
          <Scanner
            onScan={(result) => {
              setMatchDataURL(result[0].rawValue); // If the QR code is found, set the URL
              toast.success("QR Code is Scanned Successfully");
            }}
            onError={() => toast.error("Invalid QR Code/User Canceled Prompt")}
            styles={{
              container: {
                width: "24.57vw",
                height: "53.26vh",
              },
              finderBorder: 0,
            }}
          />
        </div>

        <div>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58vh",
              fontWeight: "bold",
              textAlign: "center",
              position: "absolute",
              top: "30.93vh",
              left: "33vw",
            }}
          >
            Or Enter URL:
          </h1>

          {/* Text box for manual input */}
          <input
            type="text"
            onChange={(e) => useManual && setMatchDataURL(e.target.value)}
            style={{
              border: "0.93vh solid #1D1E1E",
              borderRadius: "2.33vh",
              backgroundColor: "#4A4A4A",
              color: "#FFFFFF",
              width: "40vw",
              height: "8.88vh",
              fontSize: "4.0vh",
              position: "absolute",
              top: "30.93vh",
              left: "52vw",
            }}
          />

          {/* Toggle button for manual input */}
          <ToggleButton
            coordX={33}
            coordY={40.93}
            width={14.91}
            height={17.84}
            question="Manual?"
            state={useManual}
            setState={setUseManual}
          />
        </div>

        {/* Request Camera Permissions Button //TODO: Implement this */}
        <div
          style={{
            border: "1.63vh solid #1D1E1E",
            borderRadius: "2.33vh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            width: "25.0vw",
            height: "17.84vh",
            fontSize: "4.0vh",
            position: "absolute",
            top: "2.33vh",
            right: "1.7vw",
            textAlign: "center",
          }}
        >
          <h1
            style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold", lineHeight: "7vh" }}
          >
            Request Camera Permissions
          </h1>
        </div>

        {/* Done Button */}
        <div
          style={{
            border: "1.63vh solid #1D1E1E",
            borderRadius: "2.33vh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            width: "25.0vw",
            height: "17.84vh",
            fontSize: "4.0vh",
            position: "absolute",
            bottom: "2.33vh",
            right: "1.7vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => doneClick()} // Fetches the data and navigates to the next page
        >
          <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>Done</h1>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default SettingsMatchDataScanner;
