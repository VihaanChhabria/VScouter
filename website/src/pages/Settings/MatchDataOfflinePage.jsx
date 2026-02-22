import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigateWithBase } from "../../utils/useNavigateWithBase";

const MatchDataOfflinePage = () => {
  const navigate = useNavigateWithBase();

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
        JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0],
    );
    navigate("/");
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
      <input
        type="file"
        id="selectFiles"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
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
          onClick={() => navigate("match-data")}
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
