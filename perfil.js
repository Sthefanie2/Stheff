/* =========================================================
   FIA'O DASHBOARD
   Perfil, foto, idioma, tema, notificaciones, ajustes y chat.
   Los datos de este ejemplo se guardan en el navegador.
   ========================================================= */

const STORAGE_USER = "fiaoUser";
const STORAGE_PHOTO = "fiaoProfilePhoto";
const STORAGE_THEME = "fiao-theme";
const STORAGE_LANG = "fiao-lang";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const translations = {
  en: {
    nav_home:"Home", nav_credit:"Credit", nav_products:"Products", nav_clients:"Clients", nav_reports:"Reports", nav_contact:"Contact",
    welcome:"Welcome,", subtitle:"Everything you need to manage your business is right here.",
    m_profile:"My Profile", m_edit:"Edit Profile", m_picture:"Change Profile Picture", m_theme:"Theme",
    m_language:"Language", m_notifications:"Notifications", m_settings:"Settings", m_logout:"Log Out",
    c1_title:"Customers", c1_text:"Manage customer information and debts.",
    c2_title:"Products", c2_text:"Manage inventory and product prices.",
    c3_title:"Credits & Payments", c3_text:"Register credits, payments and customer balances.",
    c4_title:"Reports", c4_text:"View statistics and financial reports.",
    stats_title:"Quick Statistics", activity_title:"Recent Activity",
    stat_customers:"Customers", stat_products:"Products", stat_credits:"Credits", stat_payments:"Payments today",
    act_payment:"Payment received", act_credit:"New credit registered", act_reminder:"Debt reminder sent",
    today:"Today", yesterday:"Yesterday", logout_confirm:"Do you want to log out?",
    chat_online:"Business help", chat_note:"Assistant preview: answers common questions about FIA'O.",
    chat_welcome:"Hello! I'm the FIA'O assistant. I can explain how to use the platform. Try asking about customers, products, credits, payments or reports.",
    chat_placeholder:"Write your message...", send:"Send",
    profile:"My Profile", edit:"Edit Profile", save:"Save changes", cancel:"Cancel",
    name:"Full name", email:"Email", phone:"Phone", business:"Business name", noData:"Not provided",
    saved:"Your profile was updated.", photoSaved:"Profile picture updated.",
    photoError:"Choose an image smaller than 3 MB.",
    notifications:"Notifications", noNotifications:"You don't have any new notifications.",
    settings:"Settings", darkMode:"Dark mode", darkDesc:"Use a darker appearance.",
    languageSetting:"Language", languageDesc:"Choose the dashboard language.",
    accountSettings:"Account settings",
    settingsInfo:"Your profile information is stored in this browser on this device.",
    logoutTitle:"Log out",
    logoutText:"You will return to the sign-in page. Your saved profile details will remain in this browser.",
    loggedOut:"Signing out...", themeChanged:"Theme updated.", languageChanged:"Language updated.",
    assistantFallback:"I can help with FIA'O basics. You can ask me how to manage customers, add products, register a credit or payment, or view reports.",
    helpCustomers:"Open the Customers page from the top menu or the Customers shortcut. There you can manage customer information and review their debts.",
    helpProducts:"Open Products to manage your inventory and product prices.",
    helpCredit:"Open Credit to register a customer's credit, record payments and review balances.",
    helpReports:"Open Reports to view your business statistics and financial reports.",
    helpProfile:"Use the profile menu at the top right. Choose My Profile to see your saved information, or Edit Profile to update it.",
    helpPhoto:"Choose Change Profile Picture in the user menu, select an image from your device, and it will be saved in this browser.",
    helpGreeting:"Hello! How can I help you with FIA'O today?"
  },

  es: {
    nav_home:"Inicio", nav_credit:"Crédito", nav_products:"Productos", nav_clients:"Clientes", nav_reports:"Reportes", nav_contact:"Contacto",
    welcome:"¡Bienvenida,", subtitle:"Todo lo que necesitas para administrar tu negocio está aquí.",
    m_profile:"Mi perfil", m_edit:"Editar perfil", m_picture:"Cambiar foto de perfil", m_theme:"Tema",
    m_language:"Idioma", m_notifications:"Notificaciones", m_settings:"Configuración", m_logout:"Cerrar sesión",
    c1_title:"Clientes", c1_text:"Administra la información y las deudas de tus clientes.",
    c2_title:"Productos", c2_text:"Administra el inventario y los precios.",
    c3_title:"Créditos y pagos", c3_text:"Registra créditos, pagos y saldos de clientes.",
    c4_title:"Reportes", c4_text:"Consulta estadísticas y reportes financieros.",
    stats_title:"Estadísticas rápidas", activity_title:"Actividad reciente",
    stat_customers:"Clientes", stat_products:"Productos", stat_credits:"Créditos", stat_payments:"Pagos de hoy",
    act_payment:"Pago recibido", act_credit:"Nuevo crédito registrado",
    act_reminder:"Recordatorio de deuda enviado",
    today:"Hoy", yesterday:"Ayer", logout_confirm:"¿Quieres cerrar sesión?",
    chat_online:"Ayuda para tu negocio",
    chat_note:"Versión inicial: responde preguntas frecuentes sobre FIA'O.",
    chat_welcome:"¡Hola! Soy el asistente de FIA'O. Puedo explicarte cómo utilizar la plataforma. Pregúntame sobre clientes, productos, créditos, pagos o reportes.",
    chat_placeholder:"Escribe tu mensaje...", send:"Enviar",
    profile:"Mi perfil", edit:"Editar perfil", save:"Guardar cambios", cancel:"Cancelar",
    name:"Nombre completo", email:"Correo electrónico", phone:"Teléfono",
    business:"Nombre del negocio", noData:"No indicado",
    saved:"Tu perfil se actualizó.", photoSaved:"Tu foto de perfil se actualizó.",
    photoError:"Elige una imagen de menos de 3 MB.",
    notifications:"Notificaciones", noNotifications:"No tienes notificaciones nuevas.",
    settings:"Configuración", darkMode:"Modo oscuro",
    darkDesc:"Utilizar una apariencia más oscura.",
    languageSetting:"Idioma", languageDesc:"Elige el idioma del panel.",
    accountSettings:"Configuración de cuenta",
    settingsInfo:"La información de tu perfil se guarda en este navegador y dispositivo.",
    logoutTitle:"Cerrar sesión",
    logoutText:"Volverás a la página de inicio de sesión. Los datos de tu perfil permanecerán guardados en este navegador.",
    loggedOut:"Cerrando sesión...", themeChanged:"Tema actualizado.",
    languageChanged:"Idioma actualizado.",
    assistantFallback:"Puedo ayudarte con lo básico de FIA'O. Pregúntame cómo administrar clientes, agregar productos, registrar un crédito o pago, o consultar reportes.",
    helpCustomers:"Abre Clientes desde el menú superior o desde el acceso rápido. Allí puedes administrar la información de tus clientes y revisar sus deudas.",
    helpProducts:"Abre Productos para administrar tu inventario y los precios de tus productos.",
    helpCredit:"Abre Crédito para registrar créditos de clientes, anotar pagos y revisar saldos.",
    helpReports:"Abre Reportes para consultar las estadísticas de tu negocio y los informes financieros.",
    helpProfile:"Utiliza el menú de perfil de la parte superior derecha. Elige Mi perfil para ver tus datos o Editar perfil para actualizarlos.",
    helpPhoto:"Elige Cambiar foto de perfil en el menú de usuario, selecciona una imagen de tu dispositivo y se guardará en este navegador.",
    helpGreeting:"¡Hola! ¿Cómo puedo ayudarte con FIA'O hoy?"
  }
};

