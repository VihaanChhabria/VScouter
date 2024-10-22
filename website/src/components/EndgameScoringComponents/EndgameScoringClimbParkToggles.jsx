import React, { useEffect } from "react";
import ToggleButton from "../ToggleButton";

/**
 * A component consisting of toggles for endgame scoring climb and park states.
 *
 * It also ensures that the states are mutually exclusive.
 *
 * @param {object} states - An object containing the current climb and park states.
 * @param {object} setStates - An object containing the functions to update the climb and park states.
 * @return {JSX.Element} The rendered component.
 */
const EndgameScoringClimbParkToggles = ({states, setStates}) => {
  useEffect(() => {
    if (states.climbed) {
      setStates.setClimbFailed(false);
      setStates.setParked(false);
      setStates.setParkFailed(false);
    } else if (states.parked) {
      setStates.setParkFailed(false);
      setStates.setClimbed(false);
    } else if (states.parkFailed) {
      setStates.setParked(false);
      setStates.setClimbed(false);
    } else if (states.climbFailed) {
      setStates.setClimbed(false);
    }
  }, [states.parked,states. parkFailed, states.climbed, states.climbFailed]);

  return (
    <>
      <ToggleButton
        coordX={2.04}
        coordY={5.35}
        width={24.03}
        height={24.65}
        question="Parked"
        state={states.parked}
        setState={setStates.setParked}
      />
      <ToggleButton
        coordX={2.04}
        coordY={33.72}
        width={24.03}
        height={24.65}
        question="Park Failed"
        state={states.parkFailed}
        setState={setStates.setParkFailed}
      />

      <ToggleButton
        coordX={28.33}
        coordY={5.35}
        width={24.03}
        height={24.65}
        question="Climbed"
        state={states.climbed}
        setState={setStates.setClimbed}
      />
      <ToggleButton
        coordX={28.33}
        coordY={33.72}
        width={24.03}
        height={24.65}
        question="Climb Failed"
        state={states.climbFailed}
        setState={setStates.setClimbFailed}
      />
    </>
  );
};

export default EndgameScoringClimbParkToggles;
