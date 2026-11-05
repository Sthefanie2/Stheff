// ============================================================
//  TRADUCCIONES (EN / ES)
// ============================================================
const translations = {
  en: {
    nav_home: "Home", nav_credit: "Credit", nav_products: "Products",
    nav_clients: "Clients", nav_reports: "Reports", nav_contact: "Contact",
    title: "Contact and support",
    sub1: "Have questions? We are here to help",
    sub2: "Check out the FAQs below or open the chat anytime for instant support.",
    q1: "Does it work without internet?",
    a1: "Yes. You can record sales and credits without a connection, and everything syncs automatically when the internet is back.",
    q2: "How to start using the app?",
    a2: "Create your account, add your products and customers, and register your first credit. It takes less than 5 minutes.",
    q3: "Do payment reminders arrive automatically?",
    a3: "Yes. FIA'O sends automatic reminders to your customers before and after the due date, so you don't have to chase payments.",
    q4: "Can I export my reports?",
    a4: "Of course. In the Reports section you can export your data as PDF or Excel, using the filters you need.",
    q5: "What if a customer doesn't pay?",
    a5: "The account is marked as overdue and appears in your reports. You can send a reminder or agree on a new payment date.",
    f_name: "NAME", f_email: "EMAIL", f_message: "MESSAGE",
    ph_name: "Your name", ph_message: "Tell us how we can help you",
    send: "Send message", sending: "Sending...",
    err_name: "Please enter your name",
    err_email_req: "Email is required", err_email: "Enter a valid email",
    err_message: "Please write a message (min. 10 characters)",
    success: "✓ Message sent! We will reply soon.",
    footer_desc: "The app for shopkeepers to manage their credit lines without paper notebooks or wall markings.",
    f_nav: "NAVIGATION", f_product: "PRODUCT", f_contact: "CONTACT",
    copyright: "© 2026 FIA'O. Visual prototypes.", made_for: "Made for local businesses",
    chat_status: "AI assistant · online", chat_ph: "Type your question...",
    chat_welcome: "Hi! 👋 I'm the FIA'O assistant. Ask me anything about the app or pick a question below.",
    chat_fallback: "I'm not sure about that one. You can send us a message with the form and our team will reply, or write to hola@fiao.app.",
    chat_error: "Sorry, something went wrong. Please try again.",
  },
  es: {
    nav_home: "Inicio", nav_credit: "Crédito", nav_products: "Productos",
    nav_clients: "Clientes", nav_reports: "Reportes", nav_contact: "Contacto",
    title: "Contacto y soporte",
    sub1: "¿Tienes preguntas? Estamos aquí para ayudarte",
    sub2: "Revisa las preguntas frecuentes o abre el chat en cualquier momento para recibir soporte inmediato.",
    q1: "¿Funciona sin internet?",
    a1: "Sí. Puedes registrar ventas y fiados sin conexión y todo se sincroniza automáticamente cuando vuelva el internet.",
    q2: "¿Cómo empiezo a usar la app?",
    a2: "Crea tu cuenta, agrega tus productos y clientes, y registra tu primer fiado. Toma menos de 5 minutos.",
    q3: "¿Los recordatorios de pago llegan automáticamente?",
    a3: "Sí. FIA'O envía recordatorios automáticos a tus clientes antes y después de la fecha de pago, para que no tengas que cobrar uno por uno.",
    q4: "¿Puedo exportar mis reportes?",
    a4: "Claro. En la sección Reportes puedes exportar tus datos en PDF o Excel, con los filtros que necesites.",
    q5: "¿Qué pasa si un cliente no paga?",
    a5: "La cuenta se marca como vencida y aparece en tus reportes. Puedes enviar un recordatorio o acordar una nueva fecha de pago.",
    f_name: "NOMBRE", f_email: "CORREO", f_message: "MENSAJE",
    ph_name: "Tu nombre", ph_message: "Cuéntanos cómo podemos ayudarte",
    send: "Enviar mensaje", sending: "Enviando...",
    err_name: "Escribe tu nombre",
    err_email_req: "El correo es obligatorio", err_email: "Ingresa un correo válido",
    err_message: "Escribe un mensaje (mín. 10 caracteres)",
    success: "✓ ¡Mensaje enviado! Te responderemos pronto.",
    footer_desc: "La app para tenderos que administra sus fiados sin libretas de papel ni marcas en la pared.",
    f_nav: "NAVEGACIÓN", f_product: "PRODUCTO", f_contact: "CONTACTO",
    copyright: "© 2026 FIA'O. Prototipos visuales.", made_for: "Hecho para negocios locales",
    chat_status: "Asistente IA · en línea", chat_ph: "Escribe tu pregunta...",
    chat_welcome: "¡Hola! 👋 Soy el asistente de FIA'O. Pregúntame lo que quieras sobre la app o elige una pregunta.",
    chat_fallback: "No estoy seguro de eso. Puedes enviarnos un mensaje con el formulario y nuestro equipo te responderá, o escribir a hola@fiao.app.",
    chat_error: "Lo siento, algo salió mal. Inténtalo de nuevo.",
  },
};

