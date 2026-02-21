import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import GameStartPage from "./pages/MatchScouting/GameStartPage";
import AutoScoringPage from "./pages/MatchScouting/AutoScoringPage";
import TeleopScoringPage from "./pages/MatchScouting/TeleopScoringPage";
import EndgameScoringPage from "./pages/MatchScouting/EndgameScoringPage";
import SettingsPage from "./pages/Settings/SettingsPage";

import { useEffect, useState } from "react";
import ParseDataPage from "./pages/Settings/ParseDataPage";
import MatchDataPage from "./pages/Settings/MatchDataPage";
import MatchDataOnlinePage from "./pages/Settings/MatchDataOnlinePage";
import MatchDataOfflinePage from "./pages/Settings/MatchDataOfflinePage";
import TeamNumberPromptPage from "./pages/Settings/TeamNumberPromptPage";
import PitScoutingInitialDataPage from "./pages/PitScouting/PitScoutingInitialDataPage";
import PitScoutingCapabilitiesPageOne from "./pages/PitScouting/PitScoutingCapabilitiesPageOne";
import PitScoutingCapabilitiesPageTwo from "./pages/PitScouting/PitScoutingCapabilitiesPageTwo";
import PitScoutingPhotoPage from "./pages/PitScouting/PitScoutingPhotoPage";
import { preloadAppImages } from "./utils/preloadImages";
import SettingsScoutingTemplate from "./components/Settings/SettingsScoutingTemplate";
import SettingsViewDataPage from "./pages/Settings/SettingsViewDataPage";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    preloadAppImages();
  }, []);

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
      <Route path="auto-scoring" element={<AutoScoringPage />} />
      <Route path="teleop-scoring" element={<TeleopScoringPage />} />
      <Route path="endgame-scoring" element={<EndgameScoringPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="parse-data" element={<ParseDataPage />} />
      <Route path="match-data" element={<MatchDataPage />} />
      <Route path="match-data/online" element={<MatchDataOnlinePage />} />
      <Route path="match-data/offline" element={<MatchDataOfflinePage />} />
      <Route path="team-number-prompt" element={<TeamNumberPromptPage />} />
      <Route
        path="pit-scouting/start-info"
        element={<PitScoutingInitialDataPage />}
      />
      <Route
        path="pit-scouting/capabilities-page-one"
        element={<PitScoutingCapabilitiesPageOne />}
      />
      <Route
        path="pit-scouting/capabilities-page-two"
        element={<PitScoutingCapabilitiesPageTwo />}
      />
      <Route
        path="pit-scouting/photo"
        element={<PitScoutingPhotoPage />}
      />
      <Route
        path="settings/match-scouting"
        element={
          <SettingsScoutingTemplate
            title="Match Scouting"
            localStorageKey="scoutingData"
          />
        }
      />
      <Route
        path="settings/pit-scouting"
        element={
          <SettingsScoutingTemplate
            title="Pit Scouting"
            localStorageKey="pitScoutingData"
          />
        }
      />
      <Route
        path="settings/view-data"
        element={<SettingsViewDataPage />}
      />
    </Route>
  ));

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return <RouterProvider router={router} />;
}

export default App;
