document.addEventListener("DOMContentLoaded", function() {
    const exchangeBtn = document.getElementById("exchangeBtn");
    const sellBuyBtn = document.getElementById("sellBuyBtn");
    const formScreenExchange = document.getElementById("formScreenExchange");
    const formScreenSellBuy = document.getElementById("formScreenSellBuy");
    const startScreen = document.getElementById("startScreen");
    const successMessage = document.getElementById("successMessage");

    const homeBtnExchange = document.getElementById("homeBtnExchange");
    const homeBtnSellBuy = document.getElementById("homeBtnSellBuy");

    const submitExchangeBtn = document.getElementById("submitExchangeBtn");
    const submitSellBuyBtn = document.getElementById("submitSellBuyBtn");

    const historyList = document.getElementById("historyList");
    const popup = document.getElementById("popup");
    const popupDetails = document.getElementById("popupDetails");
    const closePopupBtn = document.getElementById("closePopupBtn");

    function changeScreen(activeScreen) {
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active");
            screen.classList.add("hidden");
        });
        activeScreen.classList.add("active");
        activeScreen.classList.remove("hidden");
    }

    exchangeBtn.addEventListener("click", () => changeScreen(formScreenExchange));
    sellBuyBtn.addEventListener("click", () => changeScreen(formScreenSellBuy));
    homeBtnExchange.addEventListener("click", () => changeScreen(startScreen));
    homeBtnSellBuy.addEventListener("click", () => changeScreen(startScreen));

    function setupForm(inputs, submitBtn) {
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                const allFilled = inputs.every(input => input.value.trim() !== "");
                submitBtn.disabled = !allFilled;
                if (allFilled) {
                    submitBtn.classList.add("btn-glow");
                } else {
                    submitBtn.classList.remove("btn-glow");
                }
            });
        });
    }

    setupForm(
        [document.getElementById("itemDescription"), document.getElementById("itemExchange"), document.getElementById("itemContact")],
        submitExchangeBtn
    );

    setupForm(
        [document.getElementById("itemSellDescription"), document.getElementById("itemSellContact")],
        submitSellBuyBtn
    );

    let history = JSON.parse(localStorage.getItem("history")) || [];

    function updateHistoryList() {
        historyList.innerHTML = history
            .map(
                (entry, index) =>
                    `<li data-index="${index}">${entry.date} | ${entry.type}</li>`
            )
            .join("");
    }

    function saveToHistory(type, details) {
        const date = new Date().toLocaleDateString();
        history.push({ date, type, details });
        localStorage.setItem("history", JSON.stringify(history));
        updateHistoryList();
    }

    historyList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index !== undefined) {
            const entry = history[index];
            popupDetails.innerHTML = `
                <strong>${entry.type}</strong><br><br>
                ${entry.details}`;
            popup.classList.remove("hidden");
        }
    });

    closePopupBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    submitExchangeBtn.addEventListener("click", () => {
        const details = `
<b>Опис:</b> ${document.getElementById("itemDescription").value}
<b>На що міняєте:</b> ${document.getElementById("itemExchange").value}
<b>З ким (@нік):</b> ${document.getElementById("itemContact").value}`;

        sendToTelegram("Обмін", details);
        saveToHistory("Обмін", details);
        changeScreen(successMessage);
    });

    submitSellBuyBtn.addEventListener("click", () => {
        const details = `
<b>Опис:</b> ${document.getElementById("itemSellDescription").value}
<b>З ким (@нік):</b> ${document.getElementById("itemSellContact").value}`;

        sendToTelegram("Купити/Продати", details);
        saveToHistory("Купити/Продати", details);
        changeScreen(successMessage);
    });

    updateHistoryList();

    const userInfo = document.getElementById("userInfo");
    const telegramUser = JSON.parse(localStorage.getItem("telegramUser"));

    if (telegramUser) {
        userInfo.innerHTML = `👤 Вход выполнен: <b>${telegramUser.first_name}</b>`;
        userInfo.classList.remove("hidden");
    } else {
        console.log("Пользователь не вошел через Telegram.");
    }
});
