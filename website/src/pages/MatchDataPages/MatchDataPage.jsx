import React from "react";
import MatchDataSection from "../../components/MatchDataComponents/MatchDataSection";
import MatchDataTypeButton from "../../components/MatchDataComponents/MatchDataTypeButton";
import { useNavigate } from "react-router-dom";

const MatchDataPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", height: "100%" }}>
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
          position: "absolute",
          top: "1.07dvh",
          left: "2.33dvw",
        }}
        onClick={() => {
          navigate("/settings");
        }}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          gap: "5%",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "7dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Where are you getting your data from?
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5%",
            height: "40%",
            width: "100%",
          }}
        >
          <MatchDataTypeButton useOnline={true} />
          <MatchDataTypeButton useOnline={false} />
        </div>
      </div>
    </div>
  );
};

export default MatchDataPage;
