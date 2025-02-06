import json
import requests

from typing import Any


def downloadMatches(eventKey: str, useStatbotics: bool, apiKey: str = ""):
    """
    Downloads matches from The Blue Alliance or Statbotics API and saves them to a JSON file.

    Args:
        eventKey: The key of the event to download matches from.
        useStatbotics: Boolean indicating whether to use the Statbotics API or The Blue Alliance API.
        apiKey: The API key to use for The Blue Alliance API. Not needed for Statbotics API.
    """
    if useStatbotics:
        # Get the matches from Statbotics
        response = requests.get(
            f"https://api.statbotics.io/v3/matches?event={eventKey}"
        )
        allMatches = json.loads(response.text)
    else:
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
            if useStatbotics:
                # Statbotics returns team keys as a list of strings
                qualMatchesCleaned.append(
                    {
                        "matchNum": match["match_number"],
                        "redAlliance": convertNumToStrFromList(
                            match["alliances"]["red"]["team_keys"]
                        ),
                        "blueAlliance": convertNumToStrFromList(
                            match["alliances"]["blue"]["team_keys"]
                        ),
                    }
                )
            else:
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


def convertNumToStrFromList(inputList: list[int]) -> list[str]:
    outputList: list[str] = []
    for inputElement in inputList:
        outputList.append(str(inputElement))
    return outputList


if __name__ == "__main__":
    print("Please Select Which API You Would Like To Use:")
    print("a) The Blue Alliance API -> faster updates but needs API key")
    print("b) Statbotics API -> slower updates but no API key needed")
    print("anything else) exit")
    typeOfAPI: str = input("a/b/anything else: ")

    eventKey: str = input("Enter event key (ex: 2024mrcmp): ")

    if typeOfAPI == "a":
        downloadMatches(eventKey, False, input("Enter TBA API Key: "))
    elif typeOfAPI == "b":
        downloadMatches(eventKey, True)
