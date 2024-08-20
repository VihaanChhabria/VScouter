import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ backgroundColor: "#3A3B3E", height: screen.height }}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
