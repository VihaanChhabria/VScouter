import React from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";

const HomePage = () => {
  const location = useLocation();
  const states = location.state;

  // const [__, set__] = useState(states?.inputs?.__ || null);

  return (
    <>
      <h1>HomePage</h1>

      <ProceedBackButton
        nextPage={`/game-start`}
        inputs={{
          ...(states?.inputs || {}),
          // __: __,
        }}
      />
    </>
  );
};

export default HomePage;
