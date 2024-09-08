import React from "react";
import { ToastContainer } from "react-toastify";

import ProceedBackButton from "../components/ProceedBackButton";
import HomeBluetoothConnectButton from "../components/HomeComponents/HomeBluetoothConnectButton";
import HomeFullscreenButton from "../components/HomeComponents/HomeFullscreenButton";

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

      <HomeFullscreenButton />

      <HomeBluetoothConnectButton />

      <ProceedBackButton nextPage={`/game-start`} message={"Game Start"} />

      <ToastContainer />
    </>
  );
};

export default HomePage;
