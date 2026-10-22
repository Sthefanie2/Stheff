// ---------- Datos de ejemplo ----------
const customers = [
  { name: "Maria Gomez",    credit: 300, owed: 0 },
  { name: "Carlos Mendoza", credit: 450, owed: 120 },
  { name: "Ana Ruiz",       credit: 250, owed: 85.50 },
  { name: "Luis Herrera",   credit: 200, owed: 134.50 },
  { name: "Sofia Castillo", credit: 150, owed: 0 },
  { name: "Pedro Vega",     credit: 100, owed: 0 }
];

// Orden de la lista = orden de "Recent Credit Transactions"
const ledger = [
  { customer: "Maria Gomez",    desc: "Grocery items & supplies", amount: 45.00,  date: "2026-07-28", status: "ontime"  },
  { customer: "Carlos Mendoza", desc: "Weekly hardware credit",   amount: 120.00, date: "2026-07-25", status: "pending" },
  { customer: "Ana Ruiz",       desc: "Bakery stock order",       amount: 85.50,  date: "2026-07-18", status: "overdue" },
  { customer: "Pedro Vega",     desc: "Cleaning supplies",        amount: 650.00, date: "2026-07-03", status: "ontime"  },
  { customer: "Luis Herrera",   desc: "Wholesale monthly credit", amount: 420.00, date: "2026-07-09", status: "pending" },
  { customer: "Carlos Mendoza", desc: "Tools & fasteners",        amount: 65.00,  date: "2026-07-11", status: "overdue" },
  { customer: "Maria Gomez",    desc: "Bulk rice & grains",       amount: 456.50, date: "2026-07-16", status: "ontime"  },
  { customer: "Pedro Vega",     desc: "Dry goods restock",        amount: 1188.50, date: "2026-07-26", status: "ontime"  },
  { customer: "Luis Herrera",   desc: "Packaging materials",      amount: 90.00,  date: "2026-07-29", status: "overdue" }
];

// Pagos recibidos (alimentan las barras verdes del gráfico)
const payments = [
  { customer: "Pedro Vega",     amount: 960,  date: "2026-07-04" },
  { customer: "Sofia Castillo", amount: 1170, date: "2026-07-11" },
  { customer: "Maria Gomez",    amount: 750,  date: "2026-07-19" },
  { customer: "Pedro Vega",     amount: 1370, date: "2026-07-27" }
];

// ---------- Traducciones ----------
const i18n = {
  en: {
    nav_home: "Home", nav_credit: "Credit", nav_products: "Products", nav_clients: "Clients",
    nav_reports: "Reports", nav_contact: "Contact",
    title: "Reports",
    subtitle: "Financial tracking, credit summaries, and business analytics overview.",
    export_pdf: "Export PDF", export_excel: "Export Excel",
    date_range: "Date range", to: "to", status_name: "Customer status / name",
    all: "All Customers (All Names)", g_status: "By status", g_customer: "By customer",
    ontime: "On Time", pending: "Pending", overdue: "Overdue",
    apply: "Apply Filters",
    kpi_credit: "Total active credit", kpi_collected: "Collected this month",
    kpi_pending: "Pending balances", kpi_customers: "Total customers",
    up_month: "↑ +8.4% from last month", up_eff: "↑ +12.1% efficiency",
    accounts: (n) => `↓ -${n} accounts overdue`, new_month: "+5 new this month",
    chart_title: "Credit Activity & Payments Flow",
    issued: "Credit Issued", received: "Payments Received", week: "Week",
    breakdown: "Payment Status Breakdown", recent: "Recent Credit Transactions",
    th_name: "Customer Name", th_desc: "Description", th_amount: "Amount", th_date: "Date", th_status: "Status",
    empty: "No transactions found for this filter.",
    t_applied: "Filters applied", t_range: "The start date must be before the end date.",
    t_csv: "Excel file downloaded"
  },
  es: {
    nav_home: "Inicio", nav_credit: "Crédito", nav_products: "Productos", nav_clients: "Clientes",
    nav_reports: "Reportes", nav_contact: "Contacto",
    title: "Reportes",
    subtitle: "Seguimiento financiero, resúmenes de crédito y análisis del negocio.",
    export_pdf: "Exportar PDF", export_excel: "Exportar Excel",
    date_range: "Rango de fechas", to: "a", status_name: "Estado / nombre del cliente",
    all: "Todos los clientes (todos los nombres)", g_status: "Por estado", g_customer: "Por cliente",
    ontime: "Al día", pending: "Pendiente", overdue: "Vencido",
    apply: "Aplicar filtros",
    kpi_credit: "Crédito activo total", kpi_collected: "Cobrado este mes",
    kpi_pending: "Saldos pendientes", kpi_customers: "Total de clientes",
    up_month: "↑ +8.4% vs. el mes pasado", up_eff: "↑ +12.1% de eficiencia",
    accounts: (n) => `↓ -${n} cuentas vencidas`, new_month: "+5 nuevos este mes",
    chart_title: "Actividad de crédito y flujo de pagos",
    issued: "Crédito otorgado", received: "Pagos recibidos", week: "Semana",
    breakdown: "Desglose por estado de pago", recent: "Transacciones de crédito recientes",
    th_name: "Nombre del cliente", th_desc: "Descripción", th_amount: "Monto", th_date: "Fecha", th_status: "Estado",
    empty: "No hay transacciones para este filtro.",
    t_applied: "Filtros aplicados", t_range: "La fecha inicial debe ser anterior a la final.",
    t_csv: "Archivo de Excel descargado"
  }
};

