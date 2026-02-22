import React from "react";

import ProceedBackButton from "../../components/ProceedBackButton";

const SettingsPage = () => {
  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        flexDirection: "column",
        padding: "2dvh 2dvw",
        boxSizing: "border-box",
      }}
    >
      {/* Top section: back button (left) and title (centered) */}
      <div
        style={{
          flex: "0 0 20dvh",
          minHeight: "17.5dvh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2dvh 2dvw",
          gap: "2dvw",
        }}
      >
        <div
          style={{
            width: "15dvw",
            height: "100%",
            flexShrink: 0,
          }}
        >
          <ProceedBackButton nextPage="/" back={true} />
        </div>
        <h1
          style={{
            flex: 1,
            color: "#FFFFFF",
            fontSize: "8dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Settings
        </h1>
        <div style={{ width: "17.5dvw", minWidth: "17.5dvw", flexShrink: 0 }} />
      </div>

      {/* Content section: 75dvh - 2x2 grid of buttons */}
      <div
        style={{
          flex: "1",
          minHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10dvh 2dvw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "2.5dvh",
            width: "100%",
            maxWidth: "88dvw",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          <div style={{ width: "100%", height: "100%", minHeight: "0" }}>
            <ProceedBackButton
              nextPage="settings/match-scouting"
              message="Match Scout"
            />
          </div>
          <div style={{ width: "100%", height: "100%", minHeight: "0" }}>
            <ProceedBackButton
              nextPage="settings/pit-scouting"
              message="Pit Scout"
            />
          </div>
          <div style={{ width: "100%", height: "100%", minHeight: "0" }}>
            <ProceedBackButton
              nextPage="parse-data"
              message="Parse Data"
            />
          </div>
          <div style={{ width: "100%", height: "100%", minHeight: "0" }}>
            <ProceedBackButton
              nextPage="match-data"
              message="Event Data Settings"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
