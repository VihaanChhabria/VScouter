import React from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";

const EndgameScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  // const [__, set__] = useState(states?.inputs?.__ || null);

  return (
    <>
    <h1>EndgameScoringPage</h1>

      <ProceedBackButton
        nextPage={`/`}
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
      <ProceedBackButton
        back={true}
        nextPage="/teleop-scoring"
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
    </>
  );
};

export default EndgameScoringPage;
