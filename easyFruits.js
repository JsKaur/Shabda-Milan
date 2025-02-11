
// Function to shuffle an array (using Fisher-Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to load the game data from JSON and populate the page
function loadGameData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const fruitsData = data.fruits.easy;
            
            // Shuffle both Sanskrit names and images
            let shuffledNames = [...fruitsData.sanskrit_names];
            let shuffledImages = [...fruitsData.images];
            
            shuffle(shuffledNames);
            shuffle(shuffledImages);
            
            // Get elements to insert content
            const namesContainer = document.getElementById('names');
            const imagesContainer = document.getElementById('images');
            
            // Clear previous content
            namesContainer.innerHTML = '';
            imagesContainer.innerHTML = '';
            
            // Create Sanskrit names with dots
            shuffledNames.forEach((name, index) => {
                const nameItem = document.createElement('div');
                nameItem.classList.add('name-item');
                
                const nameText = document.createElement('span');
                nameText.textContent = name;
                
                const dots = document.createElement('span');
                dots.classList.add('dots');
                
                nameItem.appendChild(nameText);
                nameItem.appendChild(dots);
                
                namesContainer.appendChild(nameItem);
            });
            
            // Create images with dots
            shuffledImages.forEach((image, index) => {
                const imgItem = document.createElement('div');
                imgItem.classList.add('image-item');
                
                const dots = document.createElement('span');
                dots.classList.add('dots');
                
                const img = document.createElement('img');
                img.src = image;
                img.alt = 'Fruit Image';
                
                imgItem.appendChild(dots);
                imgItem.appendChild(img);
                
                imagesContainer.appendChild(imgItem);
            });
        })
        .catch(error => console.error('Error loading game data:', error));
}

// Call the function to load the game data when the page is ready
window.onload = loadGameData;
