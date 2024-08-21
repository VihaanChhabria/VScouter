import React, { useState } from "react";
import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartImage from "../components/AutoStartImage";
import NoShowButton from "../components/NoShowButton";

const InitialAutoPage = () => {
  const [noShow, setNoShow] = useState(false);

  return (
    <>
      <ProceedBackButton nextPage={noShow ? `/endgame` : `/auto-note-counter`} />
      <AutoStartImage />
      <NoShowButton noShow={noShow} setNoShow={setNoShow}/>
      <ProceedBackButton back={true} nextPage="/" />
    </>
  );
};

export default InitialAutoPage;
