import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartImage from "../components/AutoStartImage";
import NoShowButton from "../components/NoShowButton";
import AutoStartCounter from "../components/AutoStartCounter";

const InitialAutoPage = () => {
  const location = useLocation();
  const states = location.state;

  const [noShow, setNoShow] = useState(states?.inputs?.noShow || false);
  const [startCounter, setStartCounter] = useState(states?.inputs?.startCounter || 1);

  return (
    <>
      <ProceedBackButton
        nextPage={noShow ? `/endgame` : `/auto-note-counter`}
        inputs={{
          ...(states?.inputs || {}),
          noShow: noShow,
          startCounter: startCounter,
        }}
      />
      <AutoStartImage alliance={states?.inputs?.alliance || "blue"} />
      <NoShowButton noShow={noShow} setNoShow={setNoShow} />
      {!noShow && (
        <AutoStartCounter startCounter={startCounter} setStartCounter={setStartCounter} />
      )}
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

export default InitialAutoPage;
