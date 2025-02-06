import React from "react";
import { useNavigate } from "react-router-dom";

const MatchDataTypeButton = ({useOnline}) => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: "25%",
        height: "100%",
        border: "1.63dvh solid #1D1E1E",
        backgroundColor: "#242424",
        borderRadius: "3.49dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => useOnline ? navigate("online") : navigate("offline")}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "5.58dvh",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {useOnline ? "Online" : "Offline"}
      </h1>
    </div>
  );
};

export default MatchDataTypeButton;
