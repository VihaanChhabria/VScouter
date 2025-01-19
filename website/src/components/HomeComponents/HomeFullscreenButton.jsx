import React, { useEffect, useState } from "react";

const HomeFullscreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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
        if (isFullScreen) {
          let elem = document.documentElement; 
          
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
  );
};

export default HomeFullscreenButton;
