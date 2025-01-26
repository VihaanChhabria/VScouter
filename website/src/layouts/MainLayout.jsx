import React from "react";
import { Outlet } from "react-router-dom";

import MainLayoutPortraitWarning from "../components/MainLayoutComponents/MainLayoutPortraitWarning";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
      <MainLayoutPortraitWarning />
      <Outlet />
    </div>
  );
};

export default MainLayout;
