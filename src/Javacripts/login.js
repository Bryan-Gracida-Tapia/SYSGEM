<!-- Usuario Simulados -->
const users = [
    {
        username: "admin",
        password: "1234",
        role: "admin"
    },
    {
        username: "secretaria",
        password: "1234",
        role: "secretaria"
    },
    {
        username: "comunero",
        password: "1234",
        role: "comunero"
    }
];

<!-- Elementos -->
const form = document.getElementById("login-form");
const userInput = document.getElementById("input-user");
const passwordInput = document.getElementById("password-login");
const toggleBtn = document.getElementById("toggle-password");
const rememberCheck = document.getElementById("remember");

<!-- Mostrar / ocultar password -->
toggleBtn.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    toggleBtn.innerHTML = type === "text"
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';
});

<!-- Login -->
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = userInput.value.trim();
    const password = passwordInput.value.trim();

    // Validación básica
    if (!username || !password) {
        alert("Por favor, completa todos los campos");
        return;
    }

    // Buscar usuario
    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (!user) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    // Guardar sesión
    if (rememberCheck.checked) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    // Redirección según rol
    redirectByRole(user.role);
});

<!--Redireccion por rol -->
function redirectByRole(role) {
    switch (role) {
        case "admin":
            window.location.href = "Gestion_cargos.html";
            break;

        case "secretaria":
            window.location.href = "Gestión_de_anuncios.html";
            break;

        case "comunero":
            window.location.href = "User_Perfil.html";
            break;
        default:
            alert("Rol no reconocido");
    }
}

<!-- Demo -->
document.getElementById("btn-demo").addEventListener("click", () => {
    const demoUser = {
        username: "demo",
        role: "visitante"
    };

    sessionStorage.setItem("user", JSON.stringify(demoUser));
    redirectByRole("visitante");
});

<!-- Auto login -->
window.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedUser) {
        const user = JSON.parse(savedUser);
        redirectByRole(user.role);
    }
});