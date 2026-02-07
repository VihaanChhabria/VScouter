import React, { useEffect, useState } from "react";
import SelectOptions from "../SelectOptions";
import CenterPickUp from "../../assets/TeleopScoringImages/CenterPickUp.png";
import CenterShuttle from "../../assets/TeleopScoringImages/CenterShuttle.png";
import ReceivedShuttle from "../../assets/TeleopScoringImages/ReceivedShuttle.png";
import DepotOrOutpost from "../../assets/TeleopScoringImages/DepotOrOutpost.png";

const FUEL_SOURCE_OPTIONS = [
  "Center Pick Up",
  "Center Shuttle",
  "Received Shuttle",
  "Depot or Outpost",
];
const FUEL_SOURCE_IMAGES = [
  CenterPickUp,
  CenterShuttle,
  ReceivedShuttle,
  DepotOrOutpost,
];

const TeleopFuelSourceSection = ({
  fuelShotAndSourceInfo,
  optionSelected,
  setOptionSelected,
}) => {
  const [centerPickUpCount, setCenterPickUpCount] = useState(0);
  const [centerShuttleCount, setCenterShuttleCount] = useState(0);
  const [receivedShuttleCount, setReceivedShuttleCount] = useState(0);
  const [depotOrOutpostCount, setDepotOrOutpostCount] = useState(0);

  useEffect(() => {
    setCenterPickUpCount(
      fuelShotAndSourceInfo.filter((shot) => shot.source === "Center Pick Up")
        .length,
    );

    setCenterShuttleCount(
      fuelShotAndSourceInfo.filter((shot) => shot.source === "Center Shuttle")
        .length,
    );

    setReceivedShuttleCount(
      fuelShotAndSourceInfo.filter((shot) => shot.source === "Received Shuttle")
        .length,
    );

    setDepotOrOutpostCount(
      fuelShotAndSourceInfo.filter((shot) => shot.source === "Depot or Outpost")
        .length,
    );
  }, [fuelShotAndSourceInfo]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2.5dvh",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "5dvh",
          fontWeight: "bold",
        }}
      >
        Select Shooting Data
      </h1>
      <div
        style={{
          paddingLeft: "2dvh",
          paddingRight: "2dvh",
          paddingTop: "2dvw",
          paddingBottom: "1dvw",
          width: "100%",
          height: "100%",
        }}
      >
        <SelectOptions
          optionsData={FUEL_SOURCE_OPTIONS}
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
          flexDirection="column"
          images={FUEL_SOURCE_IMAGES}
          numberData={[
            centerPickUpCount,
            centerShuttleCount,
            receivedShuttleCount,
            depotOrOutpostCount,
          ]}
        />
      </div>
    </div>
  );
};

export default TeleopFuelSourceSection;