// ---------- Estado ----------
const PER_PAGE = 3;
let lang = localStorage.getItem("fiao-lang") || "en";
let applied = { from: "2026-07-01", to: "2026-07-31", sel: "all" };
let page = 1;

const $ = (s) => document.querySelector(s);
const t = (k) => i18n[lang][k];
const usd = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const DAY = 864e5;

// ---------- Lógica ----------
function matches(tx, sel) {
  if (sel === "all") return true;
  const [type, value] = sel.split(":");
  return type === "status" ? tx.status === value : tx.customer === value;
}

const getFiltered = () =>
  ledger.filter((x) => x.date >= applied.from && x.date <= applied.to && matches(x, applied.sel));

// ---------- Render ----------
function renderSelect() {
  const sel = $("#customerSelect");
  const current = applied.sel;
  sel.innerHTML = `
    <option value="all">${t("all")}</option>
    <optgroup label="${t("g_status")}">
      ${["ontime", "pending", "overdue"].map((s) => `<option value="status:${s}">${t(s)}</option>`).join("")}
    </optgroup>
    <optgroup label="${t("g_customer")}">
      ${customers.map((c) => `<option value="cust:${c.name}">${c.name}</option>`).join("")}
    </optgroup>`;
  sel.value = current;
}

function renderKPIs(list) {
  let people = customers;
  if (applied.sel.startsWith("cust:")) {
    people = customers.filter((c) => "cust:" + c.name === applied.sel);
  } else if (applied.sel.startsWith("status:")) {
    const names = new Set(list.map((x) => x.customer));
    people = customers.filter((c) => names.has(c.name));
  }

  const collected = list.reduce((s, x) => s + x.amount, 0);
  const overdueCustomers = new Set(list.filter((x) => x.status === "overdue").map((x) => x.customer)).size;

  $("#kpiCredit").textContent = usd(people.reduce((s, c) => s + c.credit, 0));
  $("#kpiCollected").textContent = usd(collected);
  $("#kpiPending").textContent = usd(people.reduce((s, c) => s + c.owed, 0));
  $("#kpiOverdue").textContent = i18n[lang].accounts(overdueCustomers);
  $("#kpiCustomers").textContent = applied.sel === "all" ? 48 : people.length;
}

