(function () {
    let slider = document.querySelector('.ytp-volume-panel');
    let ball = document.querySelector('.ytp-volume-slider-handle');
    let hasFallen = false;
    let ball_simult = document.createElement("div");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    let dropped = false;

    const volume = () => {
        const volumeNow = parseInt(slider.getAttribute("aria-valuenow"));

        // ak čas ==100 percent spustí sa kod 
        if (volumeNow === 100 && !hasFallen) {
            hasFallen = true;

            const handle_poss = ball.getBoundingClientRect();

            ball_simult.style.width = "10px";
            ball_simult.style.height = "10px";
            ball_simult.style.borderRadius = "50%";
            ball_simult.style.background = "white";
            ball_simult.style.position = "fixed";
            ball_simult.style.left = handle_poss.left + "px";
            ball_simult.style.top = handle_poss.top + "px";
            ball_simult.style.zIndex = "99999";
            
            if(dropped == false ){
                ball_simult.style.transition = "top 0.2s ease";
            }

            else if(dropped== true){
                ball_simult.style.transition = "top 0s ease";
            }
            else{
                return;
            }
            ball.style.opacity = "0";

            
            ball_simult.addEventListener("mousedown", (e) => {
                dropped=true;
                isDragging = true;
                offsetX = e.clientX - ball_simult.offsetLeft;
                offsetY = e.clientY - ball_simult.offsetTop;
                document.body.style.userSelect = "none";
            });


            //pohyb myšou
            document.addEventListener("mousemove", (e) => {
                if (isDragging) {
                    ball_simult.style.left = `${e.clientX - offsetX}px`;
                    ball_simult.style.top = `${e.clientY - offsetY}px`;

                }
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
                document.body.style.userSelect = "auto";
            });

            document.body.appendChild(ball_simult);

            setTimeout(() => {
                ball_simult.style.top = "99vh";
            }, 100);
        }
    };

    setInterval(volume, 200);
})();
