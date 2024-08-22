import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout"

import InitialPage from "./pages/InitialPage";
import InitialAutoPage from "./pages/InitialAutoPage";
import AutoNoteCounter from "./pages/AutoNoteCounter";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<InitialPage />} />
        <Route path="/initial-auto" element={<InitialAutoPage />} />
        <Route path="/auto-note-counter" element={<AutoNoteCounter />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
