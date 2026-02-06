import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringPage from "../components/ScoringComponents/ScoringPage";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  return (
    <ScoringPage
      statePath={states?.inputs?.auto || null}
      nextPage="teleop-scoring"
      pastPage="game-start"
    />
  );
};

export default AutoScoringPage;