function renderChart(list) {
  const start = new Date(applied.from + "T00:00:00");
  const end = new Date(applied.to + "T00:00:00");
  const days = Math.round((end - start) / DAY) + 1;
  const size = days <= 31 ? 7 : Math.ceil(days / 4);
  const weekOf = (d) =>
    Math.min(3, Math.max(0, Math.floor(Math.round((new Date(d + "T00:00:00") - start) / DAY) / size)));

  const weeks = Array.from({ length: 4 }, () => ({ issued: 0, paid: 0, over: 0 }));
  list.forEach((x) => {
    const w = weeks[weekOf(x.date)];
    w.issued += x.amount;
    if (x.status === "overdue") w.over += x.amount;
  });

  const [type, value] = applied.sel.split(":");
  payments
    .filter((p) => p.date >= applied.from && p.date <= applied.to &&
      (applied.sel === "all" || (type === "cust" && p.customer === value) || (type === "status" && value === "ontime")))
    .forEach((p) => (weeks[weekOf(p.date)].paid += p.amount));

  const max = Math.max(1, ...weeks.map((w) => Math.max(w.issued, w.paid, w.over)));
  const bar = (cls, v, label) =>
    `<div class="bar ${cls}" style="height:${(v / max) * 76}%" title="${label}: ${usd(v)}"></div>`;

  $("#chart").innerHTML = weeks.map((w, i) => `
    <div class="week">
      <div class="bars">
        ${bar("issued", w.issued, t("issued"))}
        ${bar("paid", w.paid, t("received"))}
        ${bar("over", w.over, t("overdue"))}
      </div>
      <small>${t("week")} ${i + 1}</small>
    </div>`).join("");
}

function renderBreakdown(list) {
  const total = list.reduce((s, x) => s + x.amount, 0);
  $("#breakdown").innerHTML = ["ontime", "pending", "overdue"].map((s) => {
    const sum = list.filter((x) => x.status === s).reduce((a, x) => a + x.amount, 0);
    const pct = total ? (sum / total) * 100 : 0;
    return `
      <div class="b-row">
        <div class="b-top"><span>${t(s)} (${Math.round(pct)}%)</span><span>$${Math.floor(sum).toLocaleString("en-US")}</span></div>
        <div class="track"><div class="fill ${s}" style="width:${pct}%"></div></div>
      </div>`;
  }).join("");
}

function renderTable(list) {
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  page = Math.min(page, pages);
  const rows = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  $("#txRows").innerHTML = rows.map((x) => `
    <tr>
      <td>${x.customer}</td>
      <td>${x.desc}</td>
      <td>${usd(x.amount)}</td>
      <td>${x.date}</td>
      <td><span class="badge ${x.status}">${t(x.status)}</span></td>
    </tr>`).join("");

  $("#emptyMsg").hidden = list.length > 0;
  $("#pager").innerHTML = list.length
    ? Array.from({ length: pages }, (_, i) =>
        `<button data-page="${i + 1}" class="${i + 1 === page ? "active" : ""}">${i + 1}</button>`).join("")
    : "";
}

function renderAll() {
  const list = getFiltered();
  renderKPIs(list);
  renderChart(list);
  renderBreakdown(list);
  renderTable(list);
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  renderSelect();
  renderAll();
}

// ---------- Utilidades ----------
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function exportCSV() {
  const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const header = [t("th_name"), t("th_desc"), t("th_amount"), t("th_date"), t("th_status")].map(q).join(",");
  const lines = getFiltered().map((x) =>
    [x.customer, x.desc, x.amount.toFixed(2), x.date, t(x.status)].map(q).join(","));
  const blob = new Blob(["\uFEFF" + [header, ...lines].join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `fiao-reports-${applied.from}_${applied.to}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast(t("t_csv"));
}

// ---------- Eventos ----------
$("#applyBtn").addEventListener("click", () => {
  const from = $("#dateFrom").value;
  const to = $("#dateTo").value;
  if (!from || !to || from > to) return toast(t("t_range"));
  applied = { from, to, sel: $("#customerSelect").value };
  page = 1;
  renderAll();
  toast(t("t_applied"));
});

$("#pager").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  page = Number(b.dataset.page);
  renderTable(getFiltered());
});

$("#xlsBtn").addEventListener("click", exportCSV);
$("#pdfBtn").addEventListener("click", () => window.print());

$("#langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  localStorage.setItem("fiao-lang", lang);
  applyLanguage();
});

$("#themeBtn").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("fiao-theme", dark ? "dark" : "light");
});

// ---------- Inicio ----------
if (localStorage.getItem("fiao-theme") === "dark") document.body.classList.add("dark");
applyLanguage();