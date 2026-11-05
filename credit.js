// ============================================================
//  TRADUCCIONES (EN / ES)
// ============================================================
const translations = {
  en: {
    nav_home: "Home", nav_credit: "Credit", nav_products: "Products",
    nav_clients: "Clients", nav_reports: "Reports", nav_contact: "Contact",
    notifications: "Notifications", no_alerts: "No alerts. Everything is under control 👍",
    title_a: "Debts", title_b: "Payments",
    subtitle: "Manage customer debts, register payments, and track balances easily.",
    select_customer: "Select a Customer",
    current_debt: "Current Debt", credit_limit: "Credit Limit",
    used: "used", limit: "Limit", blocked: "Blocked",
    auto_blocking: "Automatic Blocking",
    auto_desc: "If a customer exceeds the debt limit, system prevents new credits.",
    debt_history: "Debt History", history_sub: "Track all purchases and payments.",
    new_debt: "New debt", view_full: "View Full History →", show_less: "Show less ↑",
    no_history: "No movements yet.",
    fiado: "Fiado", abono: "Abono", pending: "Pending", paid: "Paid",
    payment_received_title: "Payment Received",
    register_payment: "Register Payment", register_sub: "Record payments made by the customer.",
    payment_amount: "Payment Amount", payment_type: "Payment Type",
    partial: "Partial Payment", full: "Full Payment",
    register_btn: "Register Payment", mark_paid: "Mark as Paid",
    recent_activity: "Recent Activity", view_all: "View all activity →",
    debt_overview: "Debt Overview", outstanding: "Outstanding Debt",
    payments_today: "Payments Today", customers_debt: "Customers with Debt", overdue: "Overdue",
    act_paid: "Paid", act_new: "New debt:", act_received: "Payment received:",
    today: "Today", yesterday: "Yesterday", days_ago: "days ago",
    new_debt_title: "Register new debt", description: "Description", amount: "Amount",
    desc_ph: "e.g. Rice (2 lb)", save: "Save", cancel: "Cancel",
    // mensajes
    err_amount: "Enter a valid amount greater than 0",
    err_exceeds: "The amount exceeds the current debt",
    err_no_debt: "This customer has no pending debt",
    err_desc: "Write a description",
    err_blocked: "Customer blocked: this credit would exceed the limit",
    ok_payment: "Payment registered for",
    ok_paid_all: "Debt fully paid for",
    ok_debt: "New debt registered for",
    warn_limit: "Note: the customer is over the credit limit",
    confirm_paid: "Mark the whole debt of this customer as paid?",
    alert_blocked: "is blocked (limit reached)",
    alert_near: "is close to the credit limit",
    alert_overdue: "has overdue debt",
    months: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
  },
  es: {
    nav_home: "Inicio", nav_credit: "Crédito", nav_products: "Productos",
    nav_clients: "Clientes", nav_reports: "Reportes", nav_contact: "Contacto",
    notifications: "Notificaciones", no_alerts: "Sin alertas. Todo está bajo control 👍",
    title_a: "Deudas", title_b: "Pagos",
    subtitle: "Gestiona las deudas de tus clientes, registra pagos y controla los saldos fácilmente.",
    select_customer: "Selecciona un cliente",
    current_debt: "Deuda actual", credit_limit: "Límite de crédito",
    used: "usado", limit: "Límite", blocked: "Bloqueado",
    auto_blocking: "Bloqueo automático",
    auto_desc: "Si un cliente supera el límite de deuda, el sistema impide nuevos créditos.",
    debt_history: "Historial de deudas", history_sub: "Sigue todas las compras y pagos.",
    new_debt: "Nueva deuda", view_full: "Ver historial completo →", show_less: "Ver menos ↑",
    no_history: "Aún no hay movimientos.",
    fiado: "Fiado", abono: "Abono", pending: "Pendiente", paid: "Pagado",
    payment_received_title: "Pago recibido",
    register_payment: "Registrar pago", register_sub: "Registra los pagos hechos por el cliente.",
    payment_amount: "Monto del pago", payment_type: "Tipo de pago",
    partial: "Pago parcial", full: "Pago total",
    register_btn: "Registrar pago", mark_paid: "Marcar como pagado",
    recent_activity: "Actividad reciente", view_all: "Ver toda la actividad →",
    debt_overview: "Resumen de deudas", outstanding: "Deuda pendiente",
    payments_today: "Pagos de hoy", customers_debt: "Clientes con deuda", overdue: "Vencidas",
    act_paid: "Pagó", act_new: "Nueva deuda:", act_received: "Pago recibido:",
    today: "Hoy", yesterday: "Ayer", days_ago: "días atrás",
    new_debt_title: "Registrar nueva deuda", description: "Descripción", amount: "Monto",
    desc_ph: "ej. Arroz (2 lb)", save: "Guardar", cancel: "Cancelar",
    err_amount: "Ingresa un monto válido mayor a 0",
    err_exceeds: "El monto supera la deuda actual",
    err_no_debt: "Este cliente no tiene deuda pendiente",
    err_desc: "Escribe una descripción",
    err_blocked: "Cliente bloqueado: este crédito superaría el límite",
    ok_payment: "Pago registrado para",
    ok_paid_all: "Deuda pagada por completo para",
    ok_debt: "Nueva deuda registrada para",
    warn_limit: "Aviso: el cliente superó su límite de crédito",
    confirm_paid: "¿Marcar toda la deuda de este cliente como pagada?",
    alert_blocked: "está bloqueado (límite alcanzado)",
    alert_near: "está cerca de su límite de crédito",
    alert_overdue: "tiene deuda vencida",
    months: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
  },
};

