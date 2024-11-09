import React from "react";

const SettingsUpdateButton = () => {
  const clearServiceWorkers = () => {
    console.log(navigator.onLine);
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  };
  return (
    <>
      <div
        style={{
          width: "30dvw",
          height: "17.84dvh",
          position: "absolute",
          top: "2.33dvh",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          border: "1.63dvh solid #1D1E1E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        onClick={clearServiceWorkers}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Update Website
        </h1>
      </div>
    </>
  );
};

export default SettingsUpdateButton;
