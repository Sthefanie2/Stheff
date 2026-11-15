
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // FIA'O - INICIO DE SESIÓN
    // =====================================

    const loginForm = document.getElementById("loginForm");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const captchaError = document.getElementById("captchaError");

    const captcha = document.getElementById("captcha");

    const forgotLink = document.getElementById("forgotLink");

    const USERS_KEY = "fiao-users-v1";
    const SESSION_KEY = "fiao-session-v1";

    // =====================================
    // FUNCIONES AUXILIARES
    // =====================================

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        } catch {
            return [];
        }
    }

    async function hashPassword(password) {

        const data = new TextEncoder().encode(password);

        const hash = await crypto.subtle.digest("SHA-256", data);

        return Array.from(new Uint8Array(hash))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    function clearErrors() {
        emailError.textContent = "";
        passwordError.textContent = "";
        captchaError.textContent = "";
    }

    function showNotification(text, type = "success") {

        let notification = document.getElementById("notification");

        if (!notification) {

            notification = document.createElement("div");

            notification.id = "notification";

            notification.style.padding = "12px";
            notification.style.marginTop = "15px";
            notification.style.borderRadius = "8px";
            notification.style.textAlign = "center";
            notification.style.fontSize = "14px";

            loginForm.appendChild(notification);
        }

        notification.textContent = text;

        notification.style.background =
            type === "error" ? "#fee2e2" : "#dcfce7";

        notification.style.color =
            type === "error" ? "#b91c1c" : "#166534";
    }

    // =====================================
    // INICIAR SESIÓN
    // =====================================

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        clearErrors();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        let valid = true;

        if (!email) {
            emailError.textContent = "Please enter your email.";
            valid = false;

        } else if (!validEmail(email)) {
            emailError.textContent = "Please enter a valid email.";
            valid = false;
        }

        if (!password) {
            passwordError.textContent = "Please enter your password.";
            valid = false;
        }

        if (!captcha.checked) {
            captchaError.textContent =
                "Please confirm that you are not a robot.";

            valid = false;
        }

        if (!valid) return;

        const button = loginForm.querySelector(".btn-login");

        button.disabled = true;
        button.textContent = "Checking...";

        try {

            // Recuperar usuarios registrados
            const users = getUsers();

            // Buscar el correo
            const user = users.find(item => item.email === email);

            if (!user) {

                showNotification(
                    "No account found with this email.",
                    "error"
                );

                return;
            }

            // Comprobar contraseña
            const passwordHash = await hashPassword(password);

            if (passwordHash !== user.passwordHash) {

                showNotification(
                    "Incorrect password. Please try again.",
                    "error"
                );

                return;
            }

            // Crear sesión sin guardar la contraseña
            const session = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                business: user.business,
                loginAt: new Date().toISOString()
            };

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(session)
            );

            showNotification(
                "Welcome, " + user.fullname + "! Redirecting...",
                "success"
            );

            // Cambia esta dirección si tu perfil tiene otro nombre
            setTimeout(() => {
                window.location.href = "profile.html";
            }, 1200);

        } catch (error) {

            console.error(error);

            showNotification(
                "An error occurred. Please try again.",
                "error"
            );

        } finally {

            button.disabled = false;
            button.textContent = "Log In";

        }

    });

    // =====================================
    // LIMPIAR ERRORES
    // =====================================

    emailInput.addEventListener("input", () => {
        emailError.textContent = "";
    });

    passwordInput.addEventListener("input", () => {
        passwordError.textContent = "";
    });

    captcha.addEventListener("change", () => {
        captchaError.textContent = "";
    });

    // =====================================
    // RECUPERAR CONTRASEÑA
    // =====================================

    forgotLink.addEventListener("click", function(event) {

        event.preventDefault();

        const loginCard = document.querySelector(".login__card");

        loginCard.innerHTML = `

            <h2 class="login__title">Reset Password</h2>

            <p class="login__subtitle">
                Enter your email to recover your account
            </p>

            <form id="resetForm">

                <div class="field">

                    <label for="resetEmail">Email</label>

                    <div class="input-box">

                        <input
                            type="email"
                            id="resetEmail"
                            placeholder="example@domain.com"
                            required
                        >

                    </div>

                    <small class="error" id="resetError"></small>

                </div>

                <button type="submit" class="btn-login">
                    Send Recovery Link
                </button>

                <p id="resetMessage"></p>

                <a href="#" id="backLogin" class="login__signup">
                    Back to Log In
                </a>

            </form>
        `;

        const resetForm = document.getElementById("resetForm");

        resetForm.addEventListener("submit", function(e) {

            e.preventDefault();

            const email = document.getElementById("resetEmail").value.trim();

            const user = getUsers().find(
                item => item.email === email.toLowerCase()
            );

            const error = document.getElementById("resetError");
            const result = document.getElementById("resetMessage");

            error.textContent = "";
            result.textContent = "";

            if (!validEmail(email)) {
                error.textContent = "Please enter a valid email.";
                return;
            }

            if (!user) {
                error.textContent = "No account found with this email.";
                return;
            }

            result.textContent =
                "Your account was found. Password recovery requires a secure email service.";

            result.style.color = "#166534";
            result.style.marginTop = "15px";

        });

        document.getElementById("backLogin").addEventListener("click", function(e) {
            e.preventDefault();
            location.reload();
        });

    });

    // =====================================
    // MOSTRAR / OCULTAR CONTRASEÑA
    // =====================================

    const passwordBox = passwordInput.parentElement;

    const togglePassword = document.createElement("span");

    togglePassword.textContent = "Show";
    togglePassword.style.cursor = "pointer";
    togglePassword.style.fontSize = "12px";
    togglePassword.style.marginLeft = "8px";
    togglePassword.style.color = "#b91c1c";

    passwordBox.appendChild(togglePassword);

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";

        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }

    });

});