// ============================================================
//  UTILIDADES
// ============================================================
let lang = "en";
const $ = (id) => document.getElementById(id);
const t = (k) => translations[lang][k] ?? k;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => "B/. " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function isoDate(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return isoDate(d);
}
function daysBetween(iso) {
  const a = new Date(iso + "T00:00:00");
  const b = new Date(isoDate() + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

// ============================================================
//  DATOS DE EJEMPLO (reemplázalos por datos de tu backend)
// ============================================================
// La deuda de cada cliente se calcula sumando sus fiados pendientes.
function seedState() {
  return {
    selectedId: 1,
    overview: { outstanding: 480, paymentsToday: 150, customersWithDebt: 18, overdue: 4 },
    customers: [
      {
        id: 1, name: "Ramón Batista", limit: 100, autoBlock: true, overdue: false,
        history: [
          { id: "a1", date: "2026-07-14", kind: "debt", desc: "Milk (2)", amount: 8, remaining: 8, status: "pending" },
          { id: "a2", date: "2026-07-09", kind: "debt", desc: "Detergent", amount: 4.5, remaining: 4.5, status: "pending" },
          { id: "a3", date: "2026-07-05", kind: "payment", desc: null, amount: 20, status: "paid" },
          { id: "a4", date: "2026-07-02", kind: "debt", desc: "Groceries", amount: 22.5, remaining: 22.5, status: "pending" },
        ],
      },
      {
        id: 2, name: "Carlos Gómez", limit: 80, autoBlock: true, overdue: true,
        history: [
          { id: "b1", date: "2026-07-12", kind: "debt", desc: "Groceries", amount: 12.5, remaining: 12.5, status: "pending" },
        ],
      },
      {
        id: 3, name: "Ana Martínez", limit: 60, autoBlock: true, overdue: false,
        history: [
          { id: "c1", date: "2026-07-10", kind: "payment", desc: null, amount: 20, status: "paid" },
          { id: "c2", date: "2026-07-03", kind: "debt", desc: "Market order", amount: 55, remaining: 55, status: "pending" },
        ],
      },
      {
        id: 4, name: "María López", limit: 50, autoBlock: true, overdue: false,
        history: [
          { id: "d1", date: "2026-07-06", kind: "debt", desc: "Supplies", amount: 50, remaining: 50, status: "pending" },
        ],
      },
    ],
    activity: [
      { name: "Ramón Batista", type: "paid", amount: 15, date: isoDaysAgo(0) },
      { name: "Carlos Gómez", type: "newDebt", amount: 12.5, date: isoDaysAgo(1) },
      { name: "Ana Martínez", type: "received", amount: 20, date: isoDaysAgo(1) },
    ],
  };
}

const STORAGE_KEY = "fiao-debts-v1";
let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.customers) && saved.customers.length) return saved;
  } catch (e) {}
  return seedState();
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

