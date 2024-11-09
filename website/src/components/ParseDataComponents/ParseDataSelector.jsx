import React, { useState } from "react";

const ParseDataSelector = () => {
  const buttonStyle = {
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
  };
  const textStyle = {
    color: "#FFFFFF",
    fontSize: "4.293dvh",
    fontWeight: "bold",
    textAlign: "center",
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    for (let itemNum = 0; itemNum < event.target.files.length; itemNum++) {
      const file = event.target.files.item(itemNum);
      const getText = async () => {
        const text = await file.text();
        setSelectedFiles((filesList) => [
          ...filesList,
          { name: file.name, text: text },
        ]);
      };
      getText();
    }
  };

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
      <input
        type="file"
        id="selectFiles"
        multiple
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
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
        <div
          style={buttonStyle}
          onClick={() => document.getElementById("selectFiles").click()}
        >
          <h1 style={textStyle}>Select Files</h1>
        </div>
        <div
          style={{
            width: "22dvw",
            height: "100%",
            backgroundColor: "#929292",
            border: "1.3dvh solid #2B2B2B",
            borderRadius: "2.683dvh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1.3dvh solid #2B2B2B",
                  }}
                >
                  <h1 style={{ fontSize: "2.5dvh", marginLeft: "0.64dvw" }}>
                    {file.name}
                  </h1>
                  <h1
                    style={{
                      fontSize: "3.5dvh",
                      marginRight: "2dvw",
                      color: "red",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      setSelectedFiles(
                        selectedFiles.filter((file, i) => i !== index)
                      );
                    }}
                  >
                    x
                  </h1>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={buttonStyle} onClick={convertJSONToCSV}>
          <h1 style={textStyle}>Compile And Download</h1>
        </div>
      </div>
    </>
  );
};

export default ParseDataSelector;
