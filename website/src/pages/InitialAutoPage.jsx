import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartImage from "../components/AutoStartImage";
import NoShowButton from "../components/NoShowButton";
import AutoStartCounter from "../components/AutoStartCounter";

const InitialAutoPage = () => {
  const location = useLocation();
  const { inputs } = location.state
  console.log(inputs)

  const [noShow, setNoShow] = useState(false);

  return (
    <>
      <ProceedBackButton nextPage={noShow ? `/endgame` : `/auto-note-counter`} />
      <AutoStartImage />
      <NoShowButton noShow={noShow} setNoShow={setNoShow} />
      <AutoStartCounter />
      <ProceedBackButton back={true} nextPage="/" />
    </>
  );
};

export default InitialAutoPage;