// ============================================================
//  CÁLCULOS
// ============================================================
const current = () => state.customers.find((c) => c.id === state.selectedId) || state.customers[0];

function debtOf(c) {
  return round2(c.history.filter((h) => h.kind === "debt" && h.status === "pending").reduce((s, h) => s + h.remaining, 0));
}
const percentOf = (c) => (c.limit > 0 ? (debtOf(c) / c.limit) * 100 : 0);
const isBlocked = (c) => c.autoBlock && debtOf(c) >= c.limit;

// ============================================================
//  RENDER
// ============================================================
function renderSelect() {
  $("customerSelect").innerHTML = state.customers
    .map((c) => `<option value="${c.id}" ${c.id === state.selectedId ? "selected" : ""}>${esc(c.name)}</option>`)
    .join("");
}

function renderCustomer() {
  const c = current();
  const debt = debtOf(c);
  const pct = percentOf(c);

  $("custName").textContent = c.name;
  $("custDebt").textContent = money(debt);
  $("custLimit").textContent = money(c.limit);
  $("custUsed").textContent = `${Math.round(pct)}% ${t("used")}`;
  $("custLimitText").textContent = `${t("limit")}: ${money(c.limit)}`;
  $("custBar").style.width = Math.min(100, pct) + "%";
  $("blockToggle").checked = c.autoBlock;
  $("blockedTag").classList.toggle("show", isBlocked(c));
}

function formatDate(iso) {
  const [, m, d] = iso.split("-");
  return { day: d, month: t("months")[Number(m) - 1] };
}

function renderHistory() {
  const c = current();
  if (!c.history.length) {
    $("historyList").innerHTML = `<li class="h-empty">${t("no_history")}</li>`;
    return;
  }

  $("historyList").innerHTML = c.history
    .map((h) => {
      const dt = formatDate(h.date);
      const isPay = h.kind === "payment";
      const title = isPay ? t("payment_received_title") : esc(h.desc);
      const sub = isPay ? t("abono") : t("fiado");
      const icon = isPay ? "fa-money-bill-wave" : "fa-cart-shopping";
      const shown = isPay ? `-${money(h.amount)}` : money(h.status === "pending" ? h.remaining : h.amount);
      const hint = !isPay && h.status === "pending" && h.remaining < h.amount ? `title="${money(h.amount)}"` : "";

      return `
        <li class="h-item">
          <div class="h-date"><b>${dt.day}</b><span>${dt.month}</span></div>
          <div class="h-icon"><i class="fa-solid ${icon}"></i></div>
          <div class="h-info"><strong>${title}</strong><small>${sub}</small></div>
          <span class="h-amount ${isPay ? "pos" : ""}" ${hint}>${shown}</span>
          <span class="status ${h.status}">${t(h.status)}</span>
        </li>`;
    })
    .join("");
}

function activityText(a) {
  const amt = money(a.amount);
  if (a.type === "paid") return `${t("act_paid")} ${amt}`;
  if (a.type === "newDebt") return `${t("act_new")} ${amt}`;
  return `${t("act_received")} ${amt}`;
}

function timeLabel(iso) {
  const d = daysBetween(iso);
  if (d <= 0) return t("today");
  if (d === 1) return t("yesterday");
  return lang === "es" ? `hace ${d} ${t("days_ago").replace("atrás", "").trim()}` : `${d} ${t("days_ago")}`;
}

function renderActivity() {
  $("activityList").innerHTML = state.activity
    .slice(0, 20)
    .map((a) => {
      const icon = a.type === "newDebt" ? "fa-cart-shopping" : "fa-money-bill-wave";
      const dot = a.type === "newDebt" ? "orange" : "green";
      return `
        <li class="a-item">
          <div class="a-icon"><i class="fa-solid ${icon}"></i></div>
          <div class="a-info"><strong>${esc(a.name)}</strong><small>${activityText(a)}</small></div>
          <span class="a-time">${timeLabel(a.date)} <i class="dot ${dot}"></i></span>
        </li>`;
    })
    .join("");
}

function renderOverview() {
  const o = state.overview;
  $("ovOutstanding").textContent = money(o.outstanding);
  $("ovToday").textContent = money(o.paymentsToday);
  $("ovCustomers").textContent = o.customersWithDebt;
  $("ovOverdue").textContent = o.overdue;
}

