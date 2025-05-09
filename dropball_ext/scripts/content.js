function initVolumeWatcher() {
    const slider = document.querySelector('.ytp-volume-panel');
    const ball = document.querySelector('.ytp-volume-slider-handle');
    const muteButton = document.querySelector('.ytp-mute-button');



    let hasFallen = false;
    let fallCount = 0;
    let wasDragged = false;

    const ball_simult = createBallSimul();
    setupDragEvents(ball_simult);
    setupHoverDetection(ball_simult);
    setupHoverOverMuteButton(ball_simult);

    function createBallSimul() {
        const ballElement = document.createElement("div");
        ballElement.style.width = "10px";
        ballElement.style.height = "10px";
        ballElement.style.borderRadius = "50%";
        ballElement.style.background = "white";
        ballElement.style.position = "fixed";
        ballElement.style.zIndex = "99999";
        return ballElement;
    }

    function setupDragEvents(element) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        element.addEventListener("mousedown", (e) => {
            isDragging = true;
            wasDragged = false;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                wasDragged = true;
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            document.body.style.userSelect = "auto";
            if (wasDragged) {
                hasFallen = true;
            } else {
                hasFallen = false;
            }
        });
    }

    function setupHoverDetection(element) {
        element.addEventListener("mousemove", () => {
            const ballRect = element.getBoundingClientRect();
            const sliderRect = slider.getBoundingClientRect();

            const isHovering =
                ballRect.left < sliderRect.right &&
                ballRect.right > sliderRect.left &&
                ballRect.top < sliderRect.bottom &&
                ballRect.bottom > sliderRect.top;

            // Ak hoveruje nad sliderom, zobraz pôvodný ball
            if (isHovering) {
                ball.style.opacity = "1";
            } else {
                ball.style.opacity = "0";
            }
        });
    }

    function setupHoverOverMuteButton(element) {
        element.addEventListener("mousemove", () => {
            const ballRect = element.getBoundingClientRect();
            const muteRect = muteButton.getBoundingClientRect();

            const isHovering =
                ballRect.left < muteRect.right &&
                ballRect.right > muteRect.left &&
                ballRect.top < muteRect.bottom &&
                ballRect.bottom > muteRect.top;

            if (isHovering) {
                // Skryť simulovanú guličku a zobraziť originálnu
                element.style.display = "none";
                ball.style.opacity = "1";
            }
        });
    }

    let prevVolume = 0; // Globálna premenná pre predchádzajúcu hodnotu hlasitosti

    function checkVolumeAndDropBall() {
        const volumeNow = parseInt(slider.getAttribute("aria-valuenow"));
    
        // RESET ak sa hlasitosť zníži pod 100
        if (volumeNow < 100) {
            hasFallen = false;
        }
    
        // Spustenie animácie pri zvýšení na 100
        if (volumeNow === 100 && !hasFallen && prevVolume < 100) {
            hasFallen = true;
            fallCount++;
    
            const handlePos = ball.getBoundingClientRect();
            ball_simult.style.left = `${handlePos.left}px`;
            ball_simult.style.top = `${handlePos.top}px`;
            ball_simult.style.display = "block"; // Zviditeľnenie guličky, ak bola skrytá
    
            ball.style.opacity = "0"; // Skrytie pôvodnej guličky
    
            if (!document.body.contains(ball_simult)) {
                document.body.appendChild(ball_simult);
            }
    
            // Resetovanie animácie pri každom páde
            ball_simult.style.transition = "top 0s ease"; // Bez animácie pred pohybom
            ball_simult.offsetHeight; // Tento riadok zabezpečí, že sa animácia "prečíta" ako nová
    
            // Nastavenie animácie na pohyb
            requestAnimationFrame(() => {
                ball_simult.style.transition = fallCount === 1 ? "top 0.2s ease" : "top 0s ease";
    
                requestAnimationFrame(() => {
                    ball_simult.style.top = "99vh";
                });
            });
        }
    
        // Uložíme aktuálnu hodnotu hlasitosti pre porovnanie pri ďalšom zavolaní
        prevVolume = volumeNow;
    }
    


    setInterval(checkVolumeAndDropBall, 200);
}

initVolumeWatcher();
