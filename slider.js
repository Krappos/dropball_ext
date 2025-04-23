////////////////////
//    Rydzovina   //
////////////////////

(function () {

    let slider = document.querySelector('.ytp-volume-panel');
    let ball = document.querySelector('.ytp-volume-slider-handle');
    
    
    //pre celý dokument
    //let dlzka = document.documentElement.scrollHeight;
    
    const volume = () => {
        const volumeNow = parseInt(slider.getAttribute("aria-valuenow"));

        if (volumeNow === 100) {
            ball.style.zIndex = "9999"; // alebo ešte vyššie ak treba
            console.log(volumeNow);
            ball.style.top = "100vh";
            ball.style.opacity="1";


        }
        else (
            ball.style.opacity="1",
            console.warn("overenie koudu")
        )

    };
    setInterval(volume, 200);
})
    ();