import React from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";

const TeleopScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  // const [__, set__] = useState(states?.inputs?.__ || null);

  return (
    <>
      <h1>TeleopScoringPage</h1>

      <ProceedBackButton
        nextPage={`/endgame-scoring`}
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
      <ProceedBackButton
        back={true}
        nextPage="/auto-scoring"
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
    </>
  );
};

export default TeleopScoringPage;
