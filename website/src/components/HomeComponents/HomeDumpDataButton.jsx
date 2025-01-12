import React from "react";
import { toast } from "react-toastify";

const HomeDumpDataButton = () => {
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

        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:application/json;charset=utf-8," + encodeURIComponent(data)
        );
        element.setAttribute(
          "download",
          `VScouterData-${new Date().toLocaleTimeString()}.json`
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
