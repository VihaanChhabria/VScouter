import React from "react";
import { toast } from "react-toastify";

const HomeDumpDataButton = () => {
  const isOneDimensional = (value) => {
    if (
      typeof value == "string" ||
      typeof value == "boolean" ||
      typeof value == "number"
    ) {
      return true;
    }
    return false;
  };

  const convertToCamelCase = (word1, word2) => {
    if (word1 == "") {
      return word2;
    }
    return word1 + (word2.charAt(0).toUpperCase() + word2.slice(1));
  };

  const addHeaders = (data, previousKey = "") => {
    let headers = [];
    for (const [key, value] of Object.entries(data)) {
      if (isOneDimensional(value)) {
        headers.push(convertToCamelCase(previousKey, key));
      } else if (Array.isArray(value)) {
        for (let arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
          if (isOneDimensional(value[arrayIndex])) {
            headers.push(convertToCamelCase(previousKey, key) + arrayIndex);
          } else {
            headers = [
              ...headers,
              ...addHeaders(value[arrayIndex], convertToCamelCase(key, subKey)),
            ];
          }
        }
      } else {
        // Dict
        for (const [subKey, subValue] of Object.entries(value)) {
          if (isOneDimensional(subValue)) {
            headers.push(convertToCamelCase(key, subKey)); // key + subKey = keySubKey
          } else {
            headers = [
              ...headers,
              ...addHeaders(subValue, convertToCamelCase(key, subKey)),
            ];
          }
        }
      }
    }
    return headers;
  };

  const addRow = (data) => {
    let row = [];
    for (const [key, value] of Object.entries(data)) {
      if (isOneDimensional(value)) {
        row.push(value);
      } else if (Array.isArray(value)) {
        for (let arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
          if (isOneDimensional(value[arrayIndex])) {
            row.push(value[arrayIndex]);
          } else {
            row = [
              ...row,
              ...addRow(value[arrayIndex]),
            ];
          }
        }
      } else {
        // Dict
        for (const [subKey, subValue] of Object.entries(value)) {
          if (isOneDimensional(subValue)) {
            row.push(subValue); // key + subKey = keySubKey
          } else {
            row = [
              ...row,
              ...addRow(subValue),
            ];
          }
        }
      }
    }
    return row;
  };
  return (
    <div
      style={{
        border: "1.63dvh solid #1D1E1E",
        width: "100%",
        height: "100%",
        backgroundColor: "#242424",
        borderRadius: "3.49dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
      onClick={() => {
        const data = localStorage.getItem("scoutingData");
        if (data == '{"data":[]}') {
          toast.error("No Data To Dump");
          return;
        }

        const jsonData = JSON.parse(data).data;
        console.log(jsonData);
        const csvConvertedData = [];
        csvConvertedData.push(addHeaders(jsonData[0]))
        for (const value of Object.values(jsonData)) {
          csvConvertedData.push(addRow(value))
        }

        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(csvConvertedData))
        );
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}_${String(now.getSeconds()).padStart(2, '0')}_${String(now.getMilliseconds()).padStart(3, '0')}`;
        element.setAttribute(
          "download",
          `VScouterData-${formattedDate}-${formattedTime}.json`
        );

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "5.58dvh",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Dump Data
      </h1>
    </div>
  );
};

export default HomeDumpDataButton;
