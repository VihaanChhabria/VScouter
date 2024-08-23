import React from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  // const [__, set__] = useState(states?.inputs?.__ || null);

  return (
    <>
      <h1>AutoScoringPage</h1>

      <ProceedBackButton
        nextPage={`/teleop-scoring`}
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
      <ProceedBackButton
        back={true}
        nextPage="/auto-start"
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
    </>
  );
};

export default AutoScoringPage;