let lang = localStorage.getItem(STORAGE_LANG) || "en";

if (!translations[lang]) {
  lang = "en";
}

/* DATOS DE DEMOSTRACIÓN */

const demoStats = [
  { icon:"users", value:128, key:"stat_customers" },
  { icon:"package", value:254, key:"stat_products" },
  { icon:"wallet", value:1250, key:"stat_credits", money:true },
  { icon:"banknote", value:320, key:"stat_payments", money:true }
];

const demoActivity = [
  { name:"John Smith", type:"payment", amount:25, when:"today" },
  { name:"Maria Lopez", type:"credit", amount:18, when:"today" },
  { name:"Carlos Perez", type:"reminder", amount:null, when:"yesterday" }
];

const activityStyles = {
  payment:{ icon:"banknote", color:"green", key:"act_payment" },
  credit:{ icon:"hand-coins", color:"red", key:"act_credit" },
  reminder:{ icon:"bell-ring", color:"orange", key:"act_reminder" }
};

let currentUser = readUser();
let toastTimer;

/* FUNCIONES GENERALES */

function t(key) {
  return translations[lang][key] || key;
}

function money(value) {
  return "B/. " + Number(value).toLocaleString(
    lang === "es" ? "es-PA" : "en-US"
  );
}

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USER)) || {};
  } catch {
    return {};
  }
}

function saveUser() {
  localStorage.setItem(STORAGE_USER, JSON.stringify(currentUser));
}

