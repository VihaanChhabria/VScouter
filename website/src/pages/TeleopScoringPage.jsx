import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import TeleopScoringMap from "../components/TeleopScoringComponents/TeleopScoringMap";

/**
 * Renders a component representing the Teleop Scoring Page.
 *
 * To be used when the teleop period starts, collecting information about the number of rings each robot made and missed in the amp, speaker and when feeding.
 *
 * @return {JSX.Element} The component representing the Teleop Scoring Page.
 */
const TeleopScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  /**
   * Initialize state with the passed in state from the previous page, or null if no state was passed in
   */
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
    states?.inputs?.teleopRingCounts?.fedMissedCount || 0
  );

  return (
    <>
      {/* Render the TeleopScoringMap component to show the map and the counters */}
      <TeleopScoringMap
        alliance={states?.inputs?.alliance || "blue"}
        counts={[
          [ampMadeCount, ampMissedCount],
          [speakerMadeCount, speakerMissedCount],
          [fedMadeCount, fedMissedCount],
        ]}
        setCounts={[
          [setAmpMadeCount, setAmpMissedCount],
          [setSpeakerMadeCount, setSpeakerMissedCount],
          [setFedMadeCount, setFedMissedCount],
        ]}
      />

      {/* Render the ProceedBackButton to navigate to the next page and pass in the selected data as props */}
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

      {/* Button to go back to the previous page and pass in the selected data as props*/}
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
