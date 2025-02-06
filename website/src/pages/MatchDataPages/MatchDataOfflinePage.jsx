import React, { useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleButton from "../../components/ToggleButton.jsx";
import { useNavigate } from "react-router-dom";

const MatchDataOfflinePage = () => {
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
        "Match Data Fetched: " +
          JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0]
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
      <div
        style={{
          border: "1.63dvh solid #1D1E1E",
          width: "14.91dvw",
          height: "17.84dvh",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "1.07dvh",
          left: "2.33dvw",
        }}
        onClick={() => {
          navigate("/match-data");
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
          }}
        >
          Back
        </h1>
      </div>
      {/* Container */}
      <div
        style={{
          width: "95.71dvw",
          height: "70.47dvh",
          backgroundColor: "#242424",
          border: "1.3dvh solid #1D1E1E",
          borderRadius: "3.49dvh",
          position: "absolute",
          top: "24.88dvh",
          left: "2.15dvw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "3.97dvw",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
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
                width: "24.57dvw",
                height: "53.26dvh",
              },
              finderBorder: 0,
            }}
          />
        </div>

        <div>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
              textAlign: "center",
              position: "absolute",
              top: "30.93dvh",
              left: "33dvw",
            }}
          >
            Or Enter URL:
          </h1>

          {/* Text box for manual input */}
          <input
            type="text"
            onChange={(e) => useManual && setMatchDataURL(e.target.value)}
            style={{
              border: "0.93dvh solid #1D1E1E",
              borderRadius: "2.33dvh",
              backgroundColor: "#4A4A4A",
              color: "#FFFFFF",
              width: "40dvw",
              height: "8.88dvh",
              fontSize: "4.0dvh",
              position: "absolute",
              top: "30.93dvh",
              left: "52dvw",
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

        {/* Done Button */}
        <div
          style={{
            border: "1.63dvh solid #1D1E1E",
            borderRadius: "2.33dvh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            width: "25.0dvw",
            height: "17.84dvh",
            fontSize: "4.0dvh",
            position: "absolute",
            bottom: "2.33dvh",
            right: "1.7dvw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => doneClick()} // Fetches the data and navigates to the next page
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
            }}
          >
            Done
          </h1>
        </div>
      </div>
    </>
  );
};

export default MatchDataOfflinePage;