function displayName() {
  return currentUser.fullName || (lang === "es" ? "Usuario" : "User");
}

/* MOSTRAR INFORMACIÓN DEL USUARIO */

function renderUser() {
  const name = displayName();
  const business = currentUser.business || t("noData");

  $("#welcomeName").textContent = name;
  $("#userName").textContent = name;
  $("#userBusiness").textContent = business;
  $("#menuUserName").textContent = name;

  const photo = localStorage.getItem(STORAGE_PHOTO);

  $("#avatar").innerHTML = photo
    ? `<img src="${photo}" alt="Profile picture">`
    : '<i data-lucide="user"></i>';

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ESTADÍSTICAS */

function renderStats() {
  $("#stats").innerHTML = demoStats.map(item => `
    <article class="card stat">
      <span class="icon">
        <i data-lucide="${item.icon}"></i>
      </span>
      <strong>${item.money ? money(item.value) : item.value}</strong>
      <span class="label">${t(item.key)}</span>
    </article>
  `).join("");
}

/* ACTIVIDAD RECIENTE */

function renderActivity() {
  $("#activityList").innerHTML = demoActivity.map(item => {
    const style = activityStyles[item.type];

    const when = t(item.when) +
      (item.amount ? ` • B/. ${item.amount}` : "");

    return `
      <li>
        <span class="icon ${style.color}">
          <i data-lucide="${style.icon}"></i>
        </span>

        <div class="who">
          <strong>${item.name}</strong>
          <small>${t(style.key)}</small>
        </div>

        <span class="when">${when}</span>
      </li>
    `;
  }).join("");
}

/* IDIOMA */

function applyLanguage() {
  document.documentElement.lang = lang;

  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;

    if (translations[lang][key]) {
      el.textContent = t(key);
    }
  });

  $("#chatInput").placeholder = t("chat_placeholder");

  const welcome = $('[data-welcome-message="true"]');

  if (welcome) {
    welcome.textContent = t("chat_welcome");
  }

  renderUser();
  renderStats();
  renderActivity();

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* TEMA CLARO Y OSCURO */

function applyTheme(theme, showMessage = false) {
  document.documentElement.dataset.theme = theme;

  localStorage.setItem(STORAGE_THEME, theme);

  if (showMessage) {
    showToast(t("themeChanged"));
  }
}

/* MENSAJES */

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* MENÚ DE USUARIO */

function toggleMenu(open) {
  $("#userMenu").hidden = !open;

  $("#userBtn").setAttribute(
    "aria-expanded",
    String(open)
  );
}

/* VENTANAS MODALES */

function closeModal() {
  $("#modalBackdrop").hidden = true;
  $("#modalContent").innerHTML = "";
  $("#modalFooter").innerHTML = "";
}

function openModal(title, content, footer = "") {
  $("#modalTitle").textContent = title;
  $("#modalContent").innerHTML = content;
  $("#modalFooter").innerHTML = footer;

  $("#modalBackdrop").hidden = false;

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* SEGURIDAD PARA TEXTO HTML */

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[char]);
}

/* MY PROFILE */

function showProfile() {
  const photo = localStorage.getItem(STORAGE_PHOTO);

  const photoMarkup = photo
    ? `<img src="${photo}" alt="Profile picture">`
    : '<i data-lucide="user"></i>';

  openModal(t("profile"), `
    <div class="profile-summary">
      <div class="profile-photo">
        ${photoMarkup}
      </div>

      <div>
        <strong>${escapeHTML(displayName())}</strong>
        <small>${escapeHTML(currentUser.business || t("noData"))}</small>
      </div>
    </div>

    <div class="detail-list">
      <div class="detail-row">
        <small>${t("name")}</small>
        <strong>${escapeHTML(currentUser.fullName || t("noData"))}</strong>
      </div>

      <div class="detail-row">
        <small>${t("email")}</small>
        <strong>${escapeHTML(currentUser.email || t("noData"))}</strong>
      </div>

      <div class="detail-row">
        <small>${t("phone")}</small>
        <strong>${escapeHTML(currentUser.phone || t("noData"))}</strong>
      </div>

      <div class="detail-row">
        <small>${t("business")}</small>
        <strong>${escapeHTML(currentUser.business || t("noData"))}</strong>
      </div>
    </div>
  `, `
    <button class="btn btn-primary" id="profileEditBtn">
      ${t("edit")}
    </button>
  `);

  $("#profileEditBtn").addEventListener("click", showEditProfile);
}

/* EDIT PROFILE */

