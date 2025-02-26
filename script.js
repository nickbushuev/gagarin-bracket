document.addEventListener("DOMContentLoaded", function() {
    const startScreen = document.getElementById("start-screen");
    const bracketScreen = document.getElementById("bracket-screen");
    const playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function() {
        startScreen.style.display = "none"; // Скрываем стартовый экран
        bracketScreen.style.display = "block"; // Показываем сетку плей-офф
    });
});