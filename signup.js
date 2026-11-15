
// ============================================
// FIA'O - REGISTRO DE USUARIOS
// ============================================

const form = document.getElementById("signupForm");
const message = document.getElementById("formMessage");
const submitButton = form.querySelector('button[type="submit"]');

// Identificadores reales de tu HTML
const fieldIds = [
    "fullname",
    "email",
    "phone",
    "business",
    "password",
    "confirm"
];

// Claves compartidas con login.js
const USERS_KEY = "fiao-users-v1";

// ============================================
// FUNCIONES AUXILIARES
// ============================================

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

function showError(id, text) {
    const input = document.getElementById(id);
    const error = input.parentElement.querySelector(".form__error");

    input.classList.toggle("invalid", Boolean(text));

    if (error) {
        error.textContent = text;
    }
}

function clearErrors() {
    fieldIds.forEach(id => showError(id, ""));

    message.textContent = "";
    message.className = "form__message";
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = "form__message " + type;
}

// ============================================
// VALIDAR FORMULARIO
// ============================================

function validateForm() {

    clearErrors();

    let valid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const phone = document.getElementById("phone").value.trim();
    const business = document.getElementById("business").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (fullname.length < 2) {
        showError("fullname", "Enter your full name.");
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        showError("email", "Enter a valid email.");
        valid = false;
    }

    const cleanPhone = phone.replace(/[\s()+.-]/g, "");

    if (!/^\d{7,15}$/.test(cleanPhone)) {
        showError("phone", "Enter a valid phone number.");
        valid = false;
    }

    if (business.length < 2) {
        showError("business", "Enter your business name.");
        valid = false;
    }

    if (password.length < 8) {
        showError("password", "Password must contain at least 8 characters.");
        valid = false;
    }

    if (password !== confirm || !confirm) {
        showError("confirm", "Passwords do not match.");
        valid = false;
    }

    return valid;
}

// ============================================
// REGISTRAR USUARIO
// ============================================

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!validateForm()) {
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";

    try {

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const business = document.getElementById("business").value.trim();
        const password = document.getElementById("password").value;

        const users = getUsers();

        // Comprobar si el correo ya está registrado
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            showError("email", "This email is already registered.");
            showMessage("An account with this email already exists.", "failure");
            return;
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now().toString(),
            fullname: fullname,
            email: email,
            phone: phone,
            business: business,
            passwordHash: await hashPassword(password),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        showMessage(
            "Account created successfully! Redirecting to login...",
            "success"
        );

        form.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to create account. Please try again.",
            "failure"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Create My Account";

    }

});

// ============================================
// LIMPIAR ERRORES AL ESCRIBIR
// ============================================

fieldIds.forEach(id => {

    const input = document.getElementById(id);

    input.addEventListener("input", () => {
        showError(id, "");
        message.textContent = "";
    });

});