// ============================================================
//  ESTADO Y UTILIDADES
// ============================================================
let lang = "en";
const $ = (id) => document.getElementById(id);
const t = (key) => translations[lang][key] || key;

// ============================================================
//  IDIOMA
// ============================================================
function applyLanguage() {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPh);
  });

  // Los links del footer están en español en el diseño; el resto sigue el idioma
  renderChips();

  // Reajusta la altura de las respuestas abiertas del FAQ
  document.querySelectorAll(".faq__item.open .faq__answer").forEach((a) => {
    a.style.maxHeight = a.scrollHeight + "px";
  });

  try { localStorage.setItem("fiao-lang", lang); } catch (e) {}
}

$("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  applyLanguage();
});

// ============================================================
//  MODO OSCURO
// ============================================================
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  $("themeBtn").innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  try { localStorage.setItem("fiao-theme", dark ? "dark" : "light"); } catch (e) {}
}
$("themeBtn").addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));

// ============================================================
//  PREGUNTAS FRECUENTES (acordeón)
// ============================================================
document.querySelectorAll(".faq__item").forEach((item) => {
  const btn = item.querySelector(".faq__question");
  const answer = item.querySelector(".faq__answer");

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Cierra las demás
    document.querySelectorAll(".faq__item.open").forEach((other) => {
      other.classList.remove("open");
      other.querySelector(".faq__answer").style.maxHeight = null;
      other.querySelector(".faq__question").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// ============================================================
//  FORMULARIO DE CONTACTO
// ============================================================
const form = $("contactForm");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(inputId, errorId, message) {
  $(errorId).textContent = message;
  $(inputId).closest(".field").classList.toggle("invalid", Boolean(message));
  return !message;
}

function validateName() {
  return setError("name", "nameError", $("name").value.trim().length < 2 ? t("err_name") : "");
}

function validateEmail() {
  const v = $("email").value.trim();
  if (!v) return setError("email", "emailError", t("err_email_req"));
  return setError("email", "emailError", emailRegex.test(v) ? "" : t("err_email"));
}

function validateMessage() {
  return setError("message", "messageError", $("message").value.trim().length < 10 ? t("err_message") : "");
}

$("name").addEventListener("blur", validateName);
$("email").addEventListener("blur", validateEmail);
$("message").addEventListener("blur", validateMessage);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  $("formSuccess").textContent = "";

  const ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
  if (!ok) return;

  const payload = {
    name: $("name").value.trim(),
    email: $("email").value.trim(),
    message: $("message").value.trim(),
  };

  $("sendBtn").disabled = true;
  $("sendBtn").textContent = t("sending");

  try {
    // 👉 Conecta aquí tu backend. Ejemplo:
    // await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    await new Promise((r) => setTimeout(r, 800)); // simulación
    console.log("Mensaje enviado:", payload);

    form.reset();
    $("formSuccess").textContent = t("success");
  } finally {
    $("sendBtn").disabled = false;
    $("sendBtn").textContent = t("send");
  }
});

// ============================================================
//  ASISTENTE DE IA
// ============================================================
// Para usar una IA real (Claude u otra), crea un endpoint en TU servidor
// que reciba { message, history, lang } y devuelva { reply }.
// NUNCA pongas tu API key en este archivo: se vería en el navegador.
// Ejemplo:  const AI_ENDPOINT = "/api/assistant";
const AI_ENDPOINT = "";

// Base de conocimiento local (funciona sin servidor)
const knowledge = [
  {
    keys: ["internet", "offline", "conexion", "conexión", "wifi", "sin red"],
    en: "Yes, FIA'O works without internet. Your sales and credits are saved on your device and sync automatically when you're back online.",
    es: "Sí, FIA'O funciona sin internet. Tus ventas y fiados se guardan en tu dispositivo y se sincronizan solos cuando vuelvas a tener conexión.",
  },
  {
    keys: ["start", "begin", "empezar", "comenzar", "iniciar", "como uso", "cómo uso", "primeros pasos", "account", "cuenta", "registr"],
    en: "To start: 1) create your account, 2) add your products, 3) add your customers, 4) register your first credit. It takes less than 5 minutes.",
    es: "Para empezar: 1) crea tu cuenta, 2) agrega tus productos, 3) agrega tus clientes, 4) registra tu primer fiado. Toma menos de 5 minutos.",
  },
  {
    keys: ["reminder", "recordatorio", "notific", "aviso", "automatic", "automátic", "automatic"],
    en: "Yes, payment reminders are sent automatically to your customers before and after the due date.",
    es: "Sí, los recordatorios de pago se envían automáticamente a tus clientes antes y después de la fecha de pago.",
  },
  {
    keys: ["export", "pdf", "excel", "report", "reporte", "descargar", "download"],
    en: "You can export reports as PDF or Excel from the Reports section, using the date and customer filters you need.",
    es: "Puedes exportar reportes en PDF o Excel desde la sección Reportes, usando los filtros de fecha y cliente que necesites.",
  },
  {
    keys: ["not pay", "doesn't pay", "no paga", "no pague", "moroso", "overdue", "vencid", "deuda", "debt", "unpaid"],
    en: "If a customer doesn't pay, the account is marked as overdue and shows up in your reports. You can send a reminder or agree on a new payment date.",
    es: "Si un cliente no paga, la cuenta se marca como vencida y aparece en tus reportes. Puedes enviarle un recordatorio o acordar una nueva fecha de pago.",
  },
  {
    keys: ["price", "precio", "cost", "costo", "cuesta", "plan", "gratis", "free", "pagar"],
    en: "For pricing and plans, please write to hola@fiao.app or send us a message with the form and we'll get back to you.",
    es: "Para precios y planes, escribe a hola@fiao.app o envíanos un mensaje con el formulario y te responderemos.",
  },
  {
    keys: ["contact", "contacto", "phone", "telefono", "teléfono", "whatsapp", "email", "correo", "human", "humano", "agente"],
    en: "You can reach us at hola@fiao.app or +507 6000-0000, or use the form on this page.",
    es: "Puedes escribirnos a hola@fiao.app o llamar al +507 6000-0000, o usar el formulario de esta página.",
  },
  {
    keys: ["hello", "hola", "buenas", "hey", "buenos"],
    en: "Hello! 😊 How can I help you today?",
    es: "¡Hola! 😊 ¿En qué puedo ayudarte hoy?",
  },
  {
    keys: ["thanks", "thank", "gracias"],
    en: "You're welcome! Let me know if you need anything else.",
    es: "¡De nada! Avísame si necesitas algo más.",
  },
];

const chatBox = $("chatBox");
const chatMessages = $("chatMessages");
const chatHistory = [];

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function localAnswer(question) {
  const q = normalize(question);
  let best = null;
  let bestScore = 0;

  knowledge.forEach((item) => {
    const score = item.keys.reduce((s, k) => s + (q.includes(normalize(k)) ? 1 : 0), 0);
    if (score > bestScore) { best = item; bestScore = score; }
  });

  return best ? best[lang] : t("chat_fallback");
}

async function getReply(question) {
  if (!AI_ENDPOINT) {
    await new Promise((r) => setTimeout(r, 700)); // pequeña pausa para que se vea natural
    return localAnswer(question);
  }

  const res = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question, history: chatHistory, lang }),
  });
  if (!res.ok) throw new Error("AI request failed");
  const data = await res.json();
  return data.reply;
}

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot typing";
  div.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

