import React from "react";
import ProceedBackButton from "../components/ProceedBackButton";
import { ToastContainer } from "react-toastify";
import HomeBluetoothConnectButton from "../components/HomeComponents/HomeBluetoothConnectButton";
import { BluetoothDeviceProvider } from "../contexts/BluetoothDeviceContext";

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

      <BluetoothDeviceProvider>
        <HomeBluetoothConnectButton />
      </BluetoothDeviceProvider>
      
      <ProceedBackButton nextPage={`/game-start`} message={"Game Start"} />

      <ToastContainer />
    </>
  );
};

export default HomePage;
