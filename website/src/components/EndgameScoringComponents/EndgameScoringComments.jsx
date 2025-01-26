import React from "react";

const EndgameScoringComments = ({ comment, setComment }) => {
  return (
    <textarea
      style={{
        width: "100%",
        height: "100%",
        border: "0.93dvh solid #1D1E1E",
        borderRadius: "2.33dvh",
        backgroundColor: "#4A4A4A",
        color: "#FFFFFF",
        fontSize: "3.0dvh",
        padding: "1.56dvh",
      }}
      onChange={(e) => setComment(e.target.value)}
      id="comments"
      defaultValue={comment}
      placeholder="Enter Comments Here"
    ></textarea>
  );
};

export default EndgameScoringComments;
