import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProceedBackButton from "../components/ProceedBackButton";
import SettingsMatchDataScanner from "../components/SettingsComponents/SettingsMatchDataScanner";
import SettingsButton from "../components/SettingsComponents/SettingsButton";
import SettingsViewMatchData from "../components/SettingsComponents/SettingsViewMatchData";
import SettingsUpdateButton from "../components/SettingsComponents/SettingsUpdateButton";
import { useNavigateWithBase } from "../utils/useNavigateWithBase";

/**
 * A page for the user to access settings such as clearing match data, viewing match data, and getting match data.
 *
 * @return {JSX.Element} The rendered component.
 */
const SettingsPage = () => {
  const navigate = useNavigateWithBase();
  const [matchDataGetClicked, setMatchDataGetClicked] = useState(false);
  const [matchDataClearClicked, setMatchDataClearClicked] = useState(false);
  const [scoutDataClearClicked, setScoutDataClearClicked] = useState(false);
  const [viewScoutingData, setViewScoutingData] = useState(false);

  useEffect(() => {
    /**
     * If the user has clicked the clear match data button, clear the local storage for match data and notify the user.
     * If the user has clicked the clear scouting data button, clear the local storage for scouting data and notify the user.
     */
    if (matchDataClearClicked) {
      localStorage.setItem("matchData", "");
      setMatchDataClearClicked(false);
      toast.success("Cleared Match Data");
    } else if (scoutDataClearClicked) {
      localStorage.setItem("scoutingData", JSON.stringify({ data: [] }));
      setScoutDataClearClicked(false);
      toast.success("Cleared Scouting Data");
    }
  }, [matchDataClearClicked, scoutDataClearClicked]);

  return (
    <>
      {/* Container for the settings buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
          gap: "2dvh",
          marginTop: "10dvh",
        }}
      >
        {/* Settings Buttons */}
        <div
          style={{
            width: `90dvw`,
            height: `15dvh`,
            backgroundColor: "#4A4A4A",
            border: "1.63dvh solid #1D1E1E",
            borderRadius: "3.49dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            Get Match Data
          </h1>
        </div>
        <SettingsButton
          question="Clear Match Data"
          state={matchDataClearClicked}
          setState={setMatchDataClearClicked}
        />
        <SettingsButton
          question="Clear Scouting Data"
          state={scoutDataClearClicked}
          setState={setScoutDataClearClicked}
        />

        <SettingsButton
          question="View Matches Data"
          state={viewScoutingData}
          setState={setViewScoutingData}
        />
      </div>

      {/* If the user has clicked the get match data button, render the SettingsMatchDataScanner component */}
      {matchDataGetClicked && (
        <SettingsMatchDataScanner
          state={matchDataGetClicked}
          setState={setMatchDataGetClicked}
        />
      )}

      {/* If the user has clicked the view matches data button, render the SettingsViewMatchData component */}
      {viewScoutingData && <SettingsViewMatchData />}

      {/* If the user has clicked the back button, render the ProceedBackButton component to navigate back to the main page */}
      {matchDataGetClicked || viewScoutingData ? (
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
            setMatchDataGetClicked(false);
            setViewScoutingData(false);
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
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              top: "2.33dvh",
              left: "1.07dvw",
              width: "14.91dvw",
              height: "17.84dvh",
            }}
          >
            <ProceedBackButton nextPage={"/"} back={true} />
          </div>

          <div
            style={{
              position: "absolute",
              top: "2.33dvh",
              right: "1.07dvw",
              width: "18dvw",
              height: "17.84dvh",
            }}
          >
            <ProceedBackButton nextPage={"parse-data"} message={"Parse Data"} />
          </div>
        </>
      )}
      {/* Render a button to update service workers */}
      <SettingsUpdateButton />
    </>
  );
};

export default SettingsPage;
