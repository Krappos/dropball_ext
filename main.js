(function() {
    const panel = document.querySelector(".ytp-volume-panel");
    const handle = document.querySelector(".ytp-volume-slider-handle");

    if (!panel || !handle) {
        console.warn("Nenašiel som posuvník hlasitosti.");
        return;
    }

    const checkVolume = () => {
        const volumeNow = parseInt(panel.getAttribute("aria-valuenow"));
        if (volumeNow === 100) {
            handle.style.transition = "transform 0.6s ease, opacity 0.5s";
            handle.style.transform = "translateY(100vh) rotate(720deg)";
            handle.style.opacity = "0";
        } else {
            handle.style.transition = "";
            handle.style.transform = "";
            handle.style.opacity = "";
        }
    };
    setInterval(checkVolume, 200);
})();
