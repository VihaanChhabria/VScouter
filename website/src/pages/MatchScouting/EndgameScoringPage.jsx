import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import EndgamePageControlSection from "../../components/MatchScouting/EndgameScoringComponents/EndgamePageControlSection";
import EndgameBrokenSection from "../../components/MatchScouting/EndgameScoringComponents/EndgameBrokenSection";
import EndgameDefenseSection from "../../components/MatchScouting/EndgameScoringComponents/EndgameDefenseSection";

const EndgameScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [comments, setComments] = useState(states?.inputs?.comment || "");

  const [brokenDown, setBrokenDown] = useState(states?.inputs?.broken || false);
  const [brokenDownTime, setBrokenDownTime] = useState(
    states?.inputs?.brokenDownTime || "",
  );

  const [playedDefense, setPlayedDefense] = useState(
    states?.inputs?.playedDefense || false,
  );
  const [defenseTime, setDefenseTime] = useState(
    states?.inputs?.defenseTime || "",
  );
  const [defenseSkill, setDefenseSkill] = useState(
    states?.inputs?.defenseSkill || "",
  );
  const [playedDefenseOn, setPlayedDefenseOn] = useState(
    states?.inputs?.playedDefenseOn || 0,
  );

  useEffect(() => {
    if (!brokenDown) {
      setBrokenDownTime("");
    }
  }, [brokenDown]);

  useEffect(() => {
    if (!playedDefense) {
      setDefenseTime("");
      setDefenseSkill("");
      setPlayedDefenseOn(0);
    }
  }, [playedDefense]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "2dvh",
        padding: "4dvh 2dvw",
      }}
    >
      <EndgameDefenseSection
        playedDefense={playedDefense}
        setPlayedDefense={setPlayedDefense}
        defenseTime={defenseTime}
        setDefenseTime={setDefenseTime}
        defenseSkill={defenseSkill}
        setDefenseSkill={setDefenseSkill}
        playedDefenseOn={playedDefenseOn}
        setPlayedDefenseOn={setPlayedDefenseOn}
      />

      <EndgameBrokenSection
        brokenDown={brokenDown}
        setBrokenDown={setBrokenDown}
        brokenDownTime={brokenDownTime}
        setBrokenDownTime={setBrokenDownTime}
      />

      <div
        style={{
          height: "100%",
          flex: 0.25,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1dvh",
        }}
      >
        <textarea
          style={{
            width: "100%",
            flex: 0.6,
            border: "0.93dvh solid #1D1E1E",
            borderRadius: "2.33dvh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            fontSize: "3.0dvh",
            padding: "1.56dvh",
          }}
          onChange={(e) => setComments(e.target.value)}
          id="comments"
          defaultValue={comments}
          placeholder="Enter Comments Here"
        />
        <div style={{ flex: 0.4, width: "100%" }}>
          <EndgamePageControlSection
            states={states}
            extraInputs={{
              comments,
              broken: brokenDown,
              brokenDownTime,
              playedDefense,
              defenseTime,
              defenseSkill,
              playedDefenseOn,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EndgameScoringPage;
