import React, { useState } from "react";
import ToggleButton from "../components/ToggleButton.jsx";
import ProceedBackButton from "../components/ProceedBackButton";
import { toast } from "react-toastify";

import supabase from "../utils/supabase.js";

const TeamNumberPromptPage = () => {
  const [skip, setSkip] = useState(false);
  const [teamNumber, setTeamNumber] = useState("");

  const handleSubmit = async () => {
    if (navigator.onLine) {
      const { data, error } = await supabase
        .from("teams")
        .insert([{ team_num: parseInt(teamNumber) }]);

      if (error) {
        toast.error("Error submitting team number: " + error);
      } else {
        localStorage.setItem("sentTeamNumber", "true");
      }
    } else {
      // offline
      localStorage.setItem("sentTeamNumber", "false");
    }

    toast.success("Thank you for submitting your team number!");

    localStorage.setItem("teamNumber", teamNumber);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "90%",
          backgroundColor: "#3B3B3B",
          borderColor: "#1D1E1E",
          borderWidth: "2dvh",
          borderRadius: "3.49dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3dvh 2dvw",
          gap: "1dvw", //edit this
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "7dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Help Improve VScouter for Everyone!
        </h1>
        <h2
          style={{
            color: "#FFFFFF",
            fontSize: "3dvh",
            width: "80%",
            textAlign: "center",
            marginTop: "3dvh",
          }}
        >
          We noticed you've used VScouter a few times now; awesome!
        </h2>

        <h2
          style={{
            color: "#FFFFFF",
            fontSize: "3dvh",
            textAlign: "center",
            width: "80%",
          }}
        >
          If you're part of an FRC team, we'd love it if you could share your
          team number. This helps us understand how teams are using the app and
          improve it for everyone.
        </h2>

        <div
          style={{
            width: "80%",
            height: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2dvw",
            marginTop: "4%",
          }}
        >
          <input
            type="number"
            placeholder="Team #"
            style={{
              width: "20%",
              height: "25%",
              padding: "1dvh",
              fontSize: "3dvh",
              borderRadius: "0.5dvh",
              border: "1px solid #1D1E1E",
            }}
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
          />

          <div style={{ height: "60%", width: "20%" }}>
            <ToggleButton
              question={"I am not part of a FRC team or am just looking."}
              selected={skip}
              setSelected={setSkip}
              fontSize="2.25dvh"
            />
          </div>

          <div
            style={{
              width: "30%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "5%",
              marginLeft: "15%",
            }}
          >
            <div style={{ width: "100%", height: "50%" }}>
              <ProceedBackButton
                message={"Remind Me Later"}
                onClick={() => {
                  toast.success("We will remind you after you next 5 visits!");
                  localStorage.setItem(
                    "lastRemindMeLater",
                    localStorage.getItem("siteVisits"),
                  );
                }}
                back={true}
                textSize="2.5dvh"
              />
            </div>

            <ProceedBackButton
              message={"Submit"}
              onClick={() => {
                if (skip) {
                  toast.success("Skipping team number submission.");
                  return true;
                } else if (teamNumber === null || teamNumber === "") {
                  toast.error("Please enter a team number before submitting.");
                  return false; // Indicate that the submission failed
                }
                handleSubmit();
                return true;
              }}
              textSize="5dvh"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamNumberPromptPage;
