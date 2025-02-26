document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");
    const startScreen = document.getElementById("start-screen");
    const bracketScreen = document.getElementById("bracket-screen");
    const matchesContainer = document.getElementById("matches-container");
    const confirmButton = document.getElementById("confirm-prediction");
    
    let predictions = [];
    
    playButton.addEventListener("click", function () {
        startScreen.classList.add("hidden");
        bracketScreen.classList.remove("hidden");
        loadMatches(16);
    });
    
    function loadMatches(round) {
        matchesContainer.innerHTML = "";
        let matches = getMatches(round);
        matches.forEach(match => {
            let matchDiv = document.createElement("div");
            matchDiv.classList.add("match");
            matchDiv.innerHTML = `
                <div class="team" data-team="${match.team1}">
                    <img src="logos/${match.team1}.png" alt="${match.team1}">
                    <span>${match.team1}</span>
                    <input type="radio" name="match-${match.id}" value="${match.team1}">
                </div>
                <div class="team" data-team="${match.team2}">
                    <img src="logos/${match.team2}.png" alt="${match.team2}">
                    <span>${match.team2}</span>
                    <input type="radio" name="match-${match.id}" value="${match.team2}">
                </div>
                <input type="number" class="score-input" placeholder="В скольких матчах?" min="4" max="7">
            `;
            matchesContainer.appendChild(matchDiv);
        });
    }
    
    function getMatches(round) {
        // Здесь можно динамически формировать пары для каждого раунда
        let matches = [];
        if (round === 16) {
            matches = [
                { id: 1, team1: "Локомотив", team2: "Торпедо" },
                { id: 2, team1: "Спартак", team2: "СКА" },
                { id: 3, team1: "ЦСКА", team2: "Динамо Мн" },
                { id: 4, team1: "Динамо М", team2: "Северсталь" },
                { id: 5, team1: "Трактор", team2: "Сибирь" },
                { id: 6, team1: "Автомобилист", team2: "Адмирал" },
                { id: 7, team1: "Ак Барс", team2: "Авангард" },
                { id: 8, team1: "Салават Юлаев", team2: "Металлург Мг" }
            ];
        }
        return matches;
    }
    
    confirmButton.addEventListener("click", function () {
        let selectedMatches = document.querySelectorAll(".match");
        predictions = [];
        selectedMatches.forEach(match => {
            let selectedTeam = match.querySelector("input[type=radio]:checked");
            let score = match.querySelector(".score-input").value;
            if (selectedTeam && score >= 4 && score <= 7) {
                predictions.push({
                    team1: match.querySelector(".team:first-child span").innerText,
                    team2: match.querySelector(".team:last-child span").innerText,
                    winner: selectedTeam.value,
                    seriesScore: score
                });
            }
        });
        if (predictions.length === 8) {
            sendToGoogleSheets(predictions);
            alert("Прогноз успешно отправлен!");
        } else {
            alert("Выберите победителей всех пар и укажите количество матчей (от 4 до 7)");
        }
    });
    
    function sendToGoogleSheets(data) {
        let url = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // Укажите свой Google Apps Script URL
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ predictions: data })
        })
        .then(response => response.json())
        .then(result => console.log("Отправлено: ", result))
        .catch(error => console.error("Ошибка отправки: ", error));
    }
});
