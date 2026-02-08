import React, { useEffect, useState } from "react";

const Dropdown = ({
  question = "-",
  options = [],
  defaultValue = null,
  setSelectedValue = () => {},
}) => {
  const [upperValue, setUpperValue] = useState(
    defaultValue === null ? "" : defaultValue.toUpperCase()
  );

  const [dropdownSelected, setDropdownSelected] = useState(false);

  useEffect(() => {
    if (upperValue !== "") {
      setSelectedValue(upperValue);
    } else {
      setSelectedValue(null);
    }
  }, [upperValue]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {dropdownSelected &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) && (
          <div
            style={{
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              position: "absolute",
              zIndex: 1,
            }}
          />
        )}

      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            border: "1.3dvh solid #1D1E1E",
            width: "100%",
            height: "100%",
            backgroundColor: "#242424",
            borderRadius: "3.49dvh",
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "1dvw",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
            }}
          >
            {question}
          </h1>

          {/* Select wrapper for arrow positioning */}
          <div
            style={{
              position: "relative",
              width: "97%",
            }}
          >
            <select
              value={upperValue}
              onChange={(e) => setUpperValue(e.target.value.toUpperCase())}
              onFocus={() => setDropdownSelected(true)}
              onBlur={() => setDropdownSelected(false)}
              style={{
                border: "0.93dvh solid #1D1E1E",
                borderRadius: "2.33dvh",
                backgroundColor: "#4A4A4A",
                color: "#FFFFFF",
                width: "100%",
                height: "8.88dvh",
                fontSize: "4.0dvh",
                paddingLeft: "1dvw",
                paddingRight: "4dvw", // space for arrow
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              <option value="" disabled>
                Select an Option
              </option>
              {options.map((option, index) => (
                <option key={index} value={option.toUpperCase()}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Dropdown triangle */}
            <div
              style={{
                position: "absolute",
                right: "1.5dvw",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderLeft: "1dvh solid transparent",
                borderRight: "1dvh solid transparent",
                borderTop: "1.5dvh solid #FFFFFF",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
