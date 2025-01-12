import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import GameStartSelectAlliance from "../components/GameStartComponents/GameStartSelectAlliance";
import GameStartTextInput from "../components/GameStartComponents/GameStartTextInput";
import GameStartSelectTeam from "../components/GameStartComponents/GameStartSelectTeam";

/**
 * Renders a component representing the Game Start Page.
 *
 * To be used before the game starts, collecting information such as match number, scouter initials, and the team that is being scouted.
 *
 * @return {JSX.Element} The component representing the Game Start Page.
 */
const GameStartPage = () => {
  const location = useLocation();
  const states = location.state;

  // Initialize the state with the passed in state from the previous page, or null if no state was passed in
  const [alliance, setAlliance] = useState(states?.inputs?.alliance || null);
  const [matchNumber, setMatchNumber] = useState(
    states?.inputs?.matchNumber || null
  );
  const [scouterInitials, setScouterInitials] = useState(
    states?.inputs?.scouterInitials || null
  );
  const [selectTeam, setSelectTeam] = useState(
    states?.inputs?.selectTeam || null
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
          width: "100dvw",
          padding: "5dvh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            gap: "3dvw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              flexBasis: 445,
              gap: "4dvh",
            }}
          >
            <div style={{ flexBasis: 160 }}>
              <GameStartTextInput
                question="Match Number"
                setTextValue={setMatchNumber}
                defaultText={matchNumber}
              />
            </div>
            <div style={{ flexBasis: 260 }}>
              <GameStartSelectAlliance
                currentAlliance={alliance}
                setAlliance={setAlliance}
              />
            </div>
            <div style={{ flexBasis: 160 }}>
              <GameStartTextInput
                question="Scouter Initials"
                setTextValue={setScouterInitials}
                defaultText={scouterInitials}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              flexBasis: 850,
              gap: "2dvh",
            }}
          >
            <div style={{ flexBasis: "60%" }}>
              <GameStartSelectTeam
                defaultSelectTeam={selectTeam}
                setSelectTeam={setSelectTeam}
                selectedMatch={matchNumber}
                selectedAlliance={alliance}
              />
            </div>

            <div
              style={{
                flexBasis: "40%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  flexBasis: "50%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                <h1
                  style={{
                    color: "#FFFFFF",
                    fontSize: "10dvh",
                    fontWeight: "bold",
                  }}
                >
                  Game Start
                </h1>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2dvh",
                }}
              >
                <div style={{ flexBasis: "30%" }}>
                  <ProceedBackButton nextPage={`/`} back={true} />
                </div>
                <div style={{ flexBasis: "70%" }}>
                  <ProceedBackButton nextPage={`/auto-start`} inputs={{
                    ...(states?.inputs || {}),
                    matchNumber: matchNumber,
                    alliance: alliance,
                    scouterInitials: scouterInitials,
                    selectTeam: selectTeam
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameStartPage;
