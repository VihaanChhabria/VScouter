var jsonFull = ""

document.getElementById("save").addEventListener("click", () => saveData());


const baseNames = [
    "autoAmp",
    "autoSpeaker",
    "teleopAmp",
    "teleopSpeaker",
    "trap"
];

for (let index = 0; index < baseNames.length; index++) {
    const baseName = baseNames[index];
    createCounter(baseName)
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

    INPUT_TEXT = "text";
    INPUT_COUNTER = "counter";
    INPUT_CHECKBOX = "checkbox";

    dataInputs = [
        [["matchNumber", INPUT_TEXT]],
        [["teamNumber", INPUT_TEXT]],
        [["initials", INPUT_TEXT]],
        [["autoAmpLab", INPUT_COUNTER]],
        [["autoSpeakerLab", INPUT_COUNTER]],
        [["teleopAmpLab", INPUT_COUNTER]],
        [["teleopSpeakerLab", INPUT_COUNTER]],
        [["trapLab", INPUT_COUNTER]],
        [["climbed", INPUT_CHECKBOX]],
        [["buddyClimb", INPUT_CHECKBOX]],
        [["brokeDown", INPUT_CHECKBOX]],
        [["comments", INPUT_TEXT]]
    ];


    for (let index = 0; index < dataInputs.length; index++) {
        const element = dataInputs[index][0][0];
        const elementType = dataInputs[index][0][1];
        
        const input = document.getElementById(element);
        data = "";

        switch (elementType) {
            case INPUT_COUNTER:
                data = input.innerText;
                data.innerText = 0
                break;

            case INPUT_CHECKBOX:
                data = input.checked;
                input.checked = false
                break;
        
            default:
                //INPUT_TEXT
                data = input.value;
                input.value = ""
                break;
        }

        dataInputs[index].push(data)
    }

    jsonFile = "{\n"
    for (let index = 0; index < dataInputs.length; index++) {
        const dataName = dataInputs[index][0][0];
        const data = dataInputs[index][1];
        
        if (index == (dataInputs.length-1)){
            jsonFile = jsonFile + '"' + dataName + '" : "' + data + '"\n';
        }else{
            jsonFile = jsonFile + '"' + dataName + '" : "' + data + '",\n';
        }
    }
    jsonFile = jsonFile + "}";
    jsonFull = jsonFull + jsonFile + ", "

    const file = new Blob([jsonFile], { type: 'text/plain' });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "M" + dataInputs[0][1] + "_T" + dataInputs[1][1] + ".json";

    link.click();
    URL.revokeObjectURL(link.href);
}