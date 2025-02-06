import json
import requests

from typing import Any

BASE_URL = "https://www.thebluealliance.com/api/v3"


def downloadMatches(event_key: str, api_key: str):
    """
    Downloads matches for the given event key and TBA API key, and saves to a json and csv file.

    :param event_key: The event key to download matches for
    :param api_key: The TBA API key to use
    :return: None
    """
    # Get the matches from TBA
    allMatches: dict[Any, Any] = getEventMatches(event_key, api_key)

    # Rearrange the matches to be in a more useful format
    qualMatchesCleaned: list[dict[str, Any]] = []

    for match in allMatches:
        if match["comp_level"] == "qm":
            qualMatchesCleaned.append(
                {
                    "matchNum": match["match_number"],
                    "redAlliance": removeFRCFromList(
                        match["alliances"]["red"]["team_keys"]
                    ),
                    "redAlliance": removeFRCFromList(
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


def getEventMatches(event_key: str, api_key: str) -> dict[Any, Any]:
    """
    Fetches and converts the matches for the given event key using the given TBA API key.

    :param event_key: The event key to download matches for
    :param api_key: The TBA API key to use
    :return: The matches for the given event
    """
    # Construct the URL to query the TBA API
    url = f"{BASE_URL}/event/{event_key}/matches"

    # Fetch the matches from the TBA API
    headers = {"X-TBA-Auth-Key": api_key, "Content-Type": "application/json"}

    # Make the request to the TBA API
    response = requests.get(url, headers=headers)

    # Parse the matches from the JSON response
    matches = json.loads(response.text)

    return matches


if __name__ == "__main__":
    downloadMatches(
        input("Enter event key (ex: 2024mrcmp): "), input("Enter TBA API key: ")
    )
