import React from "react";
import ProceedBackButton from "../../../components/ProceedBackButton";
import EventDataPageTemplate from "../../../components/Settings/EventDataPageTemplate";

const EventDataSettingsPage = () => (
  <EventDataPageTemplate
    backTo="settings"
    title="Event Data Settings"
    question="Would you like to load event data settings, or generate them to be loaded on another device offline?"
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "4%",
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
    >
      <ProceedBackButton nextPage="event-data/load" message="Load" />
      <ProceedBackButton nextPage="event-data/generate" message="Generate" />
    </div>
  </EventDataPageTemplate>
);

export default EventDataSettingsPage;
