import React from "react";
import ProceedBackButton from "../components/ProceedBackButton";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  return (
    <>
      <ProceedBackButton
        nextPage={`/settings`}
        width={14.91}
        height={17.84}
        coordX={1.07}
        coordY={2.33}
        message={"Settings"}
      />

      <ProceedBackButton nextPage={`/game-start`} />
      <ToastContainer />
    </>
  );
};

export default HomePage;
