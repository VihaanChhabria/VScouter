let jsonFull = localStorage.getItem("jsonData") ? localStorage.getItem("jsonData") : "[]";
let jsonArray = JSON.parse(jsonFull);

const INPUT_TEXT = "text";
const INPUT_COUNTER = "counter";
const INPUT_CHECKBOX = "checkbox";

const dataInputs = [
    ["matchNumber", INPUT_TEXT],
    ["teamNumber", INPUT_TEXT],
    ["initials", INPUT_TEXT],
    ["autoAmpMadeLab", INPUT_COUNTER],
    ["autoAmpMissedLab", INPUT_COUNTER],
    ["autoSpeakerMadeLab", INPUT_COUNTER],
    ["autoSpeakerMissedLab", INPUT_COUNTER],
    ["teleopAmpMadeLab", INPUT_COUNTER],
    ["teleopAmpMissedLab", INPUT_COUNTER],
    ["teleopSpeakerMadeLab", INPUT_COUNTER],
    ["teleopSpeakerMissedLab", INPUT_COUNTER],
    ["trapMadeLab", INPUT_COUNTER],
    ["trapMissedLab", INPUT_COUNTER],
    ["climbed", INPUT_CHECKBOX],
    ["buddyClimb", INPUT_CHECKBOX],
    ["brokeDown", INPUT_CHECKBOX],
    ["comments", INPUT_TEXT]
];

document.getElementById("save").addEventListener("click", saveData);

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

baseNames.forEach(baseName => createCounter(baseName));

function createCounter(baseName) {
    const label = document.getElementById(baseName + "Lab");

    if (label) {
        const increaseButton = document.getElementById(baseName + "P");
        const decreaseButton = document.getElementById(baseName + "N");

        if (increaseButton && decreaseButton) {
            increaseButton.addEventListener("click", () => increase(label));
            decreaseButton.addEventListener("click", () => decrease(label));
        } else {
            console.error(`Buttons not found for base name: ${baseName}`);
        }
    } else {
        console.error(`Label not found for base name: ${baseName}`);
    }

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
        const element = dataInputs[index][0];
        const elementType = dataInputs[index][1];

        const input = document.getElementById(element);
        let data = "";

        if (input) {
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
                    data = input.value;

                    if (((element === "matchNumber") || (element === "teamNumber") || (element === "initials")) && (data === "")) {
                        alert(`Please fill out ${element} to save`);
                        return;
                    }

                    input.value = "";
                    break;
            }

            currentData[element] = data;
        } else {
            console.error(`Input element not found: ${element}`);
        }
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
