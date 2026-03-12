import React, { useState, useEffect, useCallback, useMemo } from "react";
import EventDataPageTemplate from "../../components/Settings/EventDataPageTemplate";
import { EVENT_DATA_KEYS } from "./EventData/EventDataLoadOnlinePage";

const ASSIGNED_TEAMS_KEY = "pitScoutingAssignedTeams";

const loadAssignedTeams = () => {
  try {
    const raw = localStorage.getItem(ASSIGNED_TEAMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

const saveAssignedTeams = (teams) => {
  localStorage.setItem(ASSIGNED_TEAMS_KEY, JSON.stringify(teams));
};

const loadEventData = () => {
  try {
    const eventKey = localStorage.getItem(EVENT_DATA_KEYS.EVENT_KEY);
    const pitMapRaw = localStorage.getItem(EVENT_DATA_KEYS.PIT_MAP);
    const pitMapAvailableRaw = localStorage.getItem(
      EVENT_DATA_KEYS.PIT_MAP_AVAILABLE,
    );
    const teamsRaw = localStorage.getItem(EVENT_DATA_KEYS.TEAMS_LIST);

    const pitMap =
      pitMapRaw && pitMapRaw !== "null" ? JSON.parse(pitMapRaw) : null;
    const pitMapAvailable =
      pitMapAvailableRaw === "true" || pitMapAvailableRaw === true;
    const teamsList = teamsRaw
      ? (() => {
          try {
            const arr = JSON.parse(teamsRaw);
            return Array.isArray(arr) ? arr.map(String) : [];
          } catch {
            return [];
          }
        })()
      : [];

    return {
      eventKey,
      pitMap: pitMapAvailable ? pitMap : null,
      teamsList,
      hasMap: pitMapAvailable && pitMap,
      hasTeamsList: Array.isArray(teamsList) && teamsList.length > 0,
    };
  } catch {
    return {
      eventKey: null,
      pitMap: null,
      teamsList: [],
      hasMap: false,
      hasTeamsList: false,
    };
  }
};

const PitScoutingSettingsAssignTeamPage = () => {
  const [eventData, setEventData] = useState(loadEventData);
  const [assignedTeams, setAssignedTeams] = useState(loadAssignedTeams);
  const [useMapView, setUseMapView] = useState(true);

  useEffect(() => {
    setEventData(loadEventData());
  }, []);

  const { pitMap: mapData, teamsList, hasMap, hasTeamsList } = eventData;

  const canToggle = hasMap && hasTeamsList;
  const showMap = hasMap && (useMapView || !hasTeamsList);
  const showTeamList = hasTeamsList && (!useMapView || !hasMap);

  const toggleTeam = useCallback((teamNumber) => {
    if (!teamNumber) return;
    const team = String(teamNumber);
    setAssignedTeams((prev) => {
      const next = prev.includes(team)
        ? prev.filter((t) => t !== team)
        : [...prev, team].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      saveAssignedTeams(next);
      return next;
    });
  }, []);

  if (!hasMap && !hasTeamsList) {
    return (
      <EventDataPageTemplate
        backTo={"settings/pit-scouting"}
        title={"Assign Pit Scouting Teams"}
      >
        <p style={{ color: "#e74c3c", fontSize: "3.5dvh" }}>
          No pit map or team list available. Load event data online first from
          Settings → Event Data → Load Online.
        </p>
      </EventDataPageTemplate>
    );
  }

  const sortedTeamsList = useMemo(
    () =>
      [...(teamsList || [])].sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
    [teamsList],
  );

  return (
    <EventDataPageTemplate
      backTo={"settings/pit-scouting"}
      title={"Assign Pit Scouting Teams"}
    >
      <div
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: "2dvh",
        }}
      >
        {canToggle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2dvw",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#FFFFFF", fontSize: "3.5dvh" }}>
              Assign from:
            </span>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1dvw",
                cursor: "pointer",
                color: "#FFFFFF",
                fontSize: "3.5dvh",
              }}
            >
              <input
                type="radio"
                name="assignSource"
                checked={useMapView}
                onChange={() => setUseMapView(true)}
              />
              Pit map
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1dvw",
                cursor: "pointer",
                color: "#FFFFFF",
                fontSize: "3.5dvh",
              }}
            >
              <input
                type="radio"
                name="assignSource"
                checked={!useMapView}
                onChange={() => setUseMapView(false)}
              />
              Team list
            </label>
          </div>
        )}

        <div
          style={{
            width: "100%",
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "row",
            gap: "2dvw",
          }}
        >
          {/* Left: pit map or team list — 50% width */}
          <div
            style={{
              width: "50%",
              height: "100%",
              border: "1.3dvh solid #1D1E1E",
              borderRadius: "3.49dvh",
              backgroundColor: "#1a1a1a",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {showMap && mapData ? (
                <PitMapView
                  mapData={mapData}
                  assignedTeams={assignedTeams}
                  toggleTeam={toggleTeam}
                />
              ) : showTeamList && sortedTeamsList.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                    padding: "2dvh 2dvw",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1dvh 2dvw",
                    alignContent: "flex-start",
                  }}
                >
                  {sortedTeamsList.map((team) => {
                    const isAssigned = assignedTeams.includes(String(team));
                    return (
                      <label
                        key={team}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1dvw",
                          padding: "1dvh 1.5dvw",
                          backgroundColor: isAssigned ? "#507144" : "#3a3a3a",
                          borderRadius: "2.33dvh",
                          cursor: "pointer",
                          color: isAssigned ? "#fff" : "#ccc",
                          fontSize: "3.5dvh",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isAssigned}
                          onChange={() => toggleTeam(team)}
                        />
                        {team}
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: assigned teams — 50% width */}
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              border: "1.3dvh solid #1D1E1E",
              backgroundColor: "#242424",
              borderRadius: "3.49dvh",
              padding: "2dvh 2dvw",
              overflow: "auto",
            }}
          >
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "4dvh",
                fontWeight: "bold",
                marginBottom: "1.5dvh",
                flexShrink: 0,
              }}
            >
              Assigned teams ({assignedTeams.length})
            </h2>
            {assignedTeams.length === 0 ? (
              <p style={{ color: "#888", fontSize: "3dvh" }}>
                {showMap
                  ? "Tap pits on the map to assign teams."
                  : "Check teams in the list to assign."}
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1dvh 2dvw",
                }}
              >
                {assignedTeams.map((team) => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => toggleTeam(team)}
                    style={{
                      padding: "1dvh 2dvw",
                      backgroundColor: "#507144",
                      color: "#fff",
                      border: "none",
                      borderRadius: "2.33dvh",
                      fontSize: "3.5dvh",
                      cursor: "pointer",
                    }}
                  >
                    {team} ×
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </EventDataPageTemplate>
  );
};

