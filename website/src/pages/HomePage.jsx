import React from "react";
import { ToastContainer } from "react-toastify";

import ProceedBackButton from "../components/ProceedBackButton";
import HomeFullscreenButton from "../components/HomeComponents/HomeFullscreenButton";
import HomeDumpDataButton from "../components/HomeComponents/HomeDumpDataButton";

import VScouterLogo from "../assets/VScouterLogo.png";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "5dvw",
      }}
    >
      <img
        src={VScouterLogo}
        alt="VScouterLogo"
        style={{ height: "80%", width: "auto", borderRadius: "6dvh" }}
      />

      <div
        style={{
          height: "75%",
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "2dvh",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "250%",
          }}
        ><ProceedBackButton
        nextPage={`/game-start`}
        message={"Start Scouting"}
      /></div>

        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        ><HomeDumpDataButton /></div>

        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        ><ProceedBackButton
        nextPage={`/settings`}
        message={"Settings"}
      /></div>

        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        ><HomeFullscreenButton /></div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default HomePage;
