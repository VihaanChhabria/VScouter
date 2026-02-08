import React from "react";
import ProceedBackButton from "../../ProceedBackButton";

const PitScoutingTemplateNavigation = ({ backPage, nextPage }) => {
  return (
    <div
      style={{
        width: "100%",
        flex: 0.25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          height: "100%",
          flex: 0.3,
          padding: "2dvh 1.5dvw",
        }}
      >
        <ProceedBackButton back={true} nextPage={backPage} />
      </div>
      <div
        style={{
          height: "100%",
          flex: 0.7,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "7.5dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          VScouter Pit
        </h1>
      </div>
      <div
        style={{
          height: "100%",
          flex: 0.3,
          padding: "2dvh 1.5dvw",
        }}
      >
        <ProceedBackButton nextPage={nextPage} />
      </div>
    </div>
  );
};

export default PitScoutingTemplateNavigation;
