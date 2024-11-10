import React from "react"; // Imports the React library to create components

/**
 * A component that displays a list of selected files, with the ability to remove
 * them.
 *
 * @param {array} selectedFiles - The list of files that have been selected.
 * @param {function} setSelectedFiles - The function to set the list of selected files.
 * @returns {ReactElement} The rendered component.
 */
const ParseDataSelectedViewer = ({ selectedFiles, setSelectedFiles }) => {
  return (
    <>
      <div
        style={{
          width: "22dvw",
          height: "100%",
          backgroundColor: "#929292",
          border: "1.3dvh solid #2B2B2B",
          borderRadius: "2.683dvh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <ul>
          {/* Loops over each file in selectedFiles and creates a list item */}
          {selectedFiles.map((file, index) => (
            <li key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1.3dvh solid #2B2B2B",
                }}
              >
                {/* Displays the file name */}
                <h1 style={{ fontSize: "2.5dvh", marginLeft: "0.64dvw" }}>
                  {file.name}
                </h1>

                {/* Displays a clickable 'x' button for removing the file */}
                <h1
                  style={{
                    fontSize: "3.5dvh",
                    marginRight: "2dvw",
                    color: "red",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    // Filters out the clicked file from the list
                    setSelectedFiles(
                      selectedFiles.filter((file, i) => i !== index)
                    );
                  }}
                >
                  x
                </h1>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ParseDataSelectedViewer;
