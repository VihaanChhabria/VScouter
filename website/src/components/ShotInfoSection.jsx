import React from "react";
import SelectOptions from "./SelectOptions";

const ShotInfoSection = ({
  hopperPercent,
  setHopperPercent,
  shotsPercent,
  setShotsPercent,
  submitOnClick = () => {},
}) => {
  return (
    <div
      style={{
        backgroundColor: "#3B3B3B",
        borderColor: "#1D1E1E",
        borderWidth: "2dvh",
        borderRadius: "3.49dvh",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1dvh",
        padding: "2.5dvh",
      }}
    >
      {/* Title */}
      <h2
        style={{
          color: "#FFFFFF",
          fontSize: "3.5dvh",
          fontWeight: "bold",
        }}
      >
        Select Shooting Data
      </h2>

      {/* Percent of Hopper Filled */}
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
          Percent of Hopper Filled ±10%
        </h1>

        <SelectOptions
          optionsData={["20%", "50%", "80%"]}
          optionSelected={hopperPercent}
          setOptionSelected={setHopperPercent}
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
          Percent of Shots Successful ±10%
        </h1>

        <SelectOptions
          optionsData={["20%", "50%", "80%"]}
          optionSelected={shotsPercent}
          setOptionSelected={setShotsPercent}
          flexDirection="row"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={() => {
          submitOnClick(hopperPercent, shotsPercent);
        }}
        style={{
          marginTop: "1dvh",
          padding: "1.5dvh 4dvh",
          fontSize: "3.5dvh",
          fontWeight: "bold",
          color: "#FFFFFF",
          backgroundColor: "#507144",
          border: "none",
          borderRadius: "2dvh",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ShotInfoSection;
