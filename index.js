import naoJson from './teleconnections_data/nao_values.json' assert {type: 'json'};
import aoJson from './teleconnections_data/ao_values.json' assert {type: 'json'};
import epoJson from './teleconnections_data/epo_values.json' assert {type: 'json'};
import pnaJson from './teleconnections_data/pna_values.json' assert {type: 'json'};

const analogData = JSON.parse(localStorage.getItem("analogData"));
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if (analogData == null) {
    alert("It looks like you didn't select a value for any of the indices. In order to find an analog, we need at least ONE index filled out.");
}

const naoIndex = null ? analogData["naoIndex"] === "" : parseFloat(analogData["naoIndex"]);
const aoIndex = null ? analogData["aoIndex"] === "" : parseFloat(analogData["aoIndex"]);
const epoIndex = null ? analogData["epoIndex"] === "" : parseFloat(analogData["epoIndex"]);
const pnaIndex = null ? analogData["pnaIndex"] === "" : parseFloat(analogData["pnaIndex"]);
const stationCode = null ? analogData["stationCode"] === "" : analogData["stationCode"];
var analogs = [];

// Listing the names of all the indices that are used
var indicesNames = [];

if (!isNaN(naoIndex)) {
    indicesNames.push("nao");
}

if (!isNaN(aoIndex)) {
    indicesNames.push("ao");
}

if (!isNaN(epoIndex)) {
    indicesNames.push("epo");
}

if (!isNaN(pnaIndex)) {
    indicesNames.push("pna");
}

localStorage.removeItem("analogData");

// Define different behaviors of opening and closing buttons

function showSnowfallModal(analogNumber) {
    let fadedBackground = document.getElementById("gray-bg");
    let snowfallModal = document.getElementById("snowfall-modal");
    // Pause old animations
    fadedBackground.style.animationPlayState = "paused";
    snowfallModal.style.animationPlayState = "paused";
    // Display gray background
    snowfallModal.style.animationPlayState = "running";
    fadedBackground.style.display = "block";
    // Show modal
    snowfallModal.style.display = "block";
}

function closeSnowfallModal() {
    let fadedBackground = document.getElementById("gray-bg");
    let snowfallModal = document.getElementById("snowfall-modal");
    // Pause old animations
    fadedBackground.style.animationPlayState = "paused";
    snowfallModal.style.animationPlayState = "paused";
    // Close gray background
    fadedBackground.style.animationPlayState = "running";
    fadedBackground.style.display = "none";
    // Close modal
    snowfallModal.style.display = "none";
}

function showIndicesModal(analogNumber) {
    let fadedBackground = document.getElementById("gray-bg");
    let indicesModal = document.getElementById("indices-modal");
    // Pause old animations
    fadedBackground.style.animationPlayState = "paused";
    indicesModal.style.animationPlayState = "paused";
    // Display gray background
    indicesModal.style.animationPlayState = "running";
    fadedBackground.style.display = "block";
    // Show modal
    indicesModal.style.display = "block";

    // Change values within the indices modal
    let currentAnalog = bestAnalogs[analogNumber - 1];
    let actualIndices = currentAnalog[3];

    document.getElementById("indices-header").innerText = `Indices in ${months[currentAnalog[1] - 1]} ${currentAnalog[0]}`;

    for (let idx = 0; idx < indicesNames.length; idx++) {
        let currentIndex = indicesNames[idx];
        let indexDifference = Math.abs(parseFloat(analogData[`${currentIndex}Index`]) - actualIndices[idx]);

        document.getElementById(`${currentIndex}Value`).innerText = (Math.round(actualIndices[idx] * 100) / 100).toFixed(2);
        document.getElementById(`${currentIndex}Difference`).innerText = `Δ${(Math.round(indexDifference * 100) / 100).toFixed(2)}σ`

        if (indexDifference > 0) {
            document.getElementById(`${currentIndex}Difference`).classList.add("text-emerald-700")
        }
        else if (indexDifference < 0) {
            document.getElementById(`${currentIndex}Difference`).classList.add("text-red-700")
        }
    }
}

