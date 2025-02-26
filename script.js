document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.getElementById("start-screen");
    const bracketScreen = document.getElementById("bracket-screen");
    const playButton = document.getElementById("play-button");
    const confirmButton = document.getElementById("confirm-prediction");
    const rounds = document.querySelectorAll(".round-button");
    const matchesContainer = document.getElementById("matches-container");

    let currentRound = "16";
    let predictions = {};

    playButton.addEventListener("click", function () {
        startScreen.classList.remove("visible");
        bracketScreen.classList.add("visible");
    });

    rounds.forEach(button => {
        button.addEventListener("click", function () {
            currentRound = this.dataset.round;
            updateRoundView();
        });
    });

    function updateRoundView() {
        rounds.forEach(btn => btn.classList.remove("active"));
        document.querySelector(`.round-button[data-round="${currentRound}"]`).classList.add("active");
        
        matchesContainer.innerHTML = "";
        let matchups = getMatchups(currentRound);
        
        matchups.forEach(match => {
            const matchDiv = document.createElement("div");
            matchDiv.classList.add("match");

            matchDiv.innerHTML = `
                <img src="images/${match.team1.logo}" alt="${match.team1.name}">
                <span>${match.team1.name}</span>
                <input type="radio" name="match-${match.id}" value="${match.team1.name}" class="winner-select">
                
                <input type="number" min="4" max="7" placeholder="4-7" class="match-score">
                
                <input type="radio" name="match-${match.id}" value="${match.team2.name}" class="winner-select">
                <span>${match.team2.name}</span>
                <img src="images/${match.team2.logo}" alt="${match.team2.name}">
            `;

            matchDiv.querySelectorAll(".winner-select").forEach(input => {
                input.addEventListener("change", function () {
                    const scoreInput = matchDiv.querySelector(".match-score");
                    if (!scoreInput.value) {
                        scoreInput.classList.remove("valid");
                        scoreInput.classList.add("invalid");
                    }
                });
            });

            matchDiv.querySelector(".match-score").addEventListener("input", function () {
                if (this.value >= 4 && this.value <= 7) {
                    this.classList.add("valid");
                    this.classList.remove("invalid");
                } else {
                    this.classList.remove("valid");
                    this.classList.add("invalid");
                }
            });

            matchesContainer.appendChild(matchDiv);
        });
    }

    function getMatchups(round) {
        const matchups = {
            "16": [
                { id: 1, team1: { name: "Локомотив", logo: "lokomotiv.png" }, team2: { name: "Торпедо", logo: "torpedo.png" } },
                { id: 2, team1: { name: "Спартак", logo: "spartak.png" }, team2: { name: "СКА", logo: "ska.png" } },
                { id: 3, team1: { name: "ЦСКА", logo: "cska.png" }, team2: { name: "Динамо Мн", logo: "dynamo_mn.png" } },
                { id: 4, team1: { name: "Динамо М", logo: "dynamo_m.png" }, team2: { name: "Северсталь", logo: "severstal.png" } },
                { id: 5, team1: { name: "Трактор", logo: "traktor.png" }, team2: { name: "Сибирь", logo: "sibir.png" } },
                { id: 6, team1: { name: "Автомобилист", logo: "avtomobilist.png" }, team2: { name: "Адмирал", logo: "admiral.png" } },
                { id: 7, team1: { name: "Ак Барс", logo: "akbars.png" }, team2: { name: "Авангард", logo: "avangard.png" } },
                { id: 8, team1: { name: "Салават Юлаев", logo: "salavat.png" }, team2: { name: "Металлург Мг", logo: "metallurg.png" } }
            ]
        };

        return matchups[round] || [];
    }

    confirmButton.addEventListener("click", function () {
        alert("Ваш прогноз сохранен!");
    });

    updateRoundView();
});