const PitMapView = ({ mapData, assignedTeams, toggleTeam }) => {
  const {
    areas = {},
    arrows = {},
    labels = {},
    pits = {},
    walls = {},
    size,
  } = mapData;
  const width = size?.x ?? 1200;
  const height = size?.y ?? 913;
  const padding = 60;
  const viewWidth = width + 2 * padding;
  const viewHeight = height + 2 * padding;
  const isTall = height > width;

  return (
    <div
      style={
        isTall
          ? {
              width: "100%",
              aspectRatio: `${viewWidth} / ${viewHeight}`,
            }
          : {
              height: "100%",
              aspectRatio: `${viewWidth} / ${viewHeight}`,
            }
      }
    >
      <svg
        viewBox={`${-padding} 0 ${viewWidth} ${viewHeight}`}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        {/* Walls */}
        {Object.entries(walls).map(([id, w]) => (
          <rect
            key={`wall-${id}`}
            x={w.position?.x - w.size?.x / 2 ?? 0}
            y={w.position?.y + w.size?.y / 2 ?? 0}
            width={w.size?.x ?? 0}
            height={w.size?.y ?? 0}
            fill="#555"
            stroke="#333"
          />
        ))}

        {/* Labels */}
        {Object.entries(labels).map(([id, l]) => (
          <g key={`label-${id}`}>
            <rect
              x={l.position?.x ?? 0}
              y={l.position?.y ?? 0}
              width={l.size?.x ?? 0}
              height={l.size?.y ?? 0}
              fill="transparent"
            />
            <text
              x={(l.position?.x ?? 0) + (l.size?.x ?? 0) / 2}
              y={(l.position?.y ?? 0) + (l.size?.y ?? 0) / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#999"
              fontSize={20}
            >
              {l.label}
            </text>
          </g>
        ))}

        {/* Arrows */}
        {Object.entries(arrows).map(([id, ar]) => {
          const px = ar.position?.x ?? 0;
          const py = ar.position?.y ?? 0;
          const sx = ar.size?.x ?? 46;
          const sy = ar.size?.y ?? 86;
          const angle = ar.angle - 90 ?? 0;
          const cx = px + sx / 2;
          const cy = py + sy / 2;
          const head = Math.min(sx, sy) * 0.4;
          const wingSpan = sy * 0.3;
          const wingTop = sy / 2 - wingSpan / 2;
          const wingBot = sy / 2 + wingSpan / 2;
          const path = `M 0 ${sy / 2} L ${sx - head} ${sy / 2} L ${sx - head} ${wingTop} L ${sx} ${sy / 2} L ${sx - head} ${wingBot} L ${sx - head} ${sy / 2} Z`;
          return (
            <g
              key={`arrow-${id}`}
              transform={`translate(${cx}, ${cy}) rotate(${angle}) translate(${-sx / 2}, ${-sy / 2})`}
            >
              <path d={path} fill="#666" stroke="#888" strokeWidth={1} />
            </g>
          );
        })}

        {/* Pits */}
        {Object.entries(pits).map(([pitId, pit]) => {
          const team = pit.team;
          const isAssigned = team && assignedTeams.includes(String(team));
          const hasTeam = !!team;
          const px = pit.position?.x ?? 0;
          const py = pit.position?.y ?? 0;
          const sx = pit.size?.x ?? 0;
          const sy = pit.size?.y ?? 0;
          return (
            <g
              key={`pit-${pitId}`}
              style={{ cursor: hasTeam ? "pointer" : "default" }}
              onClick={() => hasTeam && toggleTeam(team)}
            >
              <rect
                x={px}
                y={py}
                width={sx}
                height={sy}
                fill={isAssigned ? "#507144" : hasTeam ? "#3a3a3a" : "#2a2a2a"}
                stroke={isAssigned ? "#507144" : "#555"}
                strokeWidth={hasTeam ? 2 : 1}
              />
              {team && (
                <text
                  x={px + sx / 2}
                  y={py + sy / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isAssigned ? "#fff" : "#ccc"}
                  fontSize={sx / 4}
                  fontWeight={isAssigned ? "bold" : "normal"}
                >
                  {team}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PitScoutingSettingsAssignTeamPage;
