import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MatchDataOfflinePage = () => {
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files.item(0);

    const getText = async () => {
      try {
        const text = await file.text();
        
        setSelectedData(JSON.stringify(JSON.parse(text).matches));
        toast.success("Data Loaded");
      } catch {
        toast.error("Error In Loading");
      }
    };
    getText();
  };

  const doneClick = () => {
    localStorage.setItem("matchData", selectedData);
    
    
    toast.success(
      "Data Submitted: " +
        JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0]
    );
    navigate("/");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <input
        type="file"
        id="selectFiles"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      {/* back button */}
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

      {/* container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "5%",
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
          Scan QR Code To Load Match Suggestions
        </h1>
        <div
          style={{
            width: "100%",
            height: "75%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10%",
          }}
        >
          <div
            style={{
              width: "35%",
              height: "60%",
              backgroundColor: "#242424",
              border: "1.63dvh solid #1D1E1E",
              borderRadius: "3.49dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => document.getElementById("selectFiles").click()}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "5.58dvh",
                fontWeight: "bold",
              }}
            >
              Upload Match File
            </h1>
          </div>
          <div
            style={{
              width: "25%",
              height: "40%",
              backgroundColor: "#242424",
              border: "1.63dvh solid #1D1E1E",
              borderRadius: "3.49dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => doneClick()}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "5.58dvh",
                fontWeight: "bold",
              }}
            >
              Submit
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDataOfflinePage;
