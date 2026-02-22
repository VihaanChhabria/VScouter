import React from "react";
import { useNavigateWithBase } from "../../utils/useNavigateWithBase";

const EventDataPageTemplate = ({ backTo, title, question, children }) => {
  const navigate = useNavigateWithBase();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          padding: "1.07dvh 2.33dvw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "1.63dvh solid #1D1E1E",
            width: "14.91dvw",
            height: "17.84dvh",
            backgroundColor: "#242424",
            borderRadius: "3.49dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate(backTo)}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
            }}
          >
            Back
          </h1>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10%",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "8dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </h1>
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
  );
};

export default EventDataPageTemplate;
