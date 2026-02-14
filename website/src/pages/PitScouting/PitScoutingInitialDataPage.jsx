import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";

const PitScoutingInitialDataPage = () => {
  const location = useLocation();
  const pitScouting = location.state?.pitScouting || {};

  const [scouterInitials, setScouterInitials] = useState(
    pitScouting.scouterInitials ?? "",
  );
  const [teamNumber, setTeamNumber] = useState(pitScouting.teamNumber ?? "");

  const pitScoutingState = {
    ...pitScouting,
    scouterInitials,
    teamNumber,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PitScoutingTemplate
        title="Pit Scouting Initial Data Page"
        components={[
          <Dropdown
            question="Team Number"
            options={[
              "111",
              "222",
              "333",
              "444",
              "555",
              "666",
              "777",
              "888",
              "999",
              "123",
              "456",
              "789",
              "321",
              "654",
              "987",
            ]}
            defaultValue={teamNumber}
            setSelectedValue={setTeamNumber}
          />,
          <TextInput
            question="Scouter Initials"
            setTextValue={setScouterInitials}
            defaultText={scouterInitials}
          />,
        ]}
        backPage=""
        nextPage="pit-scouting/capabilities-page-one"
        pitScoutingState={pitScoutingState}
      />
    </div>
  );
};

export default PitScoutingInitialDataPage;
