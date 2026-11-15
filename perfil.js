/* ===== DATOS (reemplaza esto luego con tu API / base de datos) ===== */
const stats = [
  { icon: "users",   value: 128,   key: "stat_customers" },
  { icon: "package", value: 254,   key: "stat_products" },
  { icon: "wallet",  value: 1250,  key: "stat_credits",  money: true },
  { icon: "banknote", value: 320,  key: "stat_payments", money: true },
];

const activity = [
  { name: "John Smith",   type: "payment",  amount: 25, when: "today" },
  { name: "Maria Lopez",  type: "credit",   amount: 18, when: "today" },
  { name: "Carlos Perez", type: "reminder", amount: null, when: "yesterday" },
];

const typeStyle = {
  payment:  { icon: "banknote",   color: "green",  key: "act_payment" },
  credit:   { icon: "hand-coins", color: "red",    key: "act_credit" },
  reminder: { icon: "bell-ring",  color: "orange", key: "act_reminder" },
};

/* ===== TRADUCCIONES ===== */
const i18n = {
  en: {
    nav_home: "Home", nav_credit: "Credit", nav_products: "Products", nav_clients: "Clients", nav_reports: "Reports", nav_contact: "Contact",
    welcome: "Welcome,", subtitle: "Everything you need to manage your business is right here.",
    m_profile: "My Profile", m_edit: "Edit Profile", m_picture: "Change Profile Picture", m_theme: "Theme",
    m_language: "Language", m_notifications: "Notifications", m_settings: "Settings", m_logout: "Log Out",
    c1_title: "Customers", c1_text: "Manage customer information and debts.",
    c2_title: "Products", c2_text: "Manage inventory and product prices.",
    c3_title: "Credits & Payments", c3_text: "Register credits, payments and customer balances.",
    c4_title: "Reports", c4_text: "View statistics and financial reports.",
    stats_title: "Quick Statistics", activity_title: "Recent Activity",
    stat_customers: "Customers", stat_products: "Products", stat_credits: "Credits", stat_payments: "Payments today",
    act_payment: "Payment received", act_credit: "New credit registered", act_reminder: "Debt reminder sent",
    today: "Today", yesterday: "Yesterday", logout_confirm: "Do you want to log out?",
  },
  es: {
    nav_home: "Inicio", nav_credit: "Crédito", nav_products: "Productos", nav_clients: "Clientes", nav_reports: "Reportes", nav_contact: "Contacto",
    welcome: "Bienvenida,", subtitle: "Todo lo que necesitas para administrar tu negocio está aquí.",
    m_profile: "Mi perfil", m_edit: "Editar perfil", m_picture: "Cambiar foto de perfil", m_theme: "Tema",
    m_language: "Idioma", m_notifications: "Notificaciones", m_settings: "Configuración", m_logout: "Cerrar sesión",
    c1_title: "Clientes", c1_text: "Administra la información y las deudas de tus clientes.",
    c2_title: "Productos", c2_text: "Administra el inventario y los precios.",
    c3_title: "Créditos y pagos", c3_text: "Registra créditos, pagos y saldos de clientes.",
    c4_title: "Reportes", c4_text: "Consulta estadísticas y reportes financieros.",
    stats_title: "Estadísticas rápidas", activity_title: "Actividad reciente",
    stat_customers: "Clientes", stat_products: "Productos", stat_credits: "Créditos", stat_payments: "Pagos de hoy",
    act_payment: "Pago recibido", act_credit: "Nuevo crédito registrado", act_reminder: "Recordatorio de deuda enviado",
    today: "Hoy", yesterday: "Ayer", logout_confirm: "¿Quieres cerrar sesión?",
  },
};

let lang = localStorage.getItem("fiao-lang") || "en";
const t = (key) => i18n[lang][key] || key;
const money = (n) => "B/. " + n.toLocaleString("en-US");

/* ===== RENDER ===== */
function renderStats() {
  document.getElementById("stats").innerHTML = stats.map(s => `
    <article class="card stat">
      <span class="icon"><i data-lucide="${s.icon}"></i></span>
      <strong>${s.money ? money(s.value) : s.value}</strong>
      <span class="label">${t(s.key)}</span>
    </article>`).join("");
}

function renderActivity() {
  document.getElementById("activityList").innerHTML = activity.map(a => {
    const st = typeStyle[a.type];
    const when = t(a.when) + (a.amount ? ` • B/.${a.amount}` : "");
    return `
      <li>
        <span class="icon ${st.color}"><i data-lucide="${st.icon}"></i></span>
        <div class="who"><strong>${a.name}</strong><small>${t(st.key)}</small></div>
        <span class="when">${when}</span>
      </li>`;
  }).join("");
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  renderStats();
  renderActivity();
  lucide.createIcons();
}

/* ===== TEMA ===== */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("fiao-theme", theme);
}

/* ===== MENÚ DE USUARIO ===== */
const userBtn = document.getElementById("userBtn");
const userMenu = document.getElementById("userMenu");

function toggleMenu(open) {
  userMenu.hidden = !open;
  userBtn.setAttribute("aria-expanded", open);
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(localStorage.getItem("fiao-theme") || "light");
  applyLanguage();

  userBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu(userMenu.hidden);
  });
  document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target)) toggleMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { toggleMenu(false); userBtn.focus(); }
  });

  document.getElementById("themeBtn").addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  document.getElementById("langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";
    localStorage.setItem("fiao-lang", lang);
    applyLanguage();
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm(t("logout_confirm"))) {
      // TODO: cerrar sesión real (borrar token / llamar a tu backend)
      window.location.href = "login.html";
    }
  });

  document.getElementById("chatBtn").addEventListener("click", () => {
    // TODO: abrir tu widget de chat / soporte
    console.log("Chat abierto");
  });
});
