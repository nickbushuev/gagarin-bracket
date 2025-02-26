document.addEventListener("DOMContentLoaded", function () {
    console.log("Скрипт загружен");

    // Обработчик кнопки "Играть" (на стартовой странице)
    const playButton = document.getElementById("play-button");
    if (playButton) {
        playButton.addEventListener("click", function () {
            window.location.href = "bracket.html"; 
        });
    }

    // Логика для страницы плей-офф
    const matchesContainer = document.getElementById("matches-container");
    const confirmButton = document.getElementById("confirm-prediction");

    if (matchesContainer && confirmButton) {
        const teams = {
            "1/8": [
                ["Локомотив", "Торпедо"],
                ["Спартак", "СКА"],
                ["ЦСКА", "Динамо Мн"],
                ["Динамо М", "Северсталь"],
                ["Трактор", "Сибирь"],
                ["Автомобилист", "Адмирал"],
                ["Ак Барс", 
