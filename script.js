document.addEventListener("DOMContentLoaded", function () {
    const authScreen = document.getElementById("authScreen");
    const mainScreen = document.getElementById("mainScreen");
    const userInfo = document.getElementById("userInfo");
    const logoutBtn = document.getElementById("logoutBtn");

    function checkAuth() {
        setTimeout(() => {
            const telegramUser = JSON.parse(localStorage.getItem("telegramUser"));

            if (telegramUser) {
                showMainScreen(telegramUser);
            } else {
                showAuthScreen();
            }
        }, 500); // Даем браузеру 500 мс на загрузку localStorage
    }

    function showAuthScreen() {
        authScreen.classList.remove("hidden");
        mainScreen.classList.add("hidden");
    }

    function showMainScreen(user) {
        authScreen.classList.add("hidden");
        mainScreen.classList.remove("hidden");

        userInfo.innerHTML = `👤 Вхід виконано: <b>${user.first_name}</b> (@${user.username || "немає ніку"})`;

        logoutBtn.onclick = function () {
            localStorage.removeItem("telegramUser");
            window.location.reload();
        };
    }

    checkAuth();
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Проверяем sessionStorage:", sessionStorage.getItem("telegramUser"));
    const telegramUser = JSON.parse(sessionStorage.getItem("telegramUser"));

    if (telegramUser) {
        document.getElementById("authScreen").classList.add("hidden");
        document.getElementById("mainScreen").classList.remove("hidden");
        document.getElementById("userInfo").innerHTML =
            `👤 Вхід виконано: <b>${telegramUser.first_name}</b> (@${telegramUser.username || "немає ніку"})`;
    } else {
        document.getElementById("authScreen").classList.remove("hidden");
        document.getElementById("mainScreen").classList.add("hidden");
    }
});
