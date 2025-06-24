import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import GameStartPage from "./pages/GameStartPage";
import AutoStartPage from "./pages/AutoStartPage";
import AutoScoringPage from "./pages/AutoScoringPage";
import TeleopScoringPage from "./pages/TeleopScoringPage";
import EndgameScoringPage from "./pages/EndgameScoringPage";
import SettingsPage from "./pages/SettingsPage";

import { useEffect, useState } from "react";
import ParseDataPage from "./pages/ParseDataPage";
import MatchDataPage from "./pages/MatchDataPage";
import MatchDataOnlinePage from "./pages/MatchDataOnlinePage";
import MatchDataOfflinePage from "./pages/MatchDataOfflinePage";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      document.body.style.display = "none"; // Trigger reflow
      document.body.offsetHeight; // Force reflow
      document.body.style.display = ""; // Restore display
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const basePath = import.meta.env.DEV ? "/" : "/ui/";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={basePath} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="game-start" element={<GameStartPage />} />
        <Route path="auto-start" element={<AutoStartPage />} />
        <Route path="auto-scoring" element={<AutoScoringPage />} />
        <Route path="teleop-scoring" element={<TeleopScoringPage />} />
        <Route path="endgame-scoring" element={<EndgameScoringPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="parse-data" element={<ParseDataPage />} />
        <Route path="match-data" element={<MatchDataPage />} />
        <Route path="match-data/online" element={<MatchDataOnlinePage />} />
        <Route path="match-data/offline" element={<MatchDataOfflinePage />} />
      </Route>
    )
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