function showEditProfile() {
  openModal(t("edit"), `
    <form id="editProfileForm" class="form-grid">

      <div class="form-field full">
        <label for="editName">${t("name")}</label>
        <input
          id="editName"
          name="fullName"
          required
          minlength="3"
          value="${escapeHTML(currentUser.fullName || "")}"
        >
      </div>

      <div class="form-field full">
        <label for="editEmail">${t("email")}</label>
        <input
          id="editEmail"
          name="email"
          type="email"
          required
          value="${escapeHTML(currentUser.email || "")}"
        >
      </div>

      <div class="form-field">
        <label for="editPhone">${t("phone")}</label>
        <input
          id="editPhone"
          name="phone"
          type="tel"
          value="${escapeHTML(currentUser.phone || "")}"
        >
      </div>

      <div class="form-field">
        <label for="editBusiness">${t("business")}</label>
        <input
          id="editBusiness"
          name="business"
          value="${escapeHTML(currentUser.business || "")}"
        >
      </div>

    </form>
  `, `
    <button class="btn btn-secondary" id="cancelEdit">
      ${t("cancel")}
    </button>

    <button class="btn btn-primary" id="saveEdit">
      ${t("save")}
    </button>
  `);

  $("#cancelEdit").addEventListener("click", closeModal);

  $("#saveEdit").addEventListener("click", () => {
    const form = $("#editProfileForm");

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    currentUser = {
      ...currentUser,
      fullName: String(data.get("fullName")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone")).trim(),
      business: String(data.get("business")).trim()
    };

    try {
      saveUser();
      renderUser();
      closeModal();
      showToast(t("saved"));
    } catch (error) {
      console.error(error);
      showToast("Could not save your profile in this browser.");
    }
  });
}

/* CHANGE PROFILE PICTURE */

function choosePicture() {
  $("#pictureInput").click();
}

function handlePicture(event) {
  const file = event.target.files && event.target.files[0];

  if (!file) {
    return;
  }

  if (
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 3 * 1024 * 1024
  ) {
    showToast(t("photoError"));
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    try {
      localStorage.setItem(STORAGE_PHOTO, reader.result);

      renderUser();

      showToast(t("photoSaved"));
    } catch (error) {
      console.error(error);
      showToast(t("photoError"));
    }
  };

  reader.readAsDataURL(file);

  event.target.value = "";
}

/* NOTIFICATIONS */

function showNotifications() {
  const items = lang === "es"
    ? [
        {
          title:"Consejo de FIA'O",
          desc:"Mantén actualizada la información de tus clientes."
        },
        {
          title:"Recordatorio",
          desc:"Revisa periódicamente los créditos pendientes."
        }
      ]
    : [
        {
          title:"FIA'O tip",
          desc:"Keep your customer information up to date."
        },
        {
          title:"Reminder",
          desc:"Review pending credits regularly."
        }
      ];

  openModal(
    t("notifications"),
    items.map(item => `
      <div class="notification-item">
        <span>
          <strong>${item.title}</strong>
          <small>${item.desc}</small>
        </span>
        <i data-lucide="bell"></i>
      </div>
    `).join("")
  );
}

/* SETTINGS */

function showSettings() {
  openModal(t("settings"), `
    <div class="setting-row">
      <span>
        <strong>${t("darkMode")}</strong>
        <small>${t("darkDesc")}</small>
      </span>

      <input
        class="switch"
        id="settingsTheme"
        type="checkbox"
        ${document.documentElement.dataset.theme === "dark" ? "checked" : ""}
      >
    </div>

    <div class="setting-row">
      <span>
        <strong>${t("languageSetting")}</strong>
        <small>${t("languageDesc")}</small>
      </span>

      <select id="settingsLang" aria-label="${t("languageSetting")}">
        <option value="en" ${lang === "en" ? "selected" : ""}>
          English
        </option>

        <option value="es" ${lang === "es" ? "selected" : ""}>
          Español
        </option>
      </select>
    </div>

    <p class="empty-state">${t("settingsInfo")}</p>
  `);

  $("#settingsTheme").addEventListener("change", event => {
    applyTheme(event.target.checked ? "dark" : "light", true);
  });

  $("#settingsLang").addEventListener("change", event => {
    lang = event.target.value;

    localStorage.setItem(STORAGE_LANG, lang);

    applyLanguage();
    showSettings();

    showToast(t("languageChanged"));
  });
}

/* LOG OUT */

function logout() {
  if (!confirm(t("logout_confirm"))) {
    return;
  }

  // Conserva fiaoUser para no borrar el perfil guardado.
  // Si implementas autenticación real, aquí debes cerrar la sesión del backend.

  sessionStorage.removeItem("fiao-session");

  showToast(t("loggedOut"));

  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
}

/* CHAT LOCAL DE PREGUNTAS FRECUENTES
   No es una IA generativa real todavía.
   Para conectarlo a una IA real necesitarás un backend seguro.
*/

function getAssistantReply(message) {
  const text = message.toLowerCase();

  if (/hola|buenas|hello|hi\b|hey/.test(text)) {
    return t("helpGreeting");
  }

  if (/cliente|clientes|customer/.test(text)) {
    return t("helpCustomers");
  }

  if (/producto|productos|inventario|product|inventory/.test(text)) {
    return t("helpProducts");
  }

  if (/crédito|credito|credit|pago|pagos|payment/.test(text)) {
    return t("helpCredit");
  }

  if (/reporte|reportes|estadística|estadisticas|report|statistics/.test(text)) {
    return t("helpReports");
  }

  if (/perfil|profile|nombre|correo|email/.test(text)) {
    return t("helpProfile");
  }

  if (/foto|imagen|picture|photo/.test(text)) {
    return t("helpPhoto");
  }

  return t("assistantFallback");
}

/* AGREGAR MENSAJES AL CHAT */

function addChatMessage(message, sender) {
  const bubble = document.createElement("div");

  bubble.className = `message ${sender}`;
  bubble.textContent = message;

  $("#chatMessages").appendChild(bubble);

  $("#chatMessages").scrollTop =
    $("#chatMessages").scrollHeight;
}

/* ABRIR CHAT */

function openChat() {
  $("#chatPanel").hidden = false;

  $("#chatInput").focus();

  if (!$("#chatMessages").dataset.started) {
    $("#chatMessages").innerHTML = "";

    addChatMessage(t("chat_welcome"), "assistant");

    $("#chatMessages").dataset.started = "true";
  }
}

/* CERRAR CHAT */

function closeChat() {
  $("#chatPanel").hidden = true;
}

/* INICIAR FUNCIONES */

function init() {

  applyTheme(
    localStorage.getItem(STORAGE_THEME) || "light"
  );

  renderUser();
  applyLanguage();

  /* ABRIR MENÚ */

  $("#userBtn").addEventListener("click", event => {
    event.stopPropagation();

    toggleMenu($("#userMenu").hidden);
  });

  /* CERRAR MENÚ AL HACER CLIC FUERA */

  document.addEventListener("click", event => {
    if (!$("#user").contains(event.target)) {
      toggleMenu(false);
    }
  });

  /* CERRAR VENTANAS CON ESCAPE */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      toggleMenu(false);
      closeModal();
      closeChat();
    }
  });

  /* ACCIONES DEL MENÚ */

  $("#userMenu").addEventListener("click", event => {
    const action = event.target.closest("[data-action]")?.dataset.action;

    if (!action) {
      return;
    }

    toggleMenu(false);

    if (action === "profile") showProfile();
    if (action === "edit") showEditProfile();
    if (action === "picture") choosePicture();
    if (action === "notifications") showNotifications();
    if (action === "settings") showSettings();
  });

  /* CAMBIAR TEMA */

  $("#themeBtn").addEventListener("click", () => {
    applyTheme(
      document.documentElement.dataset.theme === "dark"
        ? "light"
        : "dark",
      true
    );

    toggleMenu(false);
  });

  /* CAMBIAR IDIOMA */

  $("#langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";

    localStorage.setItem(STORAGE_LANG, lang);

    applyLanguage();

    toggleMenu(false);

    showToast(t("languageChanged"));
  });

  /* CERRAR SESIÓN */

  $("#logoutBtn").addEventListener("click", () => {
    toggleMenu(false);
    logout();
  });

  /* SUBIR FOTO */

  $("#pictureInput").addEventListener("change", handlePicture);

  /* CERRAR MODAL */

  $("#closeModal").addEventListener("click", closeModal);

  $("#modalBackdrop").addEventListener("click", event => {
    if (event.target === $("#modalBackdrop")) {
      closeModal();
    }
  });

  /* CHAT */

  $("#chatBtn").addEventListener("click", openChat);

  $("#closeChat").addEventListener("click", closeChat);

  $("#chatForm").addEventListener("submit", event => {
    event.preventDefault();

    const input = $("#chatInput");
    const message = input.value.trim();

    if (!message) {
      return;
    }

    addChatMessage(message, "user");

    input.value = "";

    window.setTimeout(() => {
      addChatMessage(
        getAssistantReply(message),
        "assistant"
      );
    }, 350);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", init);