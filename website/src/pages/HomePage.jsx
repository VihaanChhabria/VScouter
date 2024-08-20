import React from "react";

import ProceedBackButton from "../components/ProceedBackButton";
import SelectAlliance from "../components/SelectAlliance";
import TextInput from "../components/TextInput";

const HomePage = () => {
  return (
    <>
      <ProceedBackButton />
      <SelectAlliance />
      <TextInput question="Match Number" coordX={10} coordY={179.52}/>
      <TextInput question="Scouter Initials" coordX={10} coordY={275}/>
    </>
  );
};

export default HomePage;