function closeIndicesModal() {
    let fadedBackground = document.getElementById("gray-bg");
    let indicesModal = document.getElementById("indices-modal");
    // Pause old animations
    fadedBackground.style.animationPlayState = "paused";
    indicesModal.style.animationPlayState = "paused";
    // Close gray background
    fadedBackground.style.animationPlayState = "running";
    fadedBackground.style.display = "none";
    // Close modal
    indicesModal.style.display = "none";
}

// Calculate all analogs
for (let startingYear = 1950; startingYear < 1950 + Object.keys(naoJson).length; startingYear++) {
    for (let month = 1; month <= 12; month++) {
        if (4 < month && month < 11) {
            continue
        }
        
        let desiredIndices = [];
        let actualIndices = [];

        if (!isNaN(naoIndex)) {
            desiredIndices.push(naoIndex);
            actualIndices.push(naoJson[startingYear.toString()][month - 1]);
        }

        if (!isNaN(aoIndex)) {
            desiredIndices.push(aoIndex);
            actualIndices.push(aoJson[startingYear.toString()][month - 1]);
        }

        if (!isNaN(epoIndex)) {
            desiredIndices.push(epoIndex);
            actualIndices.push(epoJson[startingYear.toString()][month - 1]);
        }

        if (!isNaN(pnaIndex)) {
            desiredIndices.push(pnaIndex);
            actualIndices.push(pnaJson[startingYear.toString()][month - 1]);
        }
        
        // Using cosine similarity to determine the % of the match between the desired and actual indices.
        let sumOfBothArraysMultiplied = desiredIndices.map(
            (enteredIndex, position) => enteredIndex * actualIndices[position]
        ).reduce((a, b) => a + b, 0);

        let sumOfDesiredIndicesSquared = desiredIndices.map(
            (enteredIndex) => enteredIndex ** 2
        ).reduce((a, b) => a + b, 0);

        let sumOfActualIndicesSquared = actualIndices.map(
            (enteredIndex) => enteredIndex ** 2
        ).reduce((a, b) => a + b, 0);

        let matchPercentage = sumOfBothArraysMultiplied / (sumOfDesiredIndicesSquared ** 0.5 * sumOfActualIndicesSquared ** 0.5) * 100;

        analogs.push([startingYear, month, matchPercentage, actualIndices]);
    }
}

const analogsSorted = analogs.sort(
    (a1, a2) => a2[2] - a1[2]
);
const bestAnalogs = analogsSorted.slice(0, 5);

// Define behaviors for pressing the x buttons on the modals
document.getElementById("snowfall-x-button").addEventListener("click", closeSnowfallModal);
document.getElementById("indices-x-button").addEventListener("click", closeIndicesModal);

// Display best analogs on screen
for (let idx = 0; idx < 5; idx++) {
    let currentAnalog = bestAnalogs[idx];
    let dateText = document.getElementById(`date-analog-${idx + 1}`);
    let matchText = document.getElementById(`match-analog-${idx + 1}`);
    let snowfallButton = document.getElementById(`snowfall-button-analog-${idx + 1}`);
    let indicesButton = document.getElementById(`indices-button-analog-${idx + 1}`);

    let matchPercentage = currentAnalog[2];

    // Set text of analogs to the corresponding date and match
    dateText.innerText = `${months[currentAnalog[1] - 1]} ${currentAnalog[0]}`;
    matchText.innerText = `${(Math.round(matchPercentage * 10) / 10).toFixed(1)}% Match`

    // Set color of text displaying match based on the match %
    if (matchPercentage >= 95) {
        matchText.classList.add("text-emerald-300");
    }
    else if (90 <= matchPercentage < 95) {
        matchText.classList.add("text-yellow-300");
    }
    else if (85 <= matchPercentage < 90) {
        matchText.classList.add("text-orange-300");
    }
    else if (matchPercentage < 85) {
        matchText.classList.add("text-red-300");
    }

    // Dynamically define the behavior of when you click the buttons
    snowfallButton.addEventListener("click", () => {
        showSnowfallModal(idx + 1)
    });
    indicesButton.addEventListener("click", () => {
        showIndicesModal(idx + 1)
    });
}