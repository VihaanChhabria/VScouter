sonFull = localStorage.getItem("jsonData") ? JSON.parse(localStorage.getItem("jsonData")) : "[]";

let jsonArray = JSON.parse(jsonFull);

document.getElementById("save").addEventListener("click", () => saveData());

const baseNames = [
    "autoAmpMade",
    "autoSpeakerMade",
    "teleopAmpMade",
    "teleopSpeakerMade",
    "trapMade",
    "autoAmpMissed",
    "autoSpeakerMissed",
    "teleopAmpMissed",
    "teleopSpeakerMissed",
    "trapMissed"
];

for (let index = 0; index < baseNames.length; index++) {
    const baseName = baseNames[index];
    createCounter(baseName);
}

function createCounter(baseName) {
    const label = document.getElementById(baseName + "Lab");

    const increaseButton = document.getElementById(baseName + "P");
    const decreaseButton = document.getElementById(baseName + "N");

    increaseButton.addEventListener("click", () => increase(label));
    decreaseButton.addEventListener("click", () => decrease(label));

    function increase(label) {
        label.innerText = parseInt(label.innerText) + 1;
    }

    function decrease(label) {
        const value = parseInt(label.innerText);
        if (value > 0) {
            label.innerText = value - 1;
        }
    }
}

function saveData() {
    let currentData = {};

    for (let index = 0; index < dataInputs.length; index++) {
        const element = dataInputs[index][0][0];
        const elementType = dataInputs[index][0][1];

        const input = document.getElementById(element);
        let data = "";

        switch (elementType) {
            case INPUT_COUNTER:
                data = input.innerText;
                input.innerText = 0;
                break;
            case INPUT_CHECKBOX:
                data = input.checked;
                input.checked = false;
                break;
            default:
                // INPUT_TEXT
                data = input.value;

                if (((element == "matchNumber") || (element == "teamNumber") || (element == "initials")) && (data == "")) {
                    alert(`Please fill out ${element} to save`);
                    return;
                }

                input.value = "";
                break;
        }

        currentData[element] = data;
    }

    jsonArray.push(currentData);

    jsonFull = JSON.stringify(jsonArray);

    localStorage.setItem("jsonData", jsonFull);

    const jsonFile = JSON.stringify(currentData, null, 2);
    const file = new Blob([jsonFile], { type: 'application/json' });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = `M${currentData["matchNumber"]}_T${currentData["teamNumber"]}.json`;

    link.click();
    URL.revokeObjectURL(link.href);
}
