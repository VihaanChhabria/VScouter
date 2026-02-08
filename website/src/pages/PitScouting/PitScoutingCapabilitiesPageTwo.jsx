import React, { useState } from "react";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import ToggleButton from "../../components/ToggleButton";

const PitScoutingCapabilitiesPageTwo = () => {
  const [trenchDriveAbility, setTrenchDriveAbility] = useState(false);
  const [rotatableShooter, setRotatableShooter] = useState(false);
  const [intakeFromDepot, setIntakeFromDepot] = useState(false);
  const [intakeFromOutpost, setIntakeFromOutpost] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PitScoutingTemplate
        title="Pit Scouting Capabilities Page Two"
        components={[
          <ToggleButton
            question="Able to Drive Under Trench?"
            selected={trenchDriveAbility}
            setSelected={setTrenchDriveAbility}
            fontSize="4.5dvh"
          />,
          <ToggleButton
            question="Rotatable Shooter?"
            selected={rotatableShooter}
            setSelected={setRotatableShooter}
            fontSize="4.5dvh"
          />,
          <ToggleButton
            question="Intake From Depot?"
            selected={intakeFromDepot}
            setSelected={setIntakeFromDepot}
            fontSize="4.5dvh"
          />,
          <ToggleButton
            question="Intake From Outpost?"
            selected={intakeFromOutpost}
            setSelected={setIntakeFromOutpost}
            fontSize="4.5dvh"
          />,
        ]}
        backPage="pit-scouting/capabilities-page-one"
        nextPage="pit-scouting/photo"
      />
    </div>
  );
};

export default PitScoutingCapabilitiesPageTwo;