function getAlerts() {
  const alerts = [];
  state.customers.forEach((c) => {
    const debt = debtOf(c);
    if (isBlocked(c)) alerts.push(`${c.name} ${t("alert_blocked")}`);
    else if (percentOf(c) >= 80) alerts.push(`${c.name} ${t("alert_near")} (${Math.round(percentOf(c))}%)`);
    if (c.overdue && debt > 0) alerts.push(`${c.name} ${t("alert_overdue")}`);
  });
  return alerts;
}

function renderNotifications() {
  const alerts = getAlerts();
  $("bellCount").textContent = alerts.length;
  $("bellCount").classList.toggle("hidden", alerts.length === 0);
  $("notifList").innerHTML = alerts.length
    ? alerts.map((a) => `<li><i class="fa-solid fa-triangle-exclamation"></i><span>${esc(a)}</span></li>`).join("")
    : `<li class="empty">${t("no_alerts")}</li>`;
}

function renderAll() {
  renderSelect();
  renderCustomer();
  renderHistory();
  renderActivity();
  renderOverview();
  renderNotifications();
  syncPaymentForm();
}

// ============================================================
//  MENSAJES (toasts)
// ============================================================
function toast(message, type = "success") {
  const el = document.createElement("div");
  el.className = "toast " + (type === "error" ? "error" : "");
  el.innerHTML = `<i class="fa-solid ${type === "error" ? "fa-circle-xmark" : "fa-circle-check"}"></i><span>${esc(message)}</span>`;
  $("toasts").appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ============================================================
//  CAMBIO DE CLIENTE
// ============================================================
$("customerSelect").addEventListener("change", (e) => {
  state.selectedId = Number(e.target.value);
  $("payAmount").value = "";
  $("payError").textContent = "";
  saveState();
  renderAll();
});

// ============================================================
//  BLOQUEO AUTOMÁTICO
// ============================================================
$("blockToggle").addEventListener("change", (e) => {
  current().autoBlock = e.target.checked;
  saveState();
  renderCustomer();
  renderNotifications();
});

// ============================================================
//  REGISTRAR PAGO
// ============================================================
const payType = () => document.querySelector('input[name="payType"]:checked').value;

// Pago total: rellena el monto con la deuda y bloquea el campo
function syncPaymentForm() {
  const input = $("payAmount");
  if (payType() === "full") {
    input.value = debtOf(current()) > 0 ? debtOf(current()).toFixed(2) : "";
    input.disabled = true;
  } else {
    input.disabled = false;
  }
}

document.querySelectorAll('input[name="payType"]').forEach((r) =>
  r.addEventListener("change", () => {
    if (payType() === "partial") $("payAmount").value = "";
    $("payError").textContent = "";
    syncPaymentForm();
  })
);

// Aplica el pago a los fiados más antiguos primero
function applyPayment(c, amount) {
  const hadDebt = debtOf(c) > 0;
  let left = amount;

  c.history
    .filter((h) => h.kind === "debt" && h.status === "pending")
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((h) => {
      if (left <= 0) return;
      const pay = Math.min(h.remaining, left);
      h.remaining = round2(h.remaining - pay);
      left = round2(left - pay);
      if (h.remaining <= 0) { h.remaining = 0; h.status = "paid"; }
    });

  c.history.unshift({ id: "p" + Date.now(), date: isoDate(), kind: "payment", desc: null, amount, status: "paid" });
  state.activity.unshift({ name: c.name, type: "paid", amount, date: isoDate() });

  const o = state.overview;
  o.outstanding = Math.max(0, round2(o.outstanding - amount));
  o.paymentsToday = round2(o.paymentsToday + amount);

  const nowZero = debtOf(c) === 0;
  if (hadDebt && nowZero) {
    o.customersWithDebt = Math.max(0, o.customersWithDebt - 1);
    if (c.overdue) { o.overdue = Math.max(0, o.overdue - 1); c.overdue = false; }
  }
  return nowZero;
}

function doPayment(amount) {
  const c = current();
  const paidAll = applyPayment(c, amount);
  saveState();
  $("payAmount").value = "";
  $("payError").textContent = "";
  renderAll();
  toast(`${t(paidAll ? "ok_paid_all" : "ok_payment")} ${c.name}: ${money(amount)}`);
}

$("registerBtn").addEventListener("click", () => {
  const c = current();
  const debt = debtOf(c);
  const err = $("payError");
  err.textContent = "";

  if (debt <= 0) { err.textContent = t("err_no_debt"); return; }

  const amount = payType() === "full" ? debt : round2(parseFloat($("payAmount").value));
  if (!amount || isNaN(amount) || amount <= 0) { err.textContent = t("err_amount"); return; }
  if (amount > debt) { err.textContent = `${t("err_exceeds")} (${money(debt)})`; return; }

  doPayment(amount);
});

$("markPaidBtn").addEventListener("click", () => {
  const c = current();
  const debt = debtOf(c);
  if (debt <= 0) { $("payError").textContent = t("err_no_debt"); return; }
  if (!window.confirm(t("confirm_paid"))) return;
  doPayment(debt);
});

$("payAmount").addEventListener("input", () => ($("payError").textContent = ""));
$("payAmount").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("registerBtn").click();
});

