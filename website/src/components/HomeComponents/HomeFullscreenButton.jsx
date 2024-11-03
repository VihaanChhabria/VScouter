import React, { useEffect, useState } from "react";

const HomeFullscreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <div
        style={{
          border: "1.63dvh solid #1D1E1E",
          width: "25dvw",
          height: "17.84dvh",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "2.33dvh",
          right: "1.07dvw",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        onClick={() => {
          if (isFullScreen) {
            let elem = document.documentElement; // Or any specific element you want to make fullscreen

            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
              // Firefox
              elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
              // Chrome, Safari, and Opera
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
              // IE/Edge
              elem.msRequestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              // Firefox
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              // Chrome, Safari, and Opera
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              // IE/Edge
              document.msExitFullscreen();
            }
          }
          setIsFullScreen(!isFullScreen);
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
          Full Screen
        </h1>
      </div>
    </>
  );
};

export default HomeFullscreenButton;
