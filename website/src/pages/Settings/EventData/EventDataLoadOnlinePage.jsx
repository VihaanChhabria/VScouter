import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigateWithBase } from "../../../utils/useNavigateWithBase";
import EventDataPageTemplate from "../../../components/Settings/EventDataPageTemplate";

const TBA_API_KEY = import.meta.env.VITE_TBA_API_KEY;
const TBA_BASE = "https://www.thebluealliance.com/api/v3";

const eventOptionLabel = (event) => `${event.name} (${event.key})`;

const EventDataLoadOnlinePage = () => {
  const navigate = useNavigateWithBase();
  const currentYear = new Date().getFullYear();

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setEventsLoading(true);
      setEventsError(null);
      try {
        const res = await fetch(`${TBA_BASE}/events/${currentYear}/simple`, {
          headers: { "X-TBA-Auth-Key": TBA_API_KEY },
        });
        if (!res.ok) throw new Error("Failed to load events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setEventsError(err.message || "Failed to load events");
        toast.error("Could not load events");
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, [currentYear]);

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.trim().toLowerCase();
    return events.filter(
      (e) =>
        e.name.toLowerCase().includes(q) || e.key.toLowerCase().includes(q),
    );
  }, [events, searchQuery]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSearchQuery(eventOptionLabel(event));
    setDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedEvent(null);
    setDropdownOpen(true);
  };

  const handleInputFocus = () => setDropdownOpen(true);
  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 150);
  };

  const doneClick = async () => {
    if (!selectedEvent) {
      toast.error("Please select an event");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `${TBA_BASE}/event/${selectedEvent.key}/matches/simple`,
        { headers: { "X-TBA-Auth-Key": TBA_API_KEY } },
      );
      if (!res.ok) throw new Error("Failed to fetch match data");
      const fullData = await res.json();

      const qualMatchesCleaned = [];

      for (const match of fullData) {
        if (match.comp_level === "qm") {
          qualMatchesCleaned.push({
            matchNum: match.match_number,
            redAlliance: match.alliances.red.team_keys.map((team) =>
              team.replace("frc", ""),
            ),
            blueAlliance: match.alliances.blue.team_keys.map((team) =>
              team.replace("frc", ""),
            ),
          });
        }
      }

      qualMatchesCleaned.sort((a, b) => a.matchNum - b.matchNum);
      localStorage.setItem("matchData", JSON.stringify(qualMatchesCleaned));

      toast.success(
        "Match Data Fetched: " +
          JSON.parse(localStorage.getItem("matchData"))[0].redAlliance[0],
      );

      navigate("/");
    } catch (err) {
      toast.error("Invalid Data");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EventDataPageTemplate
      backTo="event-data/load"
      title="Load Event Data Online"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "88dvw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4dvh",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1.3dvh solid #1D1E1E",
            backgroundColor: "#242424",
            borderRadius: "3.49dvh",
            padding: "2dvh 2dvw",
            position: "relative",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "4dvh",
              fontWeight: "bold",
              marginBottom: "1.5dvh",
            }}
          >
            Select event
          </h1>
          {eventsLoading ? (
            <p style={{ color: "#AAAAAA", fontSize: "3.5dvh" }}>
              Loading events…
            </p>
          ) : eventsError ? (
            <p style={{ color: "#e74c3c", fontSize: "3.5dvh" }}>
              {eventsError}
            </p>
          ) : (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Search by name or event key…"
                style={{
                  border: "0.93dvh solid #1D1E1E",
                  borderRadius: "2.33dvh",
                  backgroundColor: "#4A4A4A",
                  color: "#FFFFFF",
                  width: "100%",
                  boxSizing: "border-box",
                  height: "8.88dvh",
                  fontSize: "4dvh",
                  paddingLeft: "2dvw",
                  paddingRight: "2dvw",
                }}
              />
              {dropdownOpen && filteredEvents.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: "2dvw",
                    right: "2dvw",
                    top: "100%",
                    marginTop: "0.5dvh",
                    maxHeight: "40dvh",
                    overflowY: "auto",
                    backgroundColor: "#242424",
                    border: "1.3dvh solid #1D1E1E",
                    borderRadius: "2.33dvh",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  {filteredEvents.map((event) => (
                    <div
                      key={event.key}
                      onClick={() => handleSelectEvent(event)}
                      style={{
                        padding: "2dvh 2dvw",
                        color: "#FFFFFF",
                        fontSize: "3.8dvh",
                        cursor: "pointer",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      {eventOptionLabel(event)}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "40dvw",
            height: "12dvh",
            backgroundColor: "#242424",
            border: "1.63dvh solid #1D1E1E",
            borderRadius: "3.49dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
          onClick={submitting ? undefined : doneClick}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
            }}
          >
            {submitting ? "Loading…" : "Submit"}
          </h1>
        </div>
      </div>
    </EventDataPageTemplate>
  );
};

export default EventDataLoadOnlinePage;
