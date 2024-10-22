import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import AutoScoringMap from "../components/AutoScoringComponents/AutoScoringMap";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [closeRing1, setCloseRing1] = useState(
    states?.inputs?.autoRingStatuses?.closeRing1 || "Not Picked"
  );
  const [closeRing2, setCloseRing2] = useState(
    states?.inputs?.autoRingStatuses?.closeRing2 || "Not Picked"
  );
  const [closeRing3, setCloseRing3] = useState(
    states?.inputs?.autoRingStatuses?.closeRing3 || "Not Picked"
  );

  const [farRing1, setFarRing1] = useState(
    states?.inputs?.autoRingStatuses?.farRing1 || "Not Picked"
  );
  const [farRing2, setFarRing2] = useState(
    states?.inputs?.autoRingStatuses?.farRing2 || "Not Picked"
  );
  const [farRing3, setFarRing3] = useState(
    states?.inputs?.autoRingStatuses?.farRing3 || "Not Picked"
  );
  const [farRing4, setFarRing4] = useState(
    states?.inputs?.autoRingStatuses?.farRing4 || "Not Picked"
  );
  const [farRing5, setFarRing5] = useState(
    states?.inputs?.autoRingStatuses?.farRing5 || "Not Picked"
  );

  return (
    <>
      <AutoScoringMap
        alliance={states?.inputs?.alliance || "blue"}
        ringStatuses={{
          closeRing1,
          closeRing2,
          closeRing3,
          farRing1,
          farRing2,
          farRing3,
          farRing4,
          farRing5,
        }}
        setRingStatuses={{
          setCloseRing1,
          setCloseRing2,
          setCloseRing3,
          setFarRing1,
          setFarRing2,
          setFarRing3,
          setFarRing4,
          setFarRing5,
        }}
      />

      <ProceedBackButton
        nextPage={`/teleop-scoring`}
        inputs={{
          ...(states?.inputs || {}),
          autoRingStatuses: {
            closeRing1,
            closeRing2,
            closeRing3,
            farRing1,
            farRing2,
            farRing3,
            farRing4,
            farRing5,
          },
        }}
      />
      <ProceedBackButton
        back={true}
        coordX={24.5}
        nextPage="/auto-start"
        inputs={{
          ...(states?.inputs || {}),
          autoRingStatuses: {
            closeRing1,
            closeRing2,
            closeRing3,
            farRing1,
            farRing2,
            farRing3,
            farRing4,
            farRing5,
          },
        }}
      />
    </>
  );
};

export default AutoScoringPage;
