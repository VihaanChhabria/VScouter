import React from "react";
import ProceedBackButton from "../../../components/ProceedBackButton";
import EventDataPageTemplate from "../../../components/Settings/EventDataPageTemplate";

const EventDataLoadChoicePage = () => (
  <EventDataPageTemplate
    backTo="event-data"
    title="Load Event Data"
    question="Do you want to load the data as Online or Offline?"
  >
    <div
      style={{
        width: "100%",
        height: "40%",
        display: "flex",
        gap: "4%",
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
    >
      <ProceedBackButton
        nextPage="event-data/load/online"
        message="Online"
      />
      <ProceedBackButton
        nextPage="event-data/load/offline"
        message="Offline"
      />
    </div>
  </EventDataPageTemplate>
);

export default EventDataLoadChoicePage;
