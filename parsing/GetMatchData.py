import webbrowser
import requests
import json

from typing import Any


def generateQRCode(eventKey: str, apiKey: str = ""):
    """
    Makes a QR code for the matches from The Blue Alliance.

    Args:
        eventKey: The key of the event to download matches from.
        apiKey: The API key to use for The Blue Alliance API.
    """
    data: str = f'{{""eventKey"":""{eventKey}"",""apiKey"":""{apiKey}""}}'
    qrLink: str = (
        f"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={data}"
    )

    print("\nScan the following QR code on your scouting devices.\n")
    print(qrLink)
    openLink: str = input("Open in new tab? (y/n) ")

    if (openLink == "y") or (openLink == "Y"):
        webbrowser.open(qrLink)


def downloadMatches(eventKey: str, apiKey: str = ""):
    """
    Downloads matches from the specified event from The Blue Alliance.

    Args:
        eventKey: The key of the event to download matches from.
        apiKey: The API key to use for The Blue Alliance API.
    """

    response: requests.Response = requests.get(
        f"https://www.thebluealliance.com/api/v3/event/{eventKey}/matches",
        headers={"X-TBA-Auth-Key": apiKey, "Content-Type": "application/json"},
    )

    allMatches: dict[Any, Any] = json.loads(response.text)

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
    print(
        "1) Generate QR code -> scouting devices need internet when getting match data"
    )
    print(
        "2) Generate match data in file -> scouting devices do not need internet but you must load the file manually"
    )
    method: str = input("\nPlease select a method (1/2): ")

    eventKey: str = input("\n\nEnter event key (ex: 2024mrcmp): ")
    apiKey: str = input("Enter TBA API Key: ")

    if method == "1":
        generateQRCode(eventKey, apiKey)
    elif method == "2":
        downloadMatches(eventKey, apiKey)
