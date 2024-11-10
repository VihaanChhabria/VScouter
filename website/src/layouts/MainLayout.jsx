import React from "react";
import { Outlet } from "react-router-dom";

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
      <MainLayoutPortraitWarning />
      <Outlet />
    </div>
  );
};

export default MainLayout;
