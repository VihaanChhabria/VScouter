import json
import requests

from typing import Any


def downloadMatches(eventKey: str, apiKey: str = ""):
    """
    Downloads matches from The Blue Alliance and saves them to a JSON file.

    Args:
        eventKey: The key of the event to download matches from.
        apiKey: The API key to use for The Blue Alliance API.
    """
    # Get the matches from TBA
    headers = {"X-TBA-Auth-Key": apiKey, "Content-Type": "application/json"}
    response = requests.get(
        f"https://www.thebluealliance.com/api/v3/event/{eventKey}/matches",
        headers=headers,
    )
    allMatches = json.loads(response.text)

    # Rearrange the matches to be in a more useful format
    qualMatchesCleaned: list[dict[str, Any]] = []

    for match in allMatches:
        if match["comp_level"] == "qm":

            # The Blue Alliance returns team keys as a list of strings with "frc" prefixed
            qualMatchesCleaned.append(
                {
                    "matchNum": match["match_number"],
                    "redAlliance": removeFRCFromList(
                        match["alliances"]["red"]["team_keys"]
                    ),
                    "blueAlliance": removeFRCFromList(
                        match["alliances"]["blue"]["team_keys"]
                    ),
                }
            )

    # Save the rearranged matches to a json file
    with open("../data/EventMatches.json", "w") as file:
        json.dump({"matches": qualMatchesCleaned}, file)


def removeFRCFromList(inputList: list[str]) -> list[str]:
    outputList: list[str] = []
    for inputElement in inputList:
        outputList.append(inputElement.replace("frc", ""))
    return outputList


if __name__ == "__main__":
    downloadMatches(
        input("Enter event key (ex: 2024mrcmp): "), input("Enter TBA API Key: ")
    )
