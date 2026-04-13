<!-- Obetener usuario -->
function getUser() {
    return JSON.parse(
        localStorage.getItem("user") ||
        sessionStorage.getItem("user")
    );
}

<!-- Proteger rutas -->
function protectRoute() {
    const user = getUser();

    // Si NO hay usuario → redirigir
    if (!user) {
        window.location.href = "../interfaces/Login.html";
    }
}

<!-- Logout -->
function logout() {
    // Eliminar sesión
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    // Redirigir al login
    window.location.href = "../interfaces/Login.html";
}

<!-- Inicializar logout -->
function initLogout() {
    const btn = document.getElementById("btn-logout");

    if (btn) {
        btn.addEventListener("click", () => {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            window.location.href = "../interfaces/Login.html";
        });
    }
}

<!-- Mostrar usuario -->
function renderUser() {
    const user = getUser();

    if (!user) return;

    const userNameElement = document.getElementById("user-name");

    if (userNameElement) {
        userNameElement.textContent = user.username || "Usuario";
    }
}

<!-- Buscador -->
function initSearch() {
    const searchBtn = document.getElementById("search-btn");

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const value = document.getElementById("search-main")?.value;
            console.log("Buscar:", value);
        });
    }
}

<!-- Inicializacion global -->
document.addEventListener("DOMContentLoaded", () => {

    // ⚠️ NO proteger login
    const isLoginPage = window.location.pathname.includes("Login.html");

    if (!isLoginPage) {
        protectRoute();
    }

    // Inicializar funciones globales
    initLogout();
    renderUser();
    initSearch();
});