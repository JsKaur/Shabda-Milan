document.addEventListener("DOMContentLoaded", async function () {
    const namesContainer = document.getElementById("names");
    const imagesContainer = document.getElementById("images");

    // Load sounds
    const correctSound = new Audio("audio/correct.mp3");
    const wrongSound = new Audio("audio/wrong.mp3");

    // Timer setup
    const timerDisplay = document.createElement("div");
    timerDisplay.classList.add("timer");
    document.querySelector(".container").prepend(timerDisplay);

    let timeLeft = 60; // 60 seconds countdown
    let timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        if (timeLeft > 0) {
            timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            window.location.href = "Failure.html"; // Redirect on timeout
        }
    }

    try {
        const response = await fetch("data.json");
        const data = await response.json();
        const flowers = data.flowers.hard;
        
        let sanskritNames = [...flowers.sanskrit_names];
        let images = [...flowers.images];
        let pairs = { ...flowers.pairs };

        let correctMatches = 0;  // Counter for correct matches

        // Shuffle the names and images
        shuffleArray(sanskritNames);
        shuffleArray(images);

        // Create draggable name elements
        sanskritNames.forEach(name => {
            const nameElement = document.createElement("div");
            nameElement.classList.add("draggable");
            nameElement.textContent = name;
            nameElement.draggable = true;
            nameElement.dataset.name = name;
            nameElement.addEventListener("dragstart", dragStart);
            namesContainer.appendChild(nameElement);
        });

        // Create droppable image containers with feedback messages
        images.forEach(imgSrc => {
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("dropzone");
            imgWrapper.dataset.image = imgSrc;
            imgWrapper.addEventListener("dragover", dragOver);
            imgWrapper.addEventListener("drop", drop);
            
            const imgElement = document.createElement("img");
            imgElement.src = imgSrc;
            imgElement.classList.add("flowers-image");

            imgWrapper.appendChild(imgElement);
            imagesContainer.appendChild(imgWrapper);
        });

        function dragStart(event) {
            event.dataTransfer.setData("text", event.target.dataset.name);
        }

        function dragOver(event) {
            event.preventDefault();
        }

        function drop(event) {
            event.preventDefault();
            const draggedName = event.dataTransfer.getData("text");
            const dropzone = event.target.closest(".dropzone");
            const droppedImage = dropzone.dataset.image;

            if (pairs[draggedName] === droppedImage) {
                dropzone.style.backgroundColor = "lightgreen";
                correctSound.play();  
                correctMatches++; 
                checkCompletion();
            } else {
                dropzone.style.backgroundColor = "lightcoral";
                wrongSound.play();  
            }
        }

        function checkCompletion() {
            if (correctMatches === sanskritNames.length) {
                clearInterval(timerInterval); // Stop the timer when game is completed
                setTimeout(() => {
                    window.location.href = "Success.html"; // Redirect after all correct
                }, 1000);
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
});
