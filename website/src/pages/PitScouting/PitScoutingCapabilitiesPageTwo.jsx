import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import ToggleButton from "../../components/ToggleButton";

const PitScoutingCapabilitiesPageTwo = () => {
  const location = useLocation();
  const pitScouting = location.state?.pitScouting || {};

  const [trenchDriveAbility, setTrenchDriveAbility] = useState(
    pitScouting.trenchDriveAbility ?? false,
  );
  const [rotatableShooter, setRotatableShooter] = useState(
    pitScouting.rotatableShooter ?? false,
  );
  const [intakeFromDepot, setIntakeFromDepot] = useState(
    pitScouting.intakeFromDepot ?? false,
  );
  const [intakeFromOutpost, setIntakeFromOutpost] = useState(
    pitScouting.intakeFromOutpost ?? false,
  );

  const pitScoutingState = {
    ...pitScouting,
    trenchDriveAbility,
    rotatableShooter,
    intakeFromDepot,
    intakeFromOutpost,
  };

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
        pitScoutingState={pitScoutingState}
      />
    </div>
  );
};

export default PitScoutingCapabilitiesPageTwo;
