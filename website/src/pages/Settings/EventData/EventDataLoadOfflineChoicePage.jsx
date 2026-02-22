import React from "react";
import ProceedBackButton from "../../../components/ProceedBackButton";
import EventDataPageTemplate from "../../../components/Settings/EventDataPageTemplate";

const EventDataLoadOfflineChoicePage = () => (
  <EventDataPageTemplate
    backTo="match-data/load"
    title="Load Offline"
    question="Will you be loading using QRFs or through a file?"
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
        nextPage="match-data/load/offline/qrf"
        message="QRFs"
      />
      <ProceedBackButton
        nextPage="match-data/load/offline/file"
        message="File"
      />
    </div>
  </EventDataPageTemplate>
);

export default EventDataLoadOfflineChoicePage;
