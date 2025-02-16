import ScoringPickupButton from "./ScoringPickupButton";

const ScoringPickup = ({
  pickData,
  pickPositionSelected,
  setPickPositionSelected,
  place,
}) => {
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
      {pickData.map((singlePickData, index) => {
        if (!singlePickData.hide) {
          return (
            <div style={{ width: "100%", height: "100%", flex: 1 }} key={index}>
              <ScoringPickupButton
                position={singlePickData.position}
                pickPositionSelected={pickPositionSelected}
                setPickPositionSelected={setPickPositionSelected}
                place={place}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ScoringPickup;
