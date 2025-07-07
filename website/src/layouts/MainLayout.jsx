import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import MainLayoutPortraitWarning from "../components/MainLayoutComponents/MainLayoutPortraitWarning";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  useEffect(() => {

    if (window.location.hostname.includes("vscouter-docs.netlify.app")) {
      window.location.replace("https://vscouter.netlify.app/home/");
      return;
    }

    // if online
    if (navigator.onLine) {
      if (!localStorage.getItem("lastWebsiteGet")) {
        localStorage.setItem("lastWebsiteGet", new Date().getTime());
        location.reload();
      }
      // reloading to get website recached if there is a new update of the website
      if (new Date().getTime() - localStorage.getItem("lastWebsiteGet") >= 10000) {
        localStorage.setItem("lastWebsiteGet", new Date().getTime());
        location.reload();
      }
    }
  }, []);
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
