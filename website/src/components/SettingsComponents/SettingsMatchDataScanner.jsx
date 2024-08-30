import React, { useEffect, useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleButton from "../ToggleButton";

const SettingsMatchDataScanner = () => {
  const [matchDataURL, setMatchDataURL] = useState("");
  const [useManual, setUseManual] = useState(false);

  useEffect(() => {
    if (useManual) {
      const input = document.querySelector("input");
      setMatchDataURL(input.value);
    } else {
      setMatchDataURL("");
    }
  }, [useManual]);

  const doneClick = async () => {
    try {
      console.log(matchDataURL);
      const res = await fetch(matchDataURL);
      const fullData = await res.json();
      const matches = fullData.matches;

      localStorage.setItem("matchesData", JSON.stringify(matches));
      
      toast.success("Match Data Fetched: " + JSON.parse(localStorage.getItem("matchesData"))[0].redAlliance[0]);
    } catch (err) {
      toast.error("Invalid URL");
      console.log(err);
    }
  };

  return (
    <>
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
          <Scanner
            onScan={(result) => {
              setMatchDataURL(result[0].rawValue);
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
          onClick={() => doneClick()}
        >
          <h1
            style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold", lineHeight: "7vh" }}
          >
            Request Camera Permissions
          </h1>
        </div>

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
        >
          <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>Done</h1>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default SettingsMatchDataScanner;
