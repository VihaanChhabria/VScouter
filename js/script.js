let jsonFull = ""

const INPUT_TEXT = "text"
const INPUT_COUNTER = "counter"
const INPUT_CHECKBOX = "checkbox"

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
    ["notesFedLab", INPUT_COUNTER],
    ["trapMadeLab", INPUT_COUNTER],
    ["trapMissedLab", INPUT_COUNTER],
    ["climbed", INPUT_CHECKBOX],
    ["buddyClimb", INPUT_CHECKBOX],
    ["brokeDown", INPUT_CHECKBOX],
    ["comments", INPUT_TEXT]
]

document.getElementById("save").addEventListener("click", () => saveData())

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
    "trapMissed",

    "notesFed"
]

for (let index = 0; index < baseNames.length; index++) {
    const baseName = baseNames[index]
    createCounter(baseName)
}

function createCounter(baseName) {
    const label = document.getElementById(baseName + "Lab")

    const increaseButton = document.getElementById(baseName + "P")
    const decreaseButton = document.getElementById(baseName + "N")

    increaseButton.addEventListener("click", () => increase(label))
    decreaseButton.addEventListener("click", () => decrease(label))

    function increase(label) {
        label.innerText = parseInt(label.innerText) + 1
    }

    function decrease(label) {
        const value = parseInt(label.innerText)
        if (value > 0) {
            label.innerText = value - 1
        }
    }
}

function saveData() {
    let formData = {}

    for (let index = 0; index < dataInputs.length; index++) {
        const element = dataInputs[index][0]
        const elementType = dataInputs[index][1]
        
        const input = document.getElementById(element)
        let data = ""

        switch (elementType) {
            case INPUT_COUNTER:
                data = input.innerText                
                input.innerText = 0
                break

            case INPUT_CHECKBOX:
                data = input.checked
                input.checked = false
                break
        
            default:
                // INPUT_TEXT
                data = input.value
                if (((element === "matchNumber") || (element === "teamNumber") || (element === "initials") || (element === "scouterNum")) && (data === "")) {
                    alert(`Please fill out ${element} to save`)
                    return
                }
                if (element != "scouterNum") {
                    input.value = ""
                }
                break
        }

        formData[element] = data
    }

    const jsonFile = JSON.stringify(formData, null, 2)
    jsonFull = jsonFull ? jsonFull + ",\n" + jsonFile : jsonFile
    localStorage["jsonData"] = jsonFull

    const file = new Blob([jsonFile], { type: 'text/plain' })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(file)
    link.download = `M${formData.matchNumber}_T${formData.teamNumber}.json`

    link.click()
    URL.revokeObjectURL(link.href)
}
