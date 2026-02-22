import React from "react";
import SettingsScoutingTemplate from "../../components/Settings/SettingsScoutingTemplate";
import ProceedBackButton from "../../components/ProceedBackButton";

const PitScoutingSettingsPage = () => {
  return (
    <SettingsScoutingTemplate
      title="Pit Scouting"
      localStorageKey="pitScoutingData"
    >
      <div style={{ width: "50%", height: "100%" }}>
        <ProceedBackButton
          nextPage="settings/pit-scouting/assign-teams"
          message="Assign Teams"
        />
      </div>
    </SettingsScoutingTemplate>
  );
};

export default PitScoutingSettingsPage;
