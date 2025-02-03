document.addEventListener("DOMContentLoaded", function () {
    const authScreen = document.getElementById("authScreen");
    const mainScreen = document.getElementById("mainScreen");
    const userInfo = document.getElementById("userInfo");
    const telegramLogin = document.getElementById("telegramLogin");
    const logoutBtn = document.getElementById("logoutBtn");

    // Проверка авторизации
    const telegramUser = JSON.parse(localStorage.getItem("telegramUser"));

    if (telegramUser) {
        showMainScreen(telegramUser);
    } else {
        showAuthScreen();
    }

    function showAuthScreen() {
        authScreen.classList.remove("hidden");
        mainScreen.classList.add("hidden");

        // Telegram Login Widget
        telegramLogin.innerHTML = `
            <script async src="https://telegram.org/js/telegram-widget.js?7"
                data-telegram-login="TestVapeMiracleBot"
                data-size="large"
                data-userpic="false"
                data-request-access="write"
                data-auth-url="javascript:handleTelegramLogin()">
            </script>`;
    }

    window.handleTelegramLogin = function () {
        const params = new URLSearchParams(window.location.search);
        const userData = {
            id: params.get("id"),
            first_name: params.get("first_name"),
            username: params.get("username"),
        };

        if (userData.id) {
            localStorage.setItem("telegramUser", JSON.stringify(userData));
            showMainScreen(userData);
        }
    };

    function showMainScreen(user) {
        authScreen.classList.add("hidden");
        mainScreen.classList.remove("hidden");

        userInfo.innerHTML = `👤 Вхід виконано: <b>${user.first_name}</b> (@${user.username || "немає ніку"})`;

        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("telegramUser");
            window.location.reload();
        });
    }
});
