import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartImage from "../components/AutoStartComponents/AutoStartImage";
import AutoStartNoShowButton from "../components/AutoStartComponents/AutoStartNoShowButton";
import AutoStartCounter from "../components/AutoStartComponents/AutoStartCounter";

const AutoStartPage = () => {
  const location = useLocation();
  const states = location.state;

  const [noShow, setNoShow] = useState(states?.inputs?.noShow || false);
  const [startCounter, setStartCounter] = useState(states?.inputs?.startCounter || 1);

  return (
    <>
      <AutoStartImage alliance={states?.inputs?.alliance || "blue"} />
      <AutoStartNoShowButton noShow={noShow} setNoShow={setNoShow} />
      {!noShow && (
        <AutoStartCounter startCounter={startCounter} setStartCounter={setStartCounter} />
      )}
      
      <ProceedBackButton
        nextPage={noShow ? `/endgame` : `/auto-scoring`}
        inputs={{
          ...(states?.inputs || {}),
          noShow: noShow,
          startCounter: startCounter,
        }}
      />
      <ProceedBackButton
        back={true}
        nextPage="/"
        inputs={{
          ...(states?.inputs || {}),
          noShow: noShow,
          startCounter: startCounter,
        }}
      />
    </>
  );
};

export default AutoStartPage;
