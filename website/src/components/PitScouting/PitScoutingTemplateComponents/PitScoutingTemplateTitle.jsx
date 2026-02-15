import React from "react";

const PitScoutingTemplateTitle = ({ title }) => {
  return (
    <div
      style={{
        width: "100%",
        flex: 0.125,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "5dvh",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default PitScoutingTemplateTitle;
