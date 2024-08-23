import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import SelectAlliance from "../components/SelectAlliance";
import TextInput from "../components/TextInput";
import SelectTeam from "../components/SelectTeam";

const InitialPage = () => {
  const location = useLocation();
  const states = location.state;

  const [alliance, setAlliance] = useState(states?.inputs?.alliance || null);
  const [matchNumber, setMatchNumber] = useState(states?.inputs?.matchNumber || null);
  const [scouterInitials, setScouterInitials] = useState(states?.inputs?.scouterInitials || null);
  const [selectTeam, setSelectTeam] = useState(states?.inputs?.selectTeam || null);


  return (
    <>
      <ProceedBackButton
        nextPage="/initial-auto"
        inputs={{
          ...(states?.inputs || {}),
          alliance: alliance,
          matchNumber: matchNumber,
          scouterInitials: scouterInitials,
          selectTeam: selectTeam,
        }}
      />
      <SelectAlliance currentAlliance={alliance} setAlliance={setAlliance} />
      <TextInput
        question="Match Number"
        coordX={10}
        coordY={179.52}
        defaultText={matchNumber}
        setTextValue={setMatchNumber}
      />
      <TextInput
        question="Scouter Initials"
        coordX={10}
        coordY={275}
        defaultText={scouterInitials}
        setTextValue={setScouterInitials}
      />
      <SelectTeam defaultSelectTeam={selectTeam} setSelectTeam={setSelectTeam} />
    </>
  );
};

export default InitialPage;
