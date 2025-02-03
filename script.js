document.addEventListener("DOMContentLoaded", function () {
    const authScreen = document.getElementById("authScreen");
    const mainScreen = document.getElementById("mainScreen");
    const userInfo = document.getElementById("userInfo");
    const logoutBtn = document.getElementById("logoutBtn");

    // Проверяем, есть ли пользователь в localStorage
    const telegramUser = JSON.parse(localStorage.getItem("telegramUser"));

    if (telegramUser) {
        showMainScreen(telegramUser);
    }

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
