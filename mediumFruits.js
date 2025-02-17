document.addEventListener("DOMContentLoaded", async function () {
    const namesContainer = document.getElementById("names");
    const imagesContainer = document.getElementById("images");

    // Load sounds
    const correctSound = new Audio("audio/correct.mp3");
    const wrongSound = new Audio("audio/wrong.mp3");

    try {
        const response = await fetch("data.json");
        const data = await response.json();
        const fruits = data.fruits.medium;
        
        let sanskritNames = [...fruits.sanskrit_names];
        let images = [...fruits.images];
        let pairs = { ...fruits.pairs };

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
            imgElement.classList.add("fruit-image");

            const messageElement = document.createElement("p");
            messageElement.classList.add("feedback");
            messageElement.textContent = ""; // Initially empty
            
            imgWrapper.appendChild(imgElement);
            imgWrapper.appendChild(messageElement);
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
            const feedback = dropzone.querySelector(".feedback");

            if (pairs[draggedName] === droppedImage) {
                dropzone.style.backgroundColor = "lightgreen";
                feedback.textContent = "✅ Correct!";
                feedback.style.color = "green";
                correctSound.play();  // Play correct answer sound
            } else {
                dropzone.style.backgroundColor = "lightcoral";
                feedback.textContent = "❌ Try Again!";
                feedback.style.color = "red";
                wrongSound.play();  // Play wrong answer sound
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
