
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTOS DEL HTML
    // =====================================

    const loginForm = document.getElementById("loginForm");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const captchaError = document.getElementById("captchaError");

    const captcha = document.getElementById("captcha");

    const forgotLink = document.getElementById("forgotLink");
    const signupLink = document.getElementById("signupLink");

    // =====================================
    // FUNCIONES AUXILIARES
    // =====================================

    function showError(element, message) {
        element.textContent = message;
    }

    function clearErrors() {
        emailError.textContent = "";
        passwordError.textContent = "";
        captchaError.textContent = "";
    }

    function validEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showNotification(message, type = "success") {

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

        notification.textContent = message;

        notification.style.background =
            type === "error" ? "#fee2e2" : "#dcfce7";

        notification.style.color =
            type === "error" ? "#b91c1c" : "#166534";
    }

    // =====================================
    // VALIDACIÓN DEL LOGIN
    // =====================================

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let valid = true;

        // Validar correo

        if (email === "") {
            showError(emailError, "Please enter your email.");
            valid = false;

        } else if (!validEmail(email)) {
            showError(emailError, "Please enter a valid email.");
            valid = false;
        }

        // Validar contraseña

        if (password === "") {
            showError(passwordError, "Please enter your password.");
            valid = false;

        } else if (password.length < 6) {
            showError(passwordError, "Password must contain at least 6 characters.");
            valid = false;
        }

        // Validar CAPTCHA

        if (!captcha.checked) {
            showError(captchaError, "Please confirm that you are not a robot.");
            valid = false;
        }

        if (!valid) {
            return;
        }

        // Datos validados
        showNotification("Login information validated successfully!");

        console.log("Email:", email);

        // IMPORTANTE:
        // Aquí debes conectar tu backend para autenticar
        // al usuario y comprobar su contraseña.
    });


    // =====================================
    // LIMPIAR ERRORES AL ESCRIBIR
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
        const resetEmail = document.getElementById("resetEmail");
        const resetError = document.getElementById("resetError");
        const resetMessage = document.getElementById("resetMessage");

        // Enviar solicitud de recuperación

        resetForm.addEventListener("submit", function(e) {

            e.preventDefault();

            const email = resetEmail.value.trim();

            resetError.textContent = "";
            resetMessage.textContent = "";

            if (!validEmail(email)) {
                resetError.textContent = "Please enter a valid email.";
                return;
            }

            resetMessage.textContent =
                "If your account exists, you will receive instructions to reset your password.";

            resetMessage.style.color = "#166534";
            resetMessage.style.marginTop = "15px";

            console.log("Recovery requested for:", email);

            // Aquí debes conectar el servicio de recuperación
            // de contraseña de tu backend.
        });

        // Regresar al login

        document.getElementById("backLogin").addEventListener("click", function(e) {
            e.preventDefault();
            location.reload();
        });

    });


    // =====================================
    // REDIRECCIÓN A REGISTRO
    // =====================================

    signupLink.addEventListener("click", function(event) {

        // Permite que el enlace abra signup.html
        // No necesita ninguna acción adicional.

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
