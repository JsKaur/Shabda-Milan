document.addEventListener("DOMContentLoaded", function() {
    const carImages = document.querySelectorAll('.car-image');
    const roadImage = document.querySelector('.road-image');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const roadTop = roadImage.offsetTop;
        const roadHeight = roadImage.clientHeight;
        
        // Define visibility points based on the road image position
        const firstCarStart = roadTop;
        const secondCarStart = roadTop + roadHeight / 3;
        const thirdCarStart = roadTop + (2 * roadHeight) / 3;
        const endOfRoad = roadTop + roadHeight;

        // Handle first car visibility
        if (scrollPosition >= firstCarStart && scrollPosition < secondCarStart) {
            carImages[0].classList.add('visible');
            carImages[1].classList.remove('visible');
            carImages[2].classList.remove('visible');
        } 
        // Handle second car visibility
        else if (scrollPosition >= secondCarStart && scrollPosition < thirdCarStart) {
            carImages[0].classList.remove('visible');
            carImages[1].classList.add('visible');
            carImages[2].classList.remove('visible');
        } 
        // Handle third car visibility
        else if (scrollPosition >= thirdCarStart && scrollPosition < endOfRoad) {
            carImages[0].classList.remove('visible');
            carImages[1].classList.remove('visible');
            carImages[2].classList.add('visible');
        } 
        // Hide all cars after the road ends
        else {
            carImages[0].classList.remove('visible');
            carImages[1].classList.remove('visible');
            carImages[2].classList.remove('visible');
        }
    });

    // Initially show the first car
    carImages[0].classList.add('visible');



    let audio = document.getElementById("background-audio");

    // Play audio only after user clicks anywhere on the page
    // document.body.addEventListener("click", function () {
    //     if (audio.paused) {
    //         audio.play().catch(error => console.log("Autoplay blocked:", error));
    //     }
    // });

    audio.muted = false;
    let playPromise = audio.play();

    // Handle autoplay restrictions
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay blocked, waiting for user interaction.");
            // Add a click event to play when the user interacts
            document.body.addEventListener("click", function () {
                audio.play();
            }, { once: true });
        });
    }
});

function handleStart(){
    let audio = document.getElementById("background-audio");

    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }

    // Redirect to index.html
    window.location.href = "index.html";
}

document.body.addEventListener("click", function () {
    let audio = document.getElementById("background-audio");
    audio.muted = false;  // Unmute audio after user clicks
    audio.play();
});
