import React, { useState } from "react";
import ToggleButton from "../../ToggleButton";

const QUICK_TIME_PRESETS = [5, 10, 15, 20, 25];

const EndgameClimbTimeSection = ({
  climbPosition,
  climbTimeSeconds,
  setClimbTimeSeconds,
  climbFailed,
  setClimbFailed,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#3B3B3B",
        borderColor: "#1D1E1E",
        borderWidth: "2dvh",
        borderRadius: "3.49dvh",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2dvh",
        padding: "2.5dvh",
      }}
    >
      {climbPosition === "" || climbPosition === null ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "3.5dvh",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Please Select A Climb Position
          </h2>
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          {/* Title */}
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "3.5dvh",
              fontWeight: "bold",
            }}
          >
            Climb Time
          </h2>

          {/* Climb time slider */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5dvh",
            }}
          >
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "3dvh",
                fontWeight: "500",
              }}
            >
              How long did the robot take to climb?
            </h3>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1dvh",
              }}
            >
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={climbTimeSeconds}
                onChange={(e) => setClimbTimeSeconds(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#507144",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "2.5dvh",
                  }}
                >
                  0s
                </span>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "2.8dvh",
                    fontWeight: "bold",
                  }}
                >
                  {climbTimeSeconds}s
                </span>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "2.5dvh",
                  }}
                >
                  30s
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1dvh",
                  marginTop: "0.5dvh",
                }}
              >
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "2.3dvh",
                  }}
                >
                  Quick select:
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "1dvh",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {QUICK_TIME_PRESETS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setClimbTimeSeconds(value)}
                      style={{
                        flex: 1,
                        padding: "4dvh 1.5dvw",
                        fontSize: "3dvh",
                        fontWeight: "bold",
                        borderRadius: "1.5dvh",
                        border: "0.4dvh solid #1D1E1E",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor:
                          climbTimeSeconds === value ? "#507144" : "#242424",
                        color: "#FFFFFF",
                      }}
                    >
                      {value}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Climb failed question */}
          <div
            style={{
              width: "100%",
              height: "25%",
              marginTop: "2.5%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ToggleButton
              question="Robot fail to climb?"
              selected={climbFailed}
              setSelected={setClimbFailed}
              fontSize="3.2dvh"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EndgameClimbTimeSection;
