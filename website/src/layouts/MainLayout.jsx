import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import MainLayoutPortraitWarning from "../components/MainLayoutComponents/MainLayoutPortraitWarning";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../utils/supabase";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect full page load
    const navEntries = performance.getEntriesByType("navigation");
    const isHardReload =
      navEntries.length > 0 ? navEntries[0].type === "navigate" : true;

    // Prevent double-counting in React dev mode using a sessionStorage flag
    if (isHardReload && !sessionStorage.getItem("visitCounted")) {
      const visits = parseInt(localStorage.getItem("siteVisits") || "0", 10);
      localStorage.setItem("siteVisits", (visits + 1).toString());
      sessionStorage.setItem("visitCounted", "true");
    }

    if (
      (window.location.pathname === "/" ||
        window.location.pathname === "/ui/") &&
      parseInt(localStorage.getItem("siteVisits") || "0") >=
        parseInt(localStorage.getItem("lastRemindMeLater") || "0") + 5 &&
      (localStorage.getItem("sentTeamNumber") || "false") === "false"
    ) {
      navigate("/team-number-prompt");
    }

    if (
      navigator.onLine &&
      (localStorage.getItem("sentTeamNumber") || "false") === "false" &&
      (localStorage.getItem("teamNumber") || "") !== ""
    ) {
      const submitTeamNumber = async () => {
        const { data, error } = await supabase
          .from("teams")
          .insert([{ team_num: parseInt(localStorage.getItem("teamNumber") || "0000") }]);

        if (error) {
          console.log("Error submitting team number:", error);
          return;
        }
        localStorage.setItem("sentTeamNumber", "true");
      };
      submitTeamNumber();
    }

    // if online
    if (navigator.onLine) {
      if (!localStorage.getItem("lastWebsiteGet")) {
        localStorage.setItem("lastWebsiteGet", new Date().getTime());
        location.reload();
      }
      // reloading to get website recached if there is a new update of the website
      if (
        new Date().getTime() - localStorage.getItem("lastWebsiteGet") >=
        10000
      ) {
        localStorage.setItem("lastWebsiteGet", new Date().getTime());
        // location.reload();
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
