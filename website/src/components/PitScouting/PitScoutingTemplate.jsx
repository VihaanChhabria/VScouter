import React from "react";
import ProceedBackButton from "../ProceedBackButton";
import PitScoutingTemplateNavigation from "./PitScoutingTemplateComponents/PitScoutingTemplateNavigation";
import PitScoutingTemplateTitle from "./PitScoutingTemplateComponents/PitScoutingTemplateTitle";

const PitScoutingTemplate = ({ title, components }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <PitScoutingTemplateNavigation />

      <div
        style={{
          width: "100%",
          flex: 1 - 0.325,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 15dvw",
          gap: "2dvw",
        }}
      >
        {components.map((component, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: components.length + 1 > 2 ? "50%" : "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {component}
          </div>
        ))}
      </div>

      <PitScoutingTemplateTitle title={title} />
    </div>
  );
};

export default PitScoutingTemplate;
