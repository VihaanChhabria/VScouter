import React from "react";

import ProceedBackButton from "../components/ProceedBackButton";
import HomeFullscreenButton from "../components/HomeComponents/HomeFullscreenButton";
import HomeDumpDataButton from "../components/HomeComponents/HomeDumpDataButton";

import VScouterLogo from "../assets/VScouterLogo.png";
import FRCLogo from "../assets/FRCLogo.svg";

const HomePage = () => {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "8dvh 5dvw 8dvh 5dvw",
          gap: "3dvw",
        }}
      >
        <div
          style={{
            width: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3dvh",
          }}
        >
          <img
            src={VScouterLogo}
            style={{
              width: "auto",
              height: "80%",
              borderRadius: "6dvh",
            }}
          />
          <img
            src={FRCLogo}
            style={{
              width: "auto",
              height: "20%",
            }}
          />
        </div>

        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2dvh",
            flex: "1",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "250%",
            }}
          >
            <ProceedBackButton
              nextPage={`game-start`}
              message={"Start Scouting"}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <HomeDumpDataButton />
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ProceedBackButton nextPage={`settings`} message={"Settings"} />
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <HomeFullscreenButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
