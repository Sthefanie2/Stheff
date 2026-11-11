
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. IDENTIFICAR USUARIO
    // =====================================

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    let userName = currentUser.name || "User";
    let businessName = currentUser.business || "My Business";

    const $ = id => document.getElementById(id);


    // =====================================
    // 2. MOSTRAR NOMBRE DEL USUARIO
    // =====================================

    function updateProfile() {

        $("userName").textContent = userName;
        $("profileName").textContent = userName;
        $("dropdownName").textContent = userName;
        $("businessName").textContent = businessName;

        $("avatarLetter").textContent =
            userName.charAt(0).toUpperCase();

    }

    updateProfile();


    // =====================================
    // 3. MENU DEL PERFIL
    // =====================================

    const profileButton = $("profileButton");
    const profileDropdown = $("profileDropdown");

    profileButton.addEventListener("click", event => {

        event.stopPropagation();

        profileDropdown.classList.toggle("show");

    });

    document.addEventListener("click", event => {

        if (
            !profileDropdown.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            profileDropdown.classList.remove("show");

        }

    });


    // =====================================
    // 4. EDITAR PERFIL Y CONFIGURACIONES
    // =====================================

    let language = localStorage.getItem("fiaLanguage") || "en";

    document.querySelectorAll("[data-action]").forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            switch (action) {

                // MY PROFILE

                case "profile":

                    alert(
                        "MY PROFILE\n\n" +
                        "Name: " + userName + "\n" +
                        "Email: " + (currentUser.email || "") +
                        "\nBusiness: " + businessName
                    );

                    break;


                // EDIT PROFILE

                case "edit": {

                    const newName = prompt(
                        "Enter your full name:",
                        userName
                    );

                    if (newName && newName.trim()) {

                        userName = newName.trim();
                        currentUser.name = userName;

                        saveUser();
                        updateProfile();

                    }

                    break;
                }


                // CHANGE PICTURE

                case "picture":

                    $("pictureInput").click();

                    break;


                // DARK MODE

                case "theme":

                    document.body.classList.toggle("dark");

                    localStorage.setItem(
                        "fiaTheme",
                        document.body.classList.contains("dark")
                            ? "dark"
                            : "light"
                    );

                    break;


                // LANGUAGE

                case "language":

                    language = language === "en" ? "es" : "en";

                    localStorage.setItem("fiaLanguage", language);

                    applyLanguage();

                    break;


                // NOTIFICATIONS

                case "notifications":

                    alert(
                        language === "en"
                            ? "You have no new notifications."
                            : "No tienes notificaciones nuevas."
                    );

                    break;


                // SETTINGS

                case "settings": {

                    const newBusiness = prompt(
                        "Enter your business name:",
                        businessName
                    );

                    if (newBusiness && newBusiness.trim()) {

                        businessName = newBusiness.trim();

                        currentUser.business = businessName;

                        saveUser();
                        updateProfile();

                    }

                    break;
                }


                // LOG OUT

                case "logout": {

                    const confirmLogout = confirm(
                        language === "en"
                            ? "Are you sure you want to log out?"
                            : "¿Estás seguro de que deseas cerrar sesión?"
                    );

                    if (confirmLogout) {

                        localStorage.removeItem("currentUser");

                        window.location.href = "index.html";

                    }

                    break;
                }

            }

            profileDropdown.classList.remove("show");

        });

    });


    // SAVE USER DATA

    function saveUser() {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

    }


    // =====================================
    // 5. PROFILE PICTURE
    // =====================================

    const pictureInput = $("pictureInput");

    const photoKey = "fiaPhoto_" + currentUser.email;

    function displayPhoto(photo) {

        $("avatar").innerHTML = "";

        const img = document.createElement("img");

        img.src = photo;
        img.alt = "Profile picture";

        $("avatar").appendChild(img);

    }

    const savedPhoto = localStorage.getItem(photoKey);

    if (savedPhoto) {

        displayPhoto(savedPhoto);

    }

    pictureInput.addEventListener("change", () => {

        const file = pictureInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image.");
            return;

        }

        if (file.size > 1024 * 1024) {

            alert("Image must be smaller than 1 MB.");
            pictureInput.value = "";
            return;

        }

        const reader = new FileReader();

        reader.onload = event => {

            try {

                localStorage.setItem(
                    photoKey,
                    event.target.result
                );

                displayPhoto(event.target.result);

            } catch (error) {

                alert("Unable to save this picture.");

            }

        };

        reader.readAsDataURL(file);

    });


    // =====================================
    // 6. DARK MODE
    // =====================================

    if (localStorage.getItem("fiaTheme") === "dark") {

        document.body.classList.add("dark");

    }


    // =====================================
    // 7. LANGUAGE ENGLISH / SPANISH
    // =====================================

    function applyLanguage() {

        document.querySelectorAll("[data-en]").forEach(element => {

            element.textContent = element.dataset[language];

        });

        $("languageLabel").textContent =
            language === "en"
                ? "Language (EN/ES)"
                : "Idioma (EN/ES)";

        $("chatInput").placeholder =
            language === "en"
                ? "Write a message..."
                : "Escribe un mensaje...";

        document.documentElement.lang = language;

    }

    applyLanguage();


    // =====================================
    // 8. CHAT OPEN / CLOSE
    // =====================================

    const chatButton = $("chatButton");
    const chatWindow = $("chatWindow");

    chatButton.addEventListener("click", () => {

        chatWindow.classList.toggle("show");

        if (chatWindow.classList.contains("show")) {

            $("chatInput").focus();

        }

    });


    // =====================================
    // 9. CHAT MESSAGES
    // =====================================

    const chatInput = $("chatInput");
    const chatMessages = $("chatMessages");
    const sendButton = $("sendMessage");

    function addMessage(message, type) {

        const newMessage = document.createElement("div");

        newMessage.classList.add("chat-message", type);

        // textContent prevents HTML injection

        newMessage.textContent = message;

        chatMessages.appendChild(newMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }


    // SEND MESSAGE

    function sendMessage() {

        const message = chatInput.value.trim();

        if (message === "") return;

        // Show user message

        addMessage(message, "sent");

        chatInput.value = "";

        // Automatic demonstration response

        setTimeout(() => {

            let response;

            if (language === "en") {

                response =
                    "Thank you for contacting FIA'O! " +
                    "We have received your message. " +
                    "Our support team will assist you.";

            } else {

                response =
                    "¡Gracias por contactar a FIA'O! " +
                    "Hemos recibido tu mensaje. " +
                    "Nuestro equipo de soporte te ayudará.";

            }

            addMessage(response, "received");

        }, 800);

    }


    sendButton.addEventListener("click", sendMessage);


    chatInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    });


});
