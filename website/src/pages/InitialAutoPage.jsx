import React from "react";
import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartImage from "../components/AutoStartImage";

const InitialAutoPage = () => {
  return (
    <>
      <ProceedBackButton nextPage="/auto-note-counter" />
      <AutoStartImage />
      <ProceedBackButton back={true} nextPage="/" />
    </>
  );
};

export default InitialAutoPage;
