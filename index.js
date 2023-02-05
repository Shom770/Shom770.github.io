import naoJson from './teleconnections_data/nao_values.json' assert {type: 'json'};
import aoJson from './teleconnections_data/ao_values.json' assert {type: 'json'};
import epoJson from './teleconnections_data/epo_values.json' assert {type: 'json'};
import pnaJson from './teleconnections_data/pna_values.json' assert {type: 'json'};

const analogData = JSON.parse(localStorage.getItem("analogData"));

if (analogData == null) {
    alert("It looks like you didn't select a value for any of the indices. In order to find an analog, we need at least ONE index filled out.")
}

const naoIndex = null ? analogData["naoIndex"] === "" : parseFloat(analogData["naoIndex"]);
const aoIndex = null ? analogData["aoIndex"] === "" : parseFloat(analogData["aoIndex"]);
const epoIndex = null ? analogData["epoIndex"] === "" : parseFloat(analogData["epoIndex"]);
const pnaIndex = null ? analogData["pnaIndex"] === "" : parseFloat(analogData["pnaIndex"]);
const stationCode = null ? analogData["stationCode"] === "" : analogData["stationCode"];

localStorage.removeItem("analogData");

console.log(Object.keys(naoJson).length, Object.keys(aoJson).length, Object.keys(epoJson).length, Object.keys(pnaJson).length);
// Calculate all analogs

function showSnowfallModal() {
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

function showIndicesModal() {
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
