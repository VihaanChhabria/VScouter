import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import SelectAlliance from "../components/InitialComponents/InitialSelectAlliance";
import TextInput from "../components/TextInput";
import SelectTeam from "../components/InitialComponents/InitialSelectTeam";

const GameStartPage = () => {
  const location = useLocation();
  const states = location.state;

  const [alliance, setAlliance] = useState(states?.inputs?.alliance || null);
  const [matchNumber, setMatchNumber] = useState(states?.inputs?.matchNumber || null);
  const [scouterInitials, setScouterInitials] = useState(states?.inputs?.scouterInitials || null);
  const [selectTeam, setSelectTeam] = useState(states?.inputs?.selectTeam || null);

  return (
    <>
      <SelectAlliance currentAlliance={alliance} setAlliance={setAlliance} />
      <TextInput
        question="Match Number"
        coordX={1.07}
        coordY={41.75}
        defaultText={matchNumber}
        setTextValue={setMatchNumber}
      />
      <TextInput
        question="Scouter Initials"
        coordX={1.07}
        coordY={63.95}
        defaultText={scouterInitials}
        setTextValue={setScouterInitials}
      />
      <SelectTeam defaultSelectTeam={selectTeam} setSelectTeam={setSelectTeam} />

      <ProceedBackButton
        nextPage="/auto-start"
        inputs={{
          ...(states?.inputs || {}),
          alliance: alliance,
          matchNumber: matchNumber,
          scouterInitials: scouterInitials,
          selectTeam: selectTeam,
        }}
      />
    </>
  );
};

export default GameStartPage;
