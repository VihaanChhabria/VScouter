import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProceedBackButton from "../components/ProceedBackButton";
import SettingsMatchDataScanner from "../components/SettingsComponents/SettingsMatchDataScanner";
import SettingsButton from "../components/SettingsComponents/SettingsButton";
import SettingsViewMatchData from "../components/SettingsComponents/SettingsViewMatchData";

/**
 * A page for the user to access settings such as clearing match data, viewing match data, and getting match data.
 *
 * @return {JSX.Element} The rendered component.
 */
const SettingsPage = () => {
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
        <SettingsButton
          question="Get Match Data"
          state={matchDataGetClicked}
          setState={setMatchDataGetClicked}
        />
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
        <ProceedBackButton
          nextPage={"/"}
          width={14.91}
          height={17.84}
          coordX={1.07}
          coordY={2.33}
          back={true}
        />
      )}
    </>
  );
};

export default SettingsPage;
