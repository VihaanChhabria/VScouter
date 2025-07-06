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
      document.body.style.display = "none";
      document.body.offsetHeight;
      document.body.style.display = "";
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const basePaths = ["/", "/ui/"];

  const routes = basePaths.map((base) => (
    <Route path={base} element={<MainLayout />} key={base}>
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
  ));

  const router = createBrowserRouter(createRoutesFromElements(routes));

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/ui/sw.js", { scope: "/ui/" });

      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          // Unregister the service worker that is not scoped to /ui/
          // This is to ensure that the service worker is only active for the /ui/ path
          if (!registration.scope.includes("/ui/")) {
            registration.unregister();
            console.log(
              "Unregistered service worker not scoped to /ui/:",
              registration.scope
            );
            setTimeout(() => {}, 200);
          }
        }
      });
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
