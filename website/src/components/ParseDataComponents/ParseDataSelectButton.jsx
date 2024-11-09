import React from "react";

const ParseDataSelectButton = ({ selectedFiles, setSelectedFiles }) => {
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
        onClick={() => document.getElementById("selectFiles").click()}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "4.293dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Select Files
        </h1>
      </div>
    </>
  );
};

export default ParseDataSelectButton;