// ============================================================
//  NUEVA DEUDA (respeta el bloqueo automático)
// ============================================================
const modal = $("debtModal");

function openModal() {
  $("debtDesc").value = "";
  $("debtAmount").value = "";
  $("debtError").textContent = "";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  $("debtDesc").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$("newDebtBtn").addEventListener("click", openModal);
$("debtCancel").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

$("debtForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const c = current();
  const desc = $("debtDesc").value.trim();
  const amount = round2(parseFloat($("debtAmount").value));
  const err = $("debtError");
  err.textContent = "";

  if (!desc) { err.textContent = t("err_desc"); return; }
  if (!amount || isNaN(amount) || amount <= 0) { err.textContent = t("err_amount"); return; }

  const before = debtOf(c);
  const after = round2(before + amount);

  // Bloqueo automático: no permite superar el límite
  if (c.autoBlock && after > c.limit) { err.textContent = t("err_blocked"); return; }

  c.history.unshift({ id: "d" + Date.now(), date: isoDate(), kind: "debt", desc, amount, remaining: amount, status: "pending" });
  state.activity.unshift({ name: c.name, type: "newDebt", amount, date: isoDate() });

  state.overview.outstanding = round2(state.overview.outstanding + amount);
  if (before === 0) state.overview.customersWithDebt += 1;

  saveState();
  closeModal();
  renderAll();
  toast(`${t("ok_debt")} ${c.name}: ${money(amount)}`);
  if (!c.autoBlock && after > c.limit) toast(t("warn_limit"), "error");
});

// ============================================================
//  VER HISTORIAL / ACTIVIDAD COMPLETA
// ============================================================
let historyOpen = false;
$("historyToggle").addEventListener("click", () => {
  historyOpen = !historyOpen;
  $("historyList").classList.toggle("expanded", historyOpen);
  $("historyToggle").textContent = t(historyOpen ? "show_less" : "view_full");
  if (!historyOpen) $("historyList").scrollTop = 0;
});

let activityOpen = false;
$("activityList").classList.add("collapsed");
$("activityToggle").addEventListener("click", () => {
  activityOpen = !activityOpen;
  $("activityList").classList.toggle("collapsed", !activityOpen);
  $("activityToggle").textContent = t(activityOpen ? "show_less" : "view_all");
});

// ============================================================
//  NOTIFICACIONES
// ============================================================
$("bellBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  $("notifPanel").classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".notif")) $("notifPanel").classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { $("notifPanel").classList.remove("open"); closeModal(); }
});

// ============================================================
//  IDIOMA Y MODO OSCURO
// ============================================================
function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));

  $("langLabel").textContent = lang === "en" ? "ES" : "EN";
  $("historyToggle").textContent = t(historyOpen ? "show_less" : "view_full");
  $("activityToggle").textContent = t(activityOpen ? "show_less" : "view_all");

  renderAll();
  try { localStorage.setItem("fiao-lang", lang); } catch (e) {}
}

$("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  applyLanguage();
});

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  $("themeBtn").innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  try { localStorage.setItem("fiao-theme", dark ? "dark" : "light"); } catch (e) {}
}
$("themeBtn").addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));

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