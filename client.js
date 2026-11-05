// ---------- Datos ----------

const clients = [

  { name: "Ramón Batista", phone: "6123-4567", purchases: 14, debt: 35.00, status: "pending" },

  { name: "Yolanda Pérez", phone: "6234-8890", purchases: 22, debt: 0,     status: "ontime"  },

  { name: "Carlos Ruiz",   phone: "6301-2245", purchases: 9,  debt: 62.50, status: "overdue" },

  { name: "Mireya Santos", phone: "6415-7783", purchases: 31, debt: 12.00, status: "pending" }

];
 
// ---------- Traducciones ----------

const i18n = {

  en: {

    nav_home: "Home", nav_credit: "Credit", nav_products: "Products", nav_clients: "Clients",

    nav_reports: "Reports", nav_contact: "Contact",

    title: "Client Management",

    subtitle: "Each client, with a clear account",

    description: "Register your customers in seconds and see at a glance who is up to date, who owes, and who to remind.",

    search: "Search client by name or phone...",

    f_all: "All", f_ontime: "On Time", f_pending: "Pending", f_overdue: "Overdue",

    th_client: "Client", th_purchases: "Purchases", th_debt: "Pending debt", th_status: "Status", th_actions: "Actions",

    purchases: "purchases", view: "View detail", empty: "No clients found.",

    rem_title: "Automatic Reminder Sent", send: "Send",

    reminder: (n, d) => `WhatsApp to ${n}: "Hello ${n.split(" ")[0]}, you have B/. ${d} pending in Minisúper Doña Chela. See you soon!"`,

    d_phone: "Phone", d_purchases: "Purchases", d_debt: "Pending debt", d_status: "Status",

    sent: "Reminder sent to", no_debt: "This client has no pending debt."

  },

  es: {

    nav_home: "Inicio", nav_credit: "Crédito", nav_products: "Productos", nav_clients: "Clientes",

    nav_reports: "Reportes", nav_contact: "Contacto",

    title: "Gestión de Clientes",

    subtitle: "Cada cliente, con su cuenta clara",

    description: "Registra a tus clientes en segundos y mira de un vistazo quién está al día, quién debe y a quién recordarle.",

    search: "Buscar cliente por nombre o teléfono...",

    f_all: "Todos", f_ontime: "Al día", f_pending: "Pendiente", f_overdue: "Vencido",

    th_client: "Cliente", th_purchases: "Compras", th_debt: "Deuda pendiente", th_status: "Estado", th_actions: "Acciones",

    purchases: "compras", view: "Ver detalle", empty: "No se encontraron clientes.",

    rem_title: "Recordatorio automático enviado", send: "Enviar",

    reminder: (n, d) => `WhatsApp a ${n}: "Hola ${n.split(" ")[0]}, tienes B/. ${d} pendientes en Minisúper Doña Chela. ¡Nos vemos pronto!"`,

    d_phone: "Teléfono", d_purchases: "Compras", d_debt: "Deuda pendiente", d_status: "Estado",

    sent: "Recordatorio enviado a", no_debt: "Este cliente no tiene deuda pendiente."

  }

};
 
// ---------- Estado ----------

let lang = localStorage.getItem("fiao-lang") || "en";

let filter = "all";

let query = "";

let reminderClient = clients[0];
 
const $ = (s) => document.querySelector(s);

const t = (k) => i18n[lang][k];

const money = (n) => n.toFixed(2);

const initials = (n) => n.split(" ").map((p) => p[0]).join("").toUpperCase();

const statusKey = { ontime: "f_ontime", pending: "f_pending", overdue: "f_overdue" };
 
// ---------- Render ----------

function renderTable() {

  const q = query.trim().toLowerCase();

  const list = clients.filter((c) =>

    (filter === "all" || c.status === filter) &&

    (c.name.toLowerCase().includes(q) || c.phone.includes(q))

  );
 
  $("#clientRows").innerHTML = list.map((c) => `
<tr>
<td>
<div class="client">
<span class="avatar">${initials(c.name)}</span>
<div><strong>${c.name}</strong><small>${c.phone}</small></div>
</div>
</td>
<td class="purchases">${c.purchases} ${t("purchases")}</td>
<td class="debt">${c.debt > 0 ? "B/. " + money(c.debt) : "-"}</td>
<td><span class="badge ${c.status}">${t(statusKey[c.status])}</span></td>
<td><button class="detail-link" data-phone="${c.phone}">${t("view")} →</button></td>
</tr>`).join("");
 
  $("#emptyMsg").hidden = list.length > 0;

}
 
function renderReminder() {

  $("#reminderMsg").textContent = i18n[lang].reminder(reminderClient.name, money(reminderClient.debt));

}
 
function applyLanguage() {

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));

  renderTable();

  renderReminder();

}
 
// ---------- Utilidades ----------

function toast(msg) {

  const el = $("#toast");

  el.textContent = msg;

  el.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);

}
 
function openDetail(phone) {

  const c = clients.find((x) => x.phone === phone);

  $("#modalContent").innerHTML = `
<h3>${c.name}</h3>
<div><b>${t("d_phone")}:</b> ${c.phone}</div>
<div><b>${t("d_purchases")}:</b> ${c.purchases}</div>
<div><b>${t("d_debt")}:</b> ${c.debt > 0 ? "B/. " + money(c.debt) : t("no_debt")}</div>
<div><b>${t("d_status")}:</b> <span class="badge ${c.status}">${t(statusKey[c.status])}</span></div>`;

  $("#modal").hidden = false;

}
 
const closeModal = () => ($("#modal").hidden = true);
 
// ---------- Eventos ----------

$("#searchInput").addEventListener("input", (e) => {

  query = e.target.value;

  renderTable();

});
 
$("#filters").addEventListener("click", (e) => {

  const chip = e.target.closest(".chip");

  if (!chip) return;

  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));

  chip.classList.add("active");

  filter = chip.dataset.filter;

  renderTable();

});
 
$("#clientRows").addEventListener("click", (e) => {

  const btn = e.target.closest(".detail-link");

  if (btn) openDetail(btn.dataset.phone);

});
 
$("#modalClose").addEventListener("click", closeModal);

$("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
 
$("#langBtn").addEventListener("click", () => {

  lang = lang === "en" ? "es" : "en";

  localStorage.setItem("fiao-lang", lang);

  applyLanguage();

});
 
$("#themeBtn").addEventListener("click", () => {

  const dark = document.body.classList.toggle("dark");

  localStorage.setItem("fiao-theme", dark ? "dark" : "light");

});
 
// Enviar recordatorio por WhatsApp (Panamá: +507)

$("#sendBtn").addEventListener("click", () => {

  const phone = "507" + reminderClient.phone.replace("-", "");

  const text = i18n[lang].reminder(reminderClient.name, money(reminderClient.debt)).split('"')[1];

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");

  toast(`${t("sent")} ${reminderClient.name}`);

});
 
// ---------- Inicio ----------

if (localStorage.getItem("fiao-theme") === "dark") document.body.classList.add("dark");

applyLanguage();
 