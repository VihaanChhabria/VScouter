import React, { useState, useEffect } from "react";

const MainLayoutPortraitWarning = () => {
  const [opacity, setOpacity] = useState(0.3);
  const [isIncreasing, setIsIncreasing] = useState(true);

  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );
  const [forcePortrait, setForcePortrait] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => {
        if (isIncreasing) {
          const newOpacity = prevOpacity + 0.01;
          if (newOpacity >= 0.6) {
            setIsIncreasing(false);
          }
          return newOpacity >= 0.6 ? 0.6 : newOpacity;
        } else {
          const newOpacity = prevOpacity - 0.01;
          if (newOpacity <= 0.3) {
            setIsIncreasing(true);
          }
          return newOpacity <= 0.3 ? 0.3 : newOpacity;
        }
      });
    }, 60);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [isIncreasing]);

  useEffect(() => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  }, [window.matchMedia("(orientation: portrait)").matches]);

  return (
    <>
      {isPortrait && !forcePortrait && (
        <div
          style={{
            width: "100dvw",
            height: "100dvh",
            backgroundColor: `rgb(255, 0, 0, ${opacity})`,
            position: "absolute",
            top: "0dvh",
            left: "0dvw",
            zIndex: "3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "7dvw",
              fontWeight: "600",
              textAlign: "center",
              paddingLeft: "2dvw",
              paddingRight: "2dvw",
            }}
          >
            This app is meant to be viewed in landscape mode. Please rotate your
            device. If this is a mistake please click the ignore button below.
          </h1>
          <div
            style={{
              marginTop: "2dvh",
              padding: "1dvh 2dvw",
              backgroundColor: "#4A4A4A",
              color: "white",
              border: "1.63dvh solid #1D1E1E",
              borderRadius: "3.49dvh",
            }}
            onClick={() => setForcePortrait(true)}
          >
            Ignore
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayoutPortraitWarning;
