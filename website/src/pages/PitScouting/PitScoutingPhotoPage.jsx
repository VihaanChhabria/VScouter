import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PitScoutingTemplate from "../../components/PitScouting/PitScoutingTemplate";
import ToggleButton from "../../components/ToggleButton";
import Webcam from "react-webcam";

const PitScoutingPhotoPage = () => {
  const location = useLocation();
  const pitScouting = location.state?.pitScouting || {};

  const [robotNotPresent, setRobotNotPresent] = useState(
    pitScouting.robotNotPresent ?? false,
  );
  const [photoTaken, setPhotoTaken] = useState(
    pitScouting.photoTaken ?? false,
  );
  const [flipCamera, setFlipCamera] = useState(false);

  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(pitScouting.imageSrc ?? null);

  const takePhoto = () => {
    if (photoTaken) {
      setPhotoTaken(false);
      setImageSrc(null);
      return;
    }
    if (webcamRef.current) {
      setImageSrc(webcamRef.current.getScreenshot());
      setPhotoTaken(true);
    }
  };

  const pitScoutingState = {
    ...pitScouting,
    robotNotPresent,
    photoTaken,
    imageSrc,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PitScoutingTemplate
        title="Pit Scouting Photo Page"
        backPage="pit-scouting/capabilities-page-two"
        nextPage=""
        pitScoutingState={pitScoutingState}
        gridOrganize={false}
        customComponent={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2dvw",
              padding: "0 2dvw",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#3B3B3B",
                borderColor: "#1D1E1E",
                borderWidth: "2dvh",
                borderRadius: "3.49dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 0.65,
              }}
            >
              {!robotNotPresent ? (
                !photoTaken ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotQuality={0.8}
                    screenshotWidth={1280}
                    screenshotHeight={720}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "contain",
                    }}
                    videoConstraints={{
                      facingMode: flipCamera ? "user" : "environment",
                    }}
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt="Captured"
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "contain",
                    }}
                  />
                )
              ) : (
                <h1
                  style={{
                    color: "#FFFFFF",
                    fontSize: "3.5dvh",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Robot Not Present
                </h1>
              )}
            </div>

            <div
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2dvh",
                flex: 1 - 0.65,
              }}
            >
              <div
                style={{
                  width: "100%",
                  flex: "0.5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5dvw",
                }}
              >
                <div style={{ height: "100%", flex: 0.5 }}>
                  <ToggleButton
                    question={"Robot Not Present"}
                    selected={robotNotPresent}
                    setSelected={setRobotNotPresent}
                    fontSize="3.5dvh"
                  />
                </div>
                <div style={{ height: "100%", flex: 0.5 }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "1.63dvh solid #1D1E1E",
                      backgroundColor: "#242424",
                      borderRadius: "3.49dvh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                    onClick={() => {
                      setFlipCamera((prev) => !prev);
                    }}
                  >
                    <h1
                      style={{
                        color: "#FFFFFF",
                        fontSize: "3.5dvh",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Flip Camera
                    </h1>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  flex: "0.5",
                  backgroundColor: "#507144",
                  borderRadius: "3.49dvh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
                onClick={() => {
                  takePhoto();
                }}
              >
                <h1
                  style={{
                    color: "#FFFFFF",
                    fontSize: "3.5dvh",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {photoTaken ? "Retake Photo" : "Take Photo"}
                </h1>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default PitScoutingPhotoPage;
