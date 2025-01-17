import AutoScoringCoralPickupButton from "./AutoScoringCoralPickupButton";

const AutoScoringCoralPickup = ({pickPositions, pickPositionSelected, setPickPositionSelected}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1dvw",
      }}
    >
      {pickPositions.map((position, index) => (
        <div style={{ width: "100%", height: "100%", flex: 1 }} key={index}>
          <AutoScoringCoralPickupButton
            position={position}
            pickPositionSelected={pickPositionSelected}
            setPickPositionSelected={setPickPositionSelected}
          />
        </div>
      ))}
    </div>
  );
};

export default AutoScoringCoralPickup;
