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
import EventDataSettingsPage from "./pages/Settings/EventData/EventDataSettingsPage";
import EventDataLoadChoicePage from "./pages/Settings/EventData/EventDataLoadChoicePage";
import EventDataLoadOfflineChoicePage from "./pages/Settings/EventData/EventDataLoadOfflineChoicePage";
import EventDataLoadOnlinePage from "./pages/Settings/EventData/EventDataLoadOnlinePage";
import EventDataLoadQRFPage from "./pages/Settings/EventData/EventDataLoadQRFPage";
import EventDataLoadFilePage from "./pages/Settings/EventData/EventDataLoadFilePage";
import EventDataGenerateChoicePage from "./pages/Settings/EventData/EventDataGenerateChoicePage";
import EventDataGenerateQRFPage from "./pages/Settings/EventData/EventDataGenerateQRFPage";
import EventDataGenerateFilePage from "./pages/Settings/EventData/EventDataGenerateFilePage";
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
      <Route path="event-data" element={<EventDataSettingsPage />} />
      <Route path="event-data/load" element={<EventDataLoadChoicePage />} />
      <Route path="event-data/load/online" element={<EventDataLoadOnlinePage />} />
      <Route path="event-data/load/offline" element={<EventDataLoadOfflineChoicePage />} />
      <Route path="event-data/load/offline/qrf" element={<EventDataLoadQRFPage />} />
      <Route path="event-data/load/offline/file" element={<EventDataLoadFilePage />} />
      <Route path="event-data/generate" element={<EventDataGenerateChoicePage />} />
      <Route path="event-data/generate/qrf" element={<EventDataGenerateQRFPage />} />
      <Route path="event-data/generate/file" element={<EventDataGenerateFilePage />} />
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
