import React from "react";
import SettingsScoutingTemplate from "../../components/Settings/SettingsScoutingTemplate";
import ProceedBackButton from "../../components/ProceedBackButton";

const MatchScoutingSettingsPage = () => {
  return (
    <SettingsScoutingTemplate
      title="Match Scouting"
      localStorageKey="scoutingData"
    >
      <div style={{ width: "50%", height: "100%" }}>
        <ProceedBackButton
          nextPage="settings/match-scouting/flip-field"
          message="Flip Field"
        />
      </div>
    </SettingsScoutingTemplate>
  );
};

export default MatchScoutingSettingsPage;
