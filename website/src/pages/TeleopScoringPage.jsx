import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import TeleopScoringMap from "../components/TeleopScoringComponents/TeleopScoringMap";

const TeleopScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [ampMadeCount, setAmpMadeCount] = useState(
    states?.inputs?.teleopRingCounts?.ampMadeCount || 0
  );
  const [ampMissedCount, setAmpMissedCount] = useState(
    states?.inputs?.teleopRingCounts?.ampMissedCount || 0
  );

  const [speakerMadeCount, setSpeakerMadeCount] = useState(
    states?.inputs?.teleopRingCounts?.speakerMadeCount || 0
  );
  const [speakerMissedCount, setSpeakerMissedCount] = useState(
    states?.inputs?.teleopRingCounts?.speakerMissedCount || 0
  );

  const [fedMadeCount, setFedMadeCount] = useState(
    states?.inputs?.teleopRingCounts?.fedMadeCount || 0
  );
  const [fedMissedCount, setFedMissedCount] = useState(
    states?.inputs?.fteleopRingCounts?.edMissedCount || 0
  );

  return (
    <>
      <TeleopScoringMap
        alliance={states?.inputs?.alliance || "blue"}
        counts={{
          ampMadeCount,
          ampMissedCount,
          speakerMadeCount,
          speakerMissedCount,
          fedMadeCount,
          fedMissedCount,
        }}
        setCounts={{
          setAmpMadeCount,
          setAmpMissedCount,
          setSpeakerMadeCount,
          setSpeakerMissedCount,
          setFedMadeCount,
          setFedMissedCount,
        }}
      />

      <ProceedBackButton
        nextPage={`/endgame-scoring`}
        inputs={{
          ...(states?.inputs || {}),
          teleopRingCounts: {
            ampMadeCount,
            ampMissedCount,
            speakerMadeCount,
            speakerMissedCount,
            fedMadeCount,
            fedMissedCount,
          },
        }}
      />
      <ProceedBackButton
        back={true}
        coordX={51.04}
        coordY={79.83}
        nextPage="/auto-scoring"
        inputs={{
          ...(states?.inputs || {}),
          teleopRingCounts: {
            ampMadeCount,
            ampMissedCount,
            speakerMadeCount,
            speakerMissedCount,
            fedMadeCount,
            fedMissedCount,
          },
        }}
      />
    </>
  );
};

export default TeleopScoringPage;
