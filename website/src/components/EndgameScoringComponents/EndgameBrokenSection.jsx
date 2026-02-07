import React from "react";
import SelectOptions from "../SelectOptions";
import ToggleButton from "../ToggleButton";

const EndgameBrokenSection = ({
  brokenDown,
  setBrokenDown,
  brokenDownTime,
  setBrokenDownTime,
}) => {
  return (
    <div
      style={{
        height: "100%",
        flex: 0.75-0.45,
        backgroundColor: "#3B3B3B",
        borderColor: "#1D1E1E",
        borderWidth: "2dvh",
        borderRadius: "3.49dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "5.5dvh",
          fontWeight: "bold",
          marginBottom: "2dvh",
          marginTop: "1dvh",
        }}
      >
        Broken
      </h1>

      <div
        style={{
          paddingLeft: "1.5dvw",
          paddingRight: "1.5dvw",
          width: "100%",
          height: "20%",
        }}
      >
        <ToggleButton
          question={"Broken Down?"}
          selected={brokenDown}
          setSelected={(value) => setBrokenDown(value)}
          fontSize={"4dvh"}
        />
      </div>

      {brokenDown && (
        <div style={{ width: "100%", height: "80%", padding: "0 1.5dvw" }}>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "3dvh",
              fontWeight: "500",
              margin: "1.5dvh 0",
            }}
          >
            How Long Was the Robot Broken Down For?
          </h1>
          <div style={{ width: "100%", height: "75%" }}>
            <SelectOptions
              optionsData={["Shortly", "A Lot", "Whole Match"]}
              optionSelected={brokenDownTime}
              setOptionSelected={(value) => setBrokenDownTime(value)}
              flexDirection={"column"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EndgameBrokenSection;
