import React from "react";
import SelectOptions from "../SelectOptions";
import ToggleButton from "../ToggleButton";

const EndgameDefenseSection = ({
  playedDefense,
  setPlayedDefense,
  defenseTime,
  setDefenseTime,
  defenseSkill,
  setDefenseSkill,
  playedDefenseOn,
  setPlayedDefenseOn,
}) => {
  return (
    <div
      style={{
        height: "100%",
        flex: 0.45,
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
        Defense
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
          question={"Played Defense?"}
          selected={playedDefense}
          setSelected={(value) => setPlayedDefense(value)}
          fontSize={"4dvh"}
        />
      </div>

      {playedDefense && (
        <div style={{ width: "100%", height: "80%", padding: "0 1.5dvw" }}>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "1dvh",
            }}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "3dvh",
                fontWeight: "500",
              }}
            >
              How Long Did They Play Defense ±10%
            </h1>

            <SelectOptions
              optionsData={["20%", "50%", "80%"]}
              optionSelected={defenseTime}
              setOptionSelected={setDefenseTime}
              flexDirection="row"
            />
          </div>

          {/* Percent of Shots Successful */}
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "1dvh",
            }}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "3dvh",
                fontWeight: "500",
              }}
            >
              How Skilled Were They at Defense
            </h1>

            <SelectOptions
              optionsData={["Gave Penalties", "Average", "Very Skilled"]}
              optionSelected={defenseSkill}
              setOptionSelected={setDefenseSkill}
              flexDirection="row"
            />
          </div>
          {/* Team Number Defense Was Played On */}
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "1dvh",
            }}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "3dvh",
                fontWeight: "500",
              }}
            >
              Team Number Defense Was Played On
            </h1>

            <input
              type="number"
              value={playedDefenseOn}
              onChange={(e) => setPlayedDefenseOn(e.target.value)}
              placeholder="e.g. 7414"
              style={{
                height: "6dvh",
                fontSize: "2.5dvh",
                padding: "0 1dvw",
                borderRadius: "1dvh",
                border: "2px solid #1D1E1E",
                backgroundColor: "#2E2E2E",
                color: "#FFFFFF",
                outline: "none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EndgameDefenseSection;
