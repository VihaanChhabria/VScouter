import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ backgroundColor: "#3A3B3E", height: window.innerHeight, width: "100vw", overflow: "hidden" }}>
      <Outlet/>
    </div>
  );
};

export default MainLayout;
