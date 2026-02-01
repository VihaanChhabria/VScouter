import React from "react";

const SelectOptions = ({
  optionsData,
  optionSelected,
  setOptionSelected,
  flexDirection = "row",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1dvw",
        flexDirection: flexDirection,
      }}
    >
      {optionsData.map((singleOptionsData, index) => {
        return (
          <div style={{ width: "100%", height: "100%", flex: 1 }} key={index}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor:
                  singleOptionsData == optionSelected ? "#507144" : "#242424",
                border: "1.63dvh solid #1D1E1E",
                borderRadius: "2dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                if (optionSelected == singleOptionsData) {
                  setOptionSelected(null);
                  return;
                }
                setOptionSelected(singleOptionsData);
              }}
              id={singleOptionsData}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "3.25dvh",
                  fontWeight: "700",
                  padding: "0dvh 1dvw",
                }}
              >
                {singleOptionsData}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectOptions;
