
document.addEventListener("DOMContentLoaded", function() {


// Get all level buttons
const levelButtons = document.querySelectorAll(".level");
const categorySelect = document.getElementById("category");
const startButton = document.querySelector(".start");

// Add event listener for level selection
levelButtons.forEach(button => {
    button.addEventListener("click", function () {
        selectedLevel = this.id; // Get the ID of the clicked button
        console.log("Selected Level: ", selectedLevel); // Debugging log

    // Remove active class from all buttons and add to the selected one
    levelButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    });
});

// Add event listener for start button
startButton.addEventListener("click", function () {
selectedCategory = categorySelect.value;
console.log("Selected Level:", selectedLevel); // Debugging log
console.log("Selected Category:", selectedCategory); // Debugging log

if (selectedLevel && selectedCategory) {
    let targetPage = `${selectedLevel}${selectedCategory}.html`;
    console.log("Redirecting to:", targetPage); // Debugging log
    window.location.href = targetPage;
} else {
    alert("Please select both a level and a category before starting.");
}
})
});