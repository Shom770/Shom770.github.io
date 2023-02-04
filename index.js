var analogData = JSON.parse(localStorage.getItem("analogData"));
localStorage.removeItem("analogData");

function showSnowfallModal() {
    let fadedBackground = document.getElementById("gray-bg");
    let snowfallModal = document.getElementById("snowfall-modal");
    // Pause old animations
    fadedBackground.style.webkitAnimationPlayState = "paused";
    snowfallModal.style.webkitAnimationPlayState = "paused";
    // Display gray background
    snowfallModal.style.webkitAnimationPlayState = "running";
    fadedBackground.style.display = "block";
    // Show modal
    snowfallModal.style.display = "block";
}

function closeSnowfallModal() {
    let fadedBackground = document.getElementById("gray-bg");
    let snowfallModal = document.getElementById("snowfall-modal");
    // Pause old animations
    fadedBackground.style.webkitAnimationPlayState = "paused";
    snowfallModal.style.webkitAnimationPlayState = "paused";
    // Close gray background
    fadedBackground.style.webkitAnimationPlayState = "running";
    fadedBackground.style.display = "none";
    // Close modal
    snowfallModal.style.display = "none";
}

function showIndicesModal() {
    let fadedBackground = document.getElementById("gray-bg");
    let indicesModal = document.getElementById("indices-modal");
    // Pause old animations
    fadedBackground.style.webkitAnimationPlayState = "paused";
    indicesModal.style.webkitAnimationPlayState = "paused";
    // Display gray background
    indicesModal.style.webkitAnimationPlayState = "running";
    fadedBackground.style.display = "block";
    // Show modal
    indicesModal.style.display = "block";
}

function closeIndicesModal() {
    let fadedBackground = document.getElementById("gray-bg");
    let indicesModal = document.getElementById("indices-modal");
    // Pause old animations
    fadedBackground.style.webkitAnimationPlayState = "paused";
    indicesModal.style.webkitAnimationPlayState = "paused";
    // Close gray background
    fadedBackground.style.webkitAnimationPlayState = "running";
    fadedBackground.style.display = "none";
    // Close modal
    indicesModal.style.display = "none";
}
