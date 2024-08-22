import React, { useState } from "react";

import ProceedBackButton from "../components/ProceedBackButton";
import SelectAlliance from "../components/SelectAlliance";
import TextInput from "../components/TextInput";
import SelectTeam from "../components/SelectTeam";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [alliance, setAlliance] = useState(null);
  const [matchNumber, setMatchNumber] = useState(null);
  const [scouterInitials, setScouterInitials] = useState(null);
  const [selectTeam, setSelectTeam] = useState(null);

  return (
    <>
      <ProceedBackButton
        nextPage="/initial-auto"
        inputs={{
          alliance: alliance,
          matchNumber: matchNumber,
          scouterInitials: scouterInitials,
          selectTeam: selectTeam,
        }}
      />
      <SelectAlliance setAlliance={setAlliance} />
      <TextInput
        question="Match Number"
        coordX={10}
        coordY={179.52}
        setTextValue={setMatchNumber}
      />
      <TextInput
        question="Scouter Initials"
        coordX={10}
        coordY={275}
        setTextValue={setScouterInitials}
      />
      <SelectTeam setSelectTeam={setSelectTeam} />
      <ToastContainer />
    </>
  );
};

export default HomePage;
