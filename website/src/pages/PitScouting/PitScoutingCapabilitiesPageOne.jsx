import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";

const PitScoutingCapabilitiesPageOne = () => {
  const location = useLocation();
  const pitScouting = location.state?.pitScouting || {};

  const [drivetrainType, setDrivetrainType] = useState(
    pitScouting.drivetrainType ?? null,
  );
  const [weight, setWeight] = useState(pitScouting.weight ?? "");
  const [climbingAbility, setClimbingAbility] = useState(
    pitScouting.climbingAbility ?? null,
  );
  const [maxFuelStorage, setMaxFuelStorage] = useState(
    pitScouting.maxFuelStorage ?? "",
  );

  const pitScoutingState = {
    ...pitScouting,
    drivetrainType,
    weight,
    climbingAbility,
    maxFuelStorage,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PitScoutingTemplate
        title="Pit Scouting Capabilities Page One"
        components={[
          <Dropdown
            question="Drivetrain Type"
            options={["Swerve", "Tank", "Mecanum", "Other"]}
            defaultValue={drivetrainType}
            setSelectedValue={setDrivetrainType}
          />,
          <TextInput
            question="Weight (lbs)"
            setTextValue={setWeight}
            defaultText={weight}
          />,
          <Dropdown
            question="Climbing Ability"
            options={["Level 1", "Level 2", "Level 3", "None"]}
            defaultValue={climbingAbility}
            setSelectedValue={setClimbingAbility}
          />,
          <TextInput
            question="Max Fuel Storage"
            setTextValue={setMaxFuelStorage}
            defaultText={maxFuelStorage}
          />,
        ]}
        backPage="pit-scouting/start-info"
        nextPage="pit-scouting/capabilities-page-two"
        pitScoutingState={pitScoutingState}
      />
    </div>
  );
};

export default PitScoutingCapabilitiesPageOne;
