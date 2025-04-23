(function () {
    let slider = document.querySelector('.ytp-volume-panel');
    let ball = document.querySelector('.ytp-volume-slider-handle');
    let hasFallen = false;

    const volume = () => {
        const volumeNow = parseInt(slider.getAttribute("aria-valuenow"));

        if (volumeNow === 100 && !hasFallen) {
            hasFallen = true;

            const handle_poss = ball.getBoundingClientRect();
            let ball_simult = document.createElement("div");
            ball.style.opacity="0";
            ball_simult.style.width = "20px";
            ball_simult.style.height = "20px";
            ball_simult.style.borderRadius = "50%";
            ball_simult.style.background = "white";
            ball_simult.style.position = "fixed";
            ball_simult.style.left = handle_poss.left + "px";
            ball_simult.style.top = handle_poss.top + "px";
            ball_simult.style.zIndex = "99999";
            ball_simult.style.transition = "top 0.2s ease";

            document.body.appendChild(ball_simult);

            setTimeout(() => {
                ball_simult.style.top = "100vh";
            }, 500);
        } else {
            ball.style.opacity = "1";
        }
    };

    setInterval(volume, 200);
})();
