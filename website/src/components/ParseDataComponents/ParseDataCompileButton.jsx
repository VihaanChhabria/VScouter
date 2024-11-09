import React from "react";

const ParseDataCompileButton = ({ selectedFiles, setSelectedFiles }) => {
  const convertJSONToCSV = () => {
    let fullCSV = [[]];
    const data = selectedFiles.map((fullData) => fullData.text);

    for (const [key, value] of Object.entries(JSON.parse(data[0])["data"][0])) {
      if (
        typeof value !== "string" &&
        typeof value !== "boolean" &&
        typeof value !== "number"
      ) {
        for (
          let subValueIndex = 0;
          subValueIndex < value.length;
          subValueIndex++
        ) {
          const subKey = value[subValueIndex];
          console.log(subKey);
          fullCSV[0].push(subKey);
        }
      } else {
        fullCSV[0].push(key);
      }
    }

    for (let fileIndex = 0; fileIndex < data.length; fileIndex++) {
      const file = JSON.parse(data[fileIndex])["data"];
      for (let matchIndex = 0; matchIndex < file.length; matchIndex++) {
        const match = file[matchIndex];
        fullCSV.push([]);
        for (const [key, value] of Object.entries(match)) {
          if (
            typeof value !== "string" &&
            typeof value !== "boolean" &&
            typeof value !== "number"
          ) {
            for (
              let subValueIndex = 0;
              subValueIndex < value.length;
              subValueIndex++
            ) {
              const subValue = value[subValueIndex];
              fullCSV[matchIndex + 1].push(subValue);
            }
          } else {
            if (key == "comment") {
              fullCSV[matchIndex + 1].push(`"${value.replaceAll('"', "'")}"`);
            } else {
              fullCSV[matchIndex + 1].push(value);
            }
          }
        }
      }
    }
    const csvContent = fullCSV.map((row) => row.join(",")).join("\n");
    downloadCSV(csvContent);
  };

  const downloadCSV = (data) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(data)
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
