import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProceedBackButton from "../../components/ProceedBackButton";

const isImageSrc = (value) =>
  typeof value === "string" && value.startsWith("data:image/");

/** Renders a table cell; for image URLs shows hover-to-reveal image */
const TableCell = ({ value, columnKey }) => {
  const [hover, setHover] = useState(false);

  if (value === null || value === undefined) {
    return <td style={cellStyle}>—</td>;
  }

  if (isImageSrc(value)) {
    return (
      <td
        style={cellStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span style={{ position: "relative" }}>
          [Image]
          {hover && (
            <span
              style={{
                position: "fixed",
                zIndex: 1000,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#1a1a1a",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                border: "1px solid #333",
                pointerEvents: "none",
                maxWidth: "90vw",
                maxHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={value}
                alt=""
                style={{
                  maxWidth: "85vw",
                  maxHeight: "85vh",
                  objectFit: "contain",
                }}
              />
            </span>
          )}
        </span>
      </td>
    );
  }

  if (typeof value === "object") {
    const str =
      value && typeof value === "object"
        ? JSON.stringify(value).slice(0, 200) +
          (JSON.stringify(value).length > 200 ? "…" : "")
        : String(value);
    return <td style={cellStyle} title={JSON.stringify(value)}>{str}</td>;
  }

  return (
    <td style={cellStyle} title={String(value)}>
      {String(value)}
    </td>
  );
};

const cellStyle = {
  border: "1px solid #333",
  padding: "8px 10px",
  color: "#e0e0e0",
  fontSize: "2.2dvh",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "280px",
};

const SettingsViewDataPage = () => {
  const location = useLocation();
  const localStorageKey =
    location.state?.inputs?.localStorageKey ?? location.state?.localStorageKey;

  const { rows, columns } = useMemo(() => {
    if (!localStorageKey) return { rows: [], columns: [] };
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (!raw) return { rows: [], columns: [] };
      const parsed = JSON.parse(raw);
      const data = Array.isArray(parsed?.data) ? parsed.data : Array.isArray(parsed) ? parsed : [];
      const columnSet = new Set();
      data.forEach((row) => Object.keys(row).forEach((k) => columnSet.add(k)));
      const cols = [...columnSet];
      return { rows: data, columns: cols };
    } catch {
      return { rows: [], columns: [] };
    }
  }, [localStorageKey]);

  const backPath = localStorageKey === "pitScoutingData" ? "settings/pit-scouting" : "settings/match-scouting";

  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        flexDirection: "column",
        padding: "2dvh 2dvw",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: "0 0 17.5dvh",
          minHeight: "17.5dvh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2dvh 2dvw",
          gap: "2dvw",
        }}
      >
        <div style={{ width: "15dvw", height: "100%", flexShrink: 0 }}>
          <ProceedBackButton nextPage={backPath} back={true} />
        </div>
        <h1
          style={{
            flex: 1,
            color: "#FFFFFF",
            fontSize: "8dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          View Data
        </h1>
        <div style={{ width: "17.5dvw", minWidth: "17.5dvw", flexShrink: 0 }} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: "2dvh 2dvw",
        }}
      >
        {!localStorageKey ? (
          <p style={{ color: "#aaa", fontSize: "3dvh" }}>No data key provided.</p>
        ) : rows.length === 0 ? (
          <p style={{ color: "#aaa", fontSize: "3dvh" }}>No data stored for this key.</p>
        ) : (
          <div
            style={{
              backgroundColor: "#242424",
              border: "1.63dvh solid #1D1E1E",
              borderRadius: "3.49dvh",
              overflowX: "auto",
              overflowY: "auto",
              width: "100%",
              minHeight: 0,
            }}
          >
            <table
              style={{
                width: "max-content",
                minWidth: "100%",
                borderCollapse: "collapse",
                tableLayout: "auto",
              }}
            >
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      style={{
                        ...cellStyle,
                        backgroundColor: "#1D1E1E",
                        color: "#fff",
                        fontWeight: "bold",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        whiteSpace: "nowrap",
                        maxWidth: "none",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#242424" : "#2a2a2a",
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col}
                        columnKey={col}
                        value={row[col]}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsViewDataPage;
