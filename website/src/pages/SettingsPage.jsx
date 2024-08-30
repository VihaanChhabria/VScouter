import React, { useState } from "react";

import ProceedBackButton from "../components/ProceedBackButton";
import ToggleButton from "../components/ToggleButton";
import SettingsMatchDataScanner from "../components/SettingsComponents/SettingsMatchDataScanner";
import SettingsButton from "../components/SettingsComponents/SettingsButton";
import SettingsViewMatchData from "../components/SettingsComponents/SettingsViewMatchData";

const SettingsPage = () => {
  const [matchDataGetClicked, setMatchDataGetClicked] = useState(false);
  const [matchDataClearClicked, setMatchDataClearClicked] = useState(false);
  const [scoutDataClearClicked, setScoutDataClearClicked] = useState(false);
  const [viewScoutingData, setViewScoutingData] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "2vh",
          marginTop: "10vh",
        }}
      >
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

      {matchDataGetClicked && <SettingsMatchDataScanner />}
      {viewScoutingData && <SettingsViewMatchData />}

      {matchDataGetClicked || viewScoutingData ? (
        <div
          style={{
            border: "1.63vh solid #1D1E1E",
            width: "14.91vw",
            height: "17.84vh",
            backgroundColor: "#242424",
            borderRadius: "3.49vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "1.07vh",
            left: "2.33vw",
          }}
          onClick={() => {
            setMatchDataGetClicked(false);
            setViewScoutingData(false);
          }}
        >
          <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>
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
