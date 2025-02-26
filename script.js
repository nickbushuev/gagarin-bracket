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
                ["Ак Барс", "Авангард"],
                ["Салават Юлаев", "Металлург Мг"]
            ],
            "1/4": [],
            "Полуфиналы": [],
            "Финал": []
        };

        let currentRound = "1/8";
        renderMatches(currentRound);

        // Обработчик выбора раундов
        document.querySelectorAll(".round-button").forEach(button => {
            button.addEventListener("click", function () {
                currentRound = this.getAttribute("data-round");
                renderMatches(currentRound);
            });
        });

        // Функция отрисовки матчей
        function renderMatches(round) {
            matchesContainer.innerHTML = "";
            if (!teams[round]) return;

            teams[round].forEach(pair => {
                let matchDiv = document.createElement("div");
                matchDiv.classList.add("match");

                matchDiv.innerHTML = `
                    <span>${pair[0]}</span>
                    <input type="radio" name="${pair[0]}-${pair[1]}" value="${pair[0]}" required> 
                    <input type="radio" name="${pair[0]}-${pair[1]}" value="${pair[1]}" required> 
                    <span>${pair[1]}</span>
                    <input type="number" min="4" max="7" placeholder="Кол-во матчей" required>
                `;
                matchesContainer.appendChild(matchDiv);
            });
        }

        // Обработчик кнопки "Подтвердить прогноз"
        confirmButton.addEventListener("click", function () {
            let predictions = [];
            let isValid = true;

            document.querySelectorAll(".match").forEach(match => {
                let teams = match.querySelectorAll("span");
                let radios = match.querySelectorAll("input[type='radio']:checked");
                let gamesInput = match.querySelector("input[type='number']");

                if (radios.length === 0 || !gamesInput.value) {
                    isValid = false;
                } else {
                    predictions.push({
                        match: `${teams[0].innerText} vs ${teams[1].innerText}`,
                        winner: radios[0].value,
                        games: gamesInput.value
                    });
                }
            });

            if (!isValid) {
                alert("Выберите победителей и количество матчей!");
                return;
            }

            sendToGoogleSheets(predictions);
        });

        // Функция отправки данных в Google Sheets
        function sendToGoogleSheets(predictions) {
            const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
            const formData = new FormData();

            formData.append("predictions", JSON.stringify(predictions));

            fetch(scriptURL, { method: "POST", body: formData })
                .then(response => response.json())
                .then(data => {
                    alert("Прогноз успешно отправлен!");
                    console.log("Ответ сервера:", data);
                })
                .catch(error => {
                    alert("Ошибка при отправке данных!");
                    console.error("Ошибка:", error);
                });
        }
    }
});
