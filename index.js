import naoJson from './teleconnections_data/nao_values.json' assert {type: 'json'};

const analogData = JSON.parse(localStorage.getItem("analogData"));

const naoIndex = null ? analogData["naoIndex"] === "" : parseFloat(analogData["naoIndex"]);
const aoIndex = null ? analogData["aoIndex"] === "" : parseFloat(analogData["aoIndex"]);
const epoIndex = null ? analogData["epoIndex"] === "" : parseFloat(analogData["epoIndex"]);
const pnaIndex = null ? analogData["pnaIndex"] === "" : parseFloat(analogData["pnaIndex"]);

localStorage.removeItem("analogData");

console.log(naoJson);
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
