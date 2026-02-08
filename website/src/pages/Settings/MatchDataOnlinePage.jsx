import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";
import { useNavigateWithBase } from "../../utils/useNavigateWithBase";

const MatchDataOnlinePage = () => {
  const navigate = useNavigateWithBase();

  const [qrCodeMatchData, setQRCodeMatchData] = useState({}); // The URL to the match data

  const doneClick = async () => {
    const qrCodeMatchDataParsed = JSON.parse(qrCodeMatchData);
    try {
      const headers = {
        "X-TBA-Auth-Key": qrCodeMatchDataParsed.apiKey,
      };
      const res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${qrCodeMatchDataParsed.eventKey}/matches/simple`,
        { headers },
      ); // Fetching the data from the URL
      const fullData = await res.json();

      const qualMatchesCleaned = [];

      for (const match of fullData) {
        if (match.comp_level == "qm") {
          qualMatchesCleaned.push({
            matchNum: match["match_number"],
            redAlliance: match.alliances.red.team_keys.map((team) =>
              team.replace("frc", ""),
            ),
            blueAlliance: match.alliances.blue.team_keys.map((team) =>
              team.replace("frc", ""),
            ),
          });
        }
      }

      qualMatchesCleaned.sort((a, b) => a.matchNum - b.matchNum);

      localStorage.setItem("matchData", JSON.stringify(qualMatchesCleaned)); // Storing the data in local storage so it can be accessed if the website is refreshed

      toast.success(
        "Match Data Fetched: " +
          JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0],
      ); // Notifying the user that the data has been fetched

      navigate("/"); // Navigating back to the home page
    } catch (err) {
      // If anything goes wrong, notify the user
      toast.error("Invalid Data");
      console.log(err);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
          navigate("match-data");
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
          gap: "5%",
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
          <div style={{ width: "50%", height: "100%" }}>
            <Scanner
              components={{ finder: false }}
              styles={{ video: { borderRadius: "7.5%" } }}
              onScan={(result) => {
                setQRCodeMatchData(result[0].rawValue); // If the QR code is found, set the URL
                toast.success("QR Code is Scanned Successfully");
              }}
              onError={() =>
                toast.error("Invalid QR Code/User Canceled Prompt")
              }
            />
          </div>
          <div
            style={{
              width: "25%",
              height: "50%",
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

export default MatchDataOnlinePage;
