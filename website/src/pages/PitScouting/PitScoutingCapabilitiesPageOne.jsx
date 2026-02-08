import React, { useState } from "react";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";

const PitScoutingCapabilitiesPageOne = () => {
  const [drivetrainType, setDrivetrainType] = useState(null);
  const [weight, setWeight] = useState(null);
  const [climbingAbility, setClimbingAbility] = useState(null);
  const [rateOfShooting, setRateOfShooting] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PitScoutingTemplate
        title="Pit Scouting Capabilities Page One"
        components={[
          <Dropdown
            question="Drivetrain Type"
            options={["Swerve", "Tank", "Mecanum", "Other"]}
            setSelectedValue={setDrivetrainType}
          />,
          <TextInput question="Weight (lbs)" setTextValue={setWeight} />,
          <Dropdown
            question="Climbing Ability"
            options={["Level 1", "Level 2", "Level 3", "None"]}
            setSelectedValue={setClimbingAbility}
          />,
          <TextInput
            question="Rate of Shooting (Fuels Per Second)"
            setTextValue={setRateOfShooting}
          />,
        ]}
        backPage="pit-scouting/start-info"
        nextPage="pit-scouting/capabilities-page-two"
      />
    </div>
  );
};

export default PitScoutingCapabilitiesPageOne;
