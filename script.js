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





});

function handleStart(){
    // Redirect to index.html
    window.location.href = "index.html";
}
