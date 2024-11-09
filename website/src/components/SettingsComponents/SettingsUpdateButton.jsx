import React from "react";
import { toast } from "react-toastify";

/**
 * A component for updating the website, deleting all service workers and their
 * respective caches.
 *
 * @returns {JSX.Element} The rendered component.
 */
const SettingsUpdateButton = () => {
  /**
   * Clears all service workers and their caches.
   */
  const clearServiceWorkers = () => {
    // Get all the registrations of the service workers and loop through them
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        // Unregister the service worker
        registration.unregister();
      }
    });
    // Notify the user that the website has been updated
    console.log("Website Updated");
    toast.success("Website Updated");
  };
  return (
    <>
      {/* Container for the update button */}
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
