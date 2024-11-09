import React, { useState } from "react";
import ParseDataSelectButton from "./ParseDataSelectButton";
import ParseDataCompileButton from "./ParseDataCompileButton";
import ParseDataSelectedViewer from "./ParseDataSelectedViewer";

const ParseDataSelector = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "5%",
          width: "65dvw",
          height: "65dvh",
          transform: "translate(-50%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ParseDataSelectButton
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
        <ParseDataSelectedViewer
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
        
        <ParseDataCompileButton
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
        
      </div>
    </>
  );
};

export default ParseDataSelector;
