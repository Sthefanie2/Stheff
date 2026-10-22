
const form = document.getElementById("signupForm");
const message = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

document.getElementById("year").textContent =
    new Date().getFullYear();

// IDs of the form fields
const fieldIds = [
    "fullName",
    "email",
    "phone",
    "businessName",
    "password",
    "confirmPassword"
];

// Show an error under a field
function setError(id, text) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");

    input.classList.toggle("invalid", Boolean(text));
    error.textContent = text;
}

// Clear all previous errors
function clearErrors() {
    fieldIds.forEach(id => setError(id, ""));

    document.getElementById("termsError").textContent = "";

    message.textContent = "";
    message.className = "form-message";
}

// Validate all form fields
function validateForm() {
    clearErrors();

    let valid = true;

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const businessName =
        document.getElementById("businessName").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const terms =
        document.getElementById("terms").checked;

    // Full name
    if (fullName.length < 2) {
        setError(
            "fullName",
            "Enter your full name (at least 2 characters)."
        );
        valid = false;
    }

    // Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
        setError("email", "Enter a valid email address.");
        valid = false;
    }

    // Phone number
    const cleanPhone = phone.replace(/[\s()+.-]/g, "");

    if (!/^\d{7,15}$/.test(cleanPhone)) {
        setError(
            "phone",
            "Enter a valid phone number with 7 to 15 digits."
        );
        valid = false;
    }

    // Business name
    if (businessName.length < 2) {
        setError(
            "businessName",
            "Enter your business name."
        );
        valid = false;
    }

    // Password length
    if (password.length < 8) {
        setError(
            "password",
            "Your password must contain at least 8 characters."
        );
        valid = false;
    }

    // Confirm password
    if (!confirmPassword || password !== confirmPassword) {
        setError(
            "confirmPassword",
            "Passwords do not match."
        );
        valid = false;
    }

    // Terms and conditions
    if (!terms) {
        document.getElementById("termsError").textContent =
            "Please accept the terms to continue.";

        valid = false;
    }

    // Show general error
    if (!valid) {
        message.textContent =
            "Please review the highlighted fields.";

        message.className = "form-message failure";
    }

    return valid;
}

// Submit form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) {
        const firstInvalid = form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    // Demonstration only: no account is actually created.
    submitButton.disabled = true;
    submitButton.textContent = "Checking details...";

    window.setTimeout(function() {
        message.textContent =
            "Validation successful! Connect a secure server to create your account.";

        message.className = "form-message success";

        submitButton.disabled = false;
        submitButton.textContent = "Create My Account";
    }, 500);
});

// Remove a field's error while the user types
fieldIds.forEach(function(id) {
    const input = document.getElementById(id);

    input.addEventListener("input", function() {
        input.classList.remove("invalid");

        const error = document.getElementById(id + "Error");
        error.textContent = "";

        message.textContent = "";
        message.className = "form-message";
    });
});

// Clear the terms error when checked
document.getElementById("terms").addEventListener(
    "change",
    function() {
        document.getElementById("termsError").textContent = "";
    }
);

// Show or hide passwords
document.querySelectorAll(".toggle-password").forEach(
    function(button) {
        button.addEventListener("click", function() {
            const input = document.getElementById(
                button.dataset.target
            );

            if (input.type === "password") {
                input.type = "text";
                button.textContent = "Hide";
            } else {
                input.type = "password";
                button.textContent = "Show";
            }
        });
    }
);

// Mobile navigation
menuToggle.addEventListener("click", function() {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

// Navigation button behavior
document.querySelectorAll(".nav-button").forEach(
    function(link) {
        link.addEventListener("click", function() {
            document.querySelectorAll(".nav-button").forEach(
                function(button) {
                    button.classList.remove("active");
                }
            );

            link.classList.add("active");

            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

            const destination = link.getAttribute("href");

            if (destination !== "#home") {
                message.textContent =
                    link.textContent +
                    " is a navigation placeholder. Its page still needs to be created.";

                message.className = "form-message";
            } else {
                message.textContent = "";
                message.className = "form-message";
            }
        });
    }
);

// Sign-in placeholder
document.getElementById("loginLink").addEventListener(
    "click",
    function(event) {
        event.preventDefault();

        message.textContent =
            "The sign-in page has not been created yet.";

        message.className = "form-message";
    }
);
