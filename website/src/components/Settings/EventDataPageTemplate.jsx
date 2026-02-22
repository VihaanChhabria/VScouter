import React from "react";
import ProceedBackButton from "../ProceedBackButton";

const EventDataPageTemplate = ({ backTo, title, question, children }) => {
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
          <ProceedBackButton nextPage={backTo} back={true} />
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
        <div style={{ width: "17.5dvw", minWidth: "17.5dvw", flexShrink: 0 }} />
      </div>

      <div
        style={{
          flex: "1",
          minHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20dvh 2dvw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10%",
            width: "100%",
            maxWidth: "88dvw",
            height: "100%",
          }}
        >
          {question && (
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "5.58dvh",
                fontWeight: "bold",
                textAlign: "center",
                width: "80%",
              }}
            >
              {question}
            </h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default EventDataPageTemplate;
