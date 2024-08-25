import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import SelectAlliance from "../components/InitialComponents/InitialSelectAlliance";
import TextInput from "../components/TextInput";
import SelectTeam from "../components/InitialComponents/InitialSelectTeam";

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
  const [matchNumber, setMatchNumber] = useState(states?.inputs?.matchNumber || null);
  const [scouterInitials, setScouterInitials] = useState(states?.inputs?.scouterInitials || null);
  const [selectTeam, setSelectTeam] = useState(states?.inputs?.selectTeam || null);

  return (
    <>
      {/* Render the SelectAlliance component to select which alliance to scout */}
      <SelectAlliance currentAlliance={alliance} setAlliance={setAlliance} />

      {/* Render the TextInput component to take in the match number */}
      <TextInput
        question="Match Number"
        coordX={1.07}
        coordY={41.75}
        defaultText={matchNumber}
        setTextValue={setMatchNumber}
      />

      {/* Render the TextInput component to take in the scouter's initials */}
      <TextInput
        question="Scouter Initials"
        coordX={1.07}
        coordY={63.95}
        defaultText={scouterInitials}
        setTextValue={setScouterInitials}
      />

      {/* Render the SelectTeam component to select which team to scout */}
      <SelectTeam defaultSelectTeam={selectTeam} setSelectTeam={setSelectTeam} />

      {/* Render the ProceedBackButton to navigate to the next page and pass in the selected data as props */}
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
