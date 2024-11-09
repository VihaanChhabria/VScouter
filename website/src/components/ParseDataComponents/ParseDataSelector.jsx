import React, { useState } from "react";
import ParseDataSelectButton from "./ParseDataSelectButton";
import ParseDataCompileButton from "./ParseDataCompileButton";
import ParseDataSelectedViewer from "./ParseDataSelectedViewer";

/**
 * ParseDataSelector is a component that is responsible for managing the state
 * of which files have been selected by the user. It renders a button that
 * allows the user to select files, a component that displays the names of the
 * selected files, and a button that compiles the selected JSON files into a CSV
 * format required by the analysis software.
 *
 * @return {ReactElement} The rendered component.
 */
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
        {/* Button for selecting files */}
        <ParseDataSelectButton
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />

        {/* Display of selected files */}
        <ParseDataSelectedViewer
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />

        {/* Button for compiling the selected files */}
        <ParseDataCompileButton
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      </div>
    </>
  );
};

export default ParseDataSelector;
