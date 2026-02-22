import React from "react";
import ProceedBackButton from "../ProceedBackButton";
import { toast } from "react-toastify";

const SettingsScoutingTemplate = ({ title, localStorageKey, children }) => {
  const clearData = () => {
    localStorage.removeItem(localStorageKey);
    toast.success("Data Cleared");
  };
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
      <div
        style={{
          flex: "0 0 20dvh",
          minHeight: "20dvh",
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
          <ProceedBackButton nextPage="/settings" back={true} />
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
          {title}
        </h1>
        <div style={{ width: "15dvw", minWidth: "15dvw", flexShrink: 0 }} />
      </div>

      <div
        style={{
          flex: "1",
          minHeight: "0",
          display: "flex",
          alignItems: "stretch", // allow child to take full height
          justifyContent: "center",
          padding: children? "5dvh 2dvw": "20dvh 2dvw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "1fr",
            gap: "2.5dvh",
            width: "100%",
            maxWidth: "88dvw",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          {children && (
            <div
              style={{
                gridColumn: "1 / -1",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {children}
            </div>
          )}

          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1.63dvh solid #1D1E1E",
              backgroundColor: "#242424",
              borderRadius: "3.49dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
            onClick={clearData}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "5.58dvh",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Clear Data
            </h1>
          </div>

          <div style={{ width: "100%", height: "100%" }}>
            <ProceedBackButton
              nextPage="settings/view-data"
              message="View Data"
              inputs={{ localStorageKey }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScoutingTemplate;