async function sendChat(text) {
  const question = text.trim();
  if (!question) return;

  addMessage(question, "user");
  chatHistory.push({ role: "user", content: question });
  $("chatInput").value = "";

  const typing = showTyping();
  try {
    const reply = await getReply(question);
    typing.remove();
    addMessage(reply, "bot");
    chatHistory.push({ role: "assistant", content: reply });
  } catch (err) {
    typing.remove();
    addMessage(t("chat_error"), "bot");
  }
}

// Preguntas sugeridas (las mismas del FAQ)
function renderChips() {
  $("chatChips").innerHTML = ["q1", "q2", "q3", "q4", "q5"]
    .map((k) => `<button type="button" class="chip" data-q="${k}">${t(k)}</button>`)
    .join("");
}

$("chatChips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (chip) sendChat(chip.textContent);
});

$("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  sendChat($("chatInput").value);
});

function toggleChat(open) {
  chatBox.classList.toggle("open", open);
  chatBox.setAttribute("aria-hidden", String(!open));

  if (open) {
    if (!chatMessages.children.length) addMessage(t("chat_welcome"), "bot");
    $("chatInput").focus();
  }
}

$("chatFab").addEventListener("click", () => toggleChat(!chatBox.classList.contains("open")));
$("chatClose").addEventListener("click", () => toggleChat(false));

// ============================================================
//  INICIO
// ============================================================
(function init() {
  try {
    const savedLang = localStorage.getItem("fiao-lang");
    if (savedLang === "es" || savedLang === "en") lang = savedLang;
    setTheme(localStorage.getItem("fiao-theme") === "dark");
  } catch (e) {}
  applyLanguage();
})();