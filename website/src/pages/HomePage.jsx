import React from "react";

import ProceedBackButton from "../components/ProceedBackButton";
import HomeFullscreenButton from "../components/HomeComponents/HomeFullscreenButton";
import HomeDumpDataButton from "../components/HomeComponents/HomeDumpDataButton";

import VScouterLogo from "../assets/VScouterLogo.png";
import FRCReefscapeLogo from "../assets/FRCReefscapeLogo.svg";

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
              height: "85%",
              borderRadius: "6dvh",
            }}
          />
          <img
            src={FRCReefscapeLogo}
            style={{
              width: "auto",
              height: "15%",
              filter: "invert(100%)",
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
