import React from "react";

/**
 * A component that compiles the selected JSON files into a CSV format required
 * by the analysis software and downloads it to the user's computer.
 *
 * @param {array} selectedFiles - The list of files that have been selected.
 * @param {function} setSelectedFiles - The function to set the list of selected files.
 * @return {ReactElement} The rendered component.
 */
const ParseDataCompileButton = ({ selectedFiles, setSelectedFiles }) => {
  /**
   * Converts the selected JSON files into a CSV format required by the
   * analysis software.
   */
  const convertJSONToCSV = () => {
    console.log(selectedFiles);
    
    const totalFilesData = selectedFiles.map((singleFile) =>
      JSON.parse(singleFile.text)
    );

    const fullCSV = [];
    fullCSV.push(totalFilesData[0][0]);
    for (let fileIndex = 0; fileIndex < totalFilesData.length; fileIndex++) {
      const fileData = totalFilesData[fileIndex];
      for (
        let dataRowIndex = 1;
        dataRowIndex < fileData.length;
        dataRowIndex++
      ) {
        const dataRow = fileData[dataRowIndex];
        fullCSV.push(dataRow);
      }
    }

    downloadCSV(
      fullCSV
        .map((row) =>
          row
            .map((item) =>
              typeof item === "string" ? `"${item.replace(/"/g, '""')}"` : item
            )
            .join(",")
        )
        .join("\n")
    );
  };

  /**
   * Downloads the CSV content to the user's computer.
   * @param {string} csvContent - The CSV content to download.
   * @return {void}
   */
  const downloadCSV = (csvContent) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
    );
    element.setAttribute(
      "download",
      `VScouterFullData-${new Date().toLocaleTimeString()}.csv`
    );

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <>
      {/* The button to compile and download the CSV */}
      <div
        style={{
          backgroundColor: "#242424",
          width: "20dvw",
          height: "20dvh",
          border: "1.3dvh solid #1D1E1E",
          borderRadius: "2.683dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        onClick={convertJSONToCSV}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "4.293dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Compile And Download
        </h1>
      </div>
    </>
  );
};

export default ParseDataCompileButton;
