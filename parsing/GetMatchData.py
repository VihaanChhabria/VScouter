import webbrowser


def downloadMatches(eventKey: str, apiKey: str = ""):
    """
    Makes a QR code for the matches from The Blue Alliance.

    Args:
        eventKey: The key of the event to download matches from.
        apiKey: The API key to use for The Blue Alliance API.
    """
    data: str = f"{{eventKey:'{eventKey}',apiKey:'{apiKey}'}}"
    qrLink: str = (
        f"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={data}"
    )

    print("\nScan the following QR code on your scouting devices.\n")
    print(qrLink)
    openLink: str = input("Open in new tab? (y/n) ")

    if (openLink == "y") or (openLink == "Y"):
        webbrowser.open(qrLink)


if __name__ == "__main__":
    downloadMatches(
        input("Enter event key (ex: 2024mrcmp): "), input("Enter TBA API Key: ")
    )
