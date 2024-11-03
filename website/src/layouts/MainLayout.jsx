import React from "react";
import { Outlet } from "react-router-dom";

import MainLayoutBluetoothCheck from "../components/MainLayoutComponents/MainLayoutBluetoothCheck";

const MainLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "#3A3B3E",
        height: window.innerHeight,
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <MainLayoutBluetoothCheck />
      <Outlet />
    </div>
  );
};

export default MainLayout;
