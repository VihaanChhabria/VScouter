import React from "react";
import { Outlet } from "react-router-dom";

import MainLayoutBluetoothCheck from "../components/MainLayoutComponents/MainLayoutBluetoothCheck";
import MainLayoutPortraitWarning from "../components/MainLayoutComponents/MainLayoutPortraitWarning";

const MainLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "#3A3B3E",
        height: window.innerHeight,
        width: "100dvw",
        overflow: "hidden",
      }}
    >
      <MainLayoutBluetoothCheck />
      <MainLayoutPortraitWarning />
      <Outlet />
    </div>
  );
};

export default MainLayout;
