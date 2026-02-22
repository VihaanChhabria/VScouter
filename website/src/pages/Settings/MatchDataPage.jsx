import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProceedBackButton from "../../components/ProceedBackButton";
import { useNavigateWithBase } from "../../utils/useNavigateWithBase";

const MatchDataPage = () => {
  const [matchDataURL, setMatchDataURL] = useState(""); // The URL to the match data (can be got from both the QR code or the text box)
  const [useManual, setUseManual] = useState(false); // Indicating if the text box should be used to get the URL

  const navigate = useNavigateWithBase();

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
          JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0],
      ); // Notifying the user that the data has been fetched

      navigate("/"); // Navigating back to the home page
    } catch (err) {
      // If anything goes wrong, notify the user
      toast.error("Invalid URL");
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          padding: "1.07dvh 2.33dvw",
          display: "flex",
          alignItems: "center",
        }}
      >
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
          }}
          onClick={() => navigate("settings")}
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
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10%",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "8dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Load Match Data
        </h1>
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
            textAlign: "center",
            width: "80%",
          }}
        >
          Are You Online (Using QR Code) or Offline (Using Match Schedule File)?
        </h1>
        <div
          style={{
            width: "100%",
            height: "40%",
            display: "flex",
            gap: "4%",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <ProceedBackButton
            nextPage={"match-data/online"}
            message={"Online"}
          />

          <ProceedBackButton
            nextPage={"match-data/offline"}
            message={"Offline"}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchDataPage;
