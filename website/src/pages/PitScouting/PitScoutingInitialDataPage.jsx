import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";

const PitScoutingInitialDataPage = () => {
  const location = useLocation();
  const pitScouting = location.state?.pitScouting || {};
  const hasNavPitState = Object.keys(pitScouting).length > 0;

  const [storedPitScoutingByTeam, setStoredPitScoutingByTeam] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pitScoutingData");
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      const data = Array.isArray(parsed?.data)
        ? parsed.data
        : Array.isArray(parsed)
          ? parsed
          : [];
      const byTeam = {};
      data.forEach((entry) => {
        if (!entry) {
          return;
        }
        const team = entry.teamNumber;
        if (team !== null && team !== undefined && team !== "") {
          byTeam[String(team)] = entry;
        }
      });
      setStoredPitScoutingByTeam(byTeam);
    } catch (error) {
      console.error("Failed to load pitScoutingData from localStorage", error);
    }
  }, []);

  const [scouterInitials, setScouterInitials] = useState(
    pitScouting.scouterInitials ?? "",
  );
  const [teamNumber, setTeamNumber] = useState(pitScouting.teamNumber ?? "");

  useEffect(() => {
    if (!teamNumber || hasNavPitState) {
      return;
    }
    const existing = storedPitScoutingByTeam[teamNumber];
    if (existing && existing.scouterInitials !== undefined) {
      setScouterInitials(existing.scouterInitials ?? "");
    }
  }, [teamNumber, hasNavPitState, storedPitScoutingByTeam]);

  const basePitScouting =
    !hasNavPitState && teamNumber && storedPitScoutingByTeam[teamNumber]
      ? storedPitScoutingByTeam[teamNumber]
      : pitScouting;

  const pitScoutingState = {
    ...basePitScouting,
    scouterInitials,
    teamNumber,
  };

  const teamOptions = [
    "111",
    "222",
    "333",
    "444",
    "555",
    "666",
    "777",
    "888",
    "999",
    "123",
    "456",
    "789",
    "321",
    "654",
    "987",
  ];

  const dropdownOptions = teamOptions.map((team) => {
    const existing = storedPitScoutingByTeam[team];
    if (existing) {
      const hasPhoto = !!existing.imageSrc;
      const statusText = hasPhoto ? "✅ Already Scouted" : "🟨 Needs Photo";
      return { value: team, label: `${team} (${statusText})` };
    }
    return { value: team, label: team };
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PitScoutingTemplate
        title="Pit Scouting Initial Data Page"
        components={[
          <Dropdown
            question="Team Number"
            options={dropdownOptions}
            defaultValue={teamNumber}
            setSelectedValue={setTeamNumber}
          />,
          <TextInput
            question="Scouter Initials"
            setTextValue={setScouterInitials}
            defaultText={scouterInitials}
          />,
        ]}
        backPage=""
        nextPage="pit-scouting/capabilities-page-one"
        pitScoutingState={pitScoutingState}
      />
    </div>
  );
};

export default PitScoutingInitialDataPage;
