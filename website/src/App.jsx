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

import { BluetoothDeviceProvider } from "./contexts/BluetoothDeviceContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <BluetoothDeviceProvider>
            <MainLayout />
          </BluetoothDeviceProvider>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/game-start" element={<GameStartPage />} />
        <Route path="/auto-start" element={<AutoStartPage />} />
        <Route path="/auto-scoring" element={<AutoScoringPage />} />
        <Route path="/teleop-scoring" element={<TeleopScoringPage />} />
        <Route path="/endgame-scoring" element={<EndgameScoringPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
