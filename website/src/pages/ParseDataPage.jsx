import React from "react";
import ParseDataSelector from "../components/ParseDataComponents/ParseDataSelector";
import ProceedBackButton from "../components/ProceedBackButton";

const ParseDataPage = () => {
  return (
    <>
      <div
        style={{
          marginTop: "2.5dvh",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          width: "100dvw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "9dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Parse Data
        </h1>
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "4dvh",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "1dvh",
          }}
        >
          Plug the flash drives into the computer and upload the files here.
        </h1>
      </div>

      <ParseDataSelector />

      <div style={{ width: "15%", height: "15%" }}>
        <ProceedBackButton nextPage={`settings`} back={true} />
      </div>
    </>
  );
};

export default ParseDataPage;
