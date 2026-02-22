import React from "react";
import ProceedBackButton from "../../../components/ProceedBackButton";
import EventDataPageTemplate from "../../../components/Settings/EventDataPageTemplate";

const EventDataGenerateChoicePage = () => (
  <EventDataPageTemplate
    backTo="match-data"
    title="Generate Event Data"
    question="Are you generating QRFs or a file?"
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
        nextPage="match-data/generate/qrf"
        message="QRFs"
      />
      <ProceedBackButton
        nextPage="match-data/generate/file"
        message="File"
      />
    </div>
  </EventDataPageTemplate>
);

export default EventDataGenerateChoicePage;
