import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";
import { useNavigateWithBase } from "../../../utils/useNavigateWithBase";
import EventDataPageTemplate from "../../../components/Settings/EventDataPageTemplate";

const MatchDataOnlinePage = () => {
  const navigate = useNavigateWithBase();
  const [qrCodeMatchData, setQRCodeMatchData] = useState({});

  const doneClick = async () => {
    const qrCodeMatchDataParsed = JSON.parse(qrCodeMatchData);
    try {
      const headers = {
        "X-TBA-Auth-Key": qrCodeMatchDataParsed.apiKey,
      };
      const res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${qrCodeMatchDataParsed.eventKey}/matches/simple`,
        { headers },
      );
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

      localStorage.setItem("matchData", JSON.stringify(qualMatchesCleaned));

      toast.success(
        "Match Data Fetched: " +
          JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0],
      );

      navigate("/");
    } catch (err) {
      toast.error("Invalid Data");
      console.log(err);
    }
  };

  return (
    <EventDataPageTemplate
      backTo="match-data/load"
      title="Scan QR Code To Load Match Suggestions"
    >
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
              setQRCodeMatchData(result[0].rawValue);
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
    </EventDataPageTemplate>
  );
};

export default MatchDataOnlinePage;
