(() => {
  "use strict";

  /* =====================================================
     1. DATOS DE EJEMPLO
     👉 Cuando tengas backend, reemplaza este arreglo con
        los datos que vengan de tu API (fetch).
     Formato: [cliente, descripción, monto, fecha, estado]
     estado: "ontime" | "pending" | "overdue"
     ===================================================== */
  const RAW = [
    ["Maria Gomez", "Grocery items & supplies", 45.0, "2026-07-28", "ontime"],
    ["Luis Herrera", "Pharmacy supplies", 210.0, "2026-07-27", "ontime"],
    ["Sofia Castillo", "School stationery", 64.75, "2026-07-26", "ontime"],
    ["Carlos Mendoza", "Weekly hardware credit", 120.0, "2026-07-25", "pending"],
    ["Jorge Pineda", "Cleaning products", 98.0, "2026-07-24", "pending"],
    ["Elena Vargas", "Fresh produce order", 150.25, "2026-07-22", "ontime"],
    ["Ricardo Diaz", "Auto parts credit", 310.0, "2026-07-21", "overdue"],
    ["Daniela Ortega", "Beverages & snacks", 72.4, "2026-07-20", "ontime"],
    ["Miguel Torres", "Construction materials", 420.0, "2026-07-19", "ontime"],
    ["Ana Ruiz", "Bakery stock order", 85.5, "2026-07-18", "overdue"],
    ["Carmen Salazar", "Cosmetics stock", 56.3, "2026-07-16", "pending"],
    ["Pedro Batista", "Frozen goods", 133.6, "2026-07-15", "ontime"],
    ["Maria Gomez", "Dairy products", 38.9, "2026-07-14", "ontime"],
    ["Ana Ruiz", "Flour & sugar", 92.0, "2026-07-12", "ontime"],
    ["Carlos Mendoza", "Paint & brushes", 175.0, "2026-07-10", "ontime"],
    ["Luis Herrera", "Vitamins & supplements", 88.1, "2026-07-09", "pending"],
    ["Jorge Pineda", "Packaging material", 47.25, "2026-07-08", "ontime"],
    ["Elena Vargas", "Spices & condiments", 29.8, "2026-07-07", "ontime"],
    ["Ricardo Diaz", "Tires & lubricants", 265.0, "2026-07-05", "ontime"],
    ["Sofia Castillo", "Uniform fabrics", 112.0, "2026-07-03", "overdue"],
    ["Daniela Ortega", "Party supplies", 66.0, "2026-07-02", "ontime"],
    ["Miguel Torres", "Electrical cables", 198.5, "2026-07-01", "ontime"],
    ["Maria Gomez", "Cleaning supplies", 52.0, "2026-06-27", "ontime"],
    ["Pedro Batista", "Seafood order", 144.0, "2026-06-24", "ontime"],
    ["Carmen Salazar", "Hair care products", 61.2, "2026-06-20", "overdue"],
    ["Carlos Mendoza", "Plumbing parts", 140.0, "2026-06-15", "ontime"],
    ["Luis Herrera", "First aid kits", 95.0, "2026-06-10", "ontime"],
    ["Jorge Pineda", "Office supplies", 78.0, "2026-06-05", "pending"],
    ["Elena Vargas", "Rice & beans", 83.5, "2026-06-02", "ontime"],
    ["Ana Ruiz", "Bakery stock order", 91.0, "2026-08-04", "pending"],
    ["Sofia Castillo", "Notebooks", 40.0, "2026-08-06", "ontime"],
    ["Ricardo Diaz", "Brake pads", 220.0, "2026-08-09", "pending"],
    ["Maria Gomez", "Grocery items & supplies", 47.5, "2026-08-12", "ontime"],
    ["Miguel Torres", "Cement bags", 380.0, "2026-08-15", "ontime"],
    ["Daniela Ortega", "Birthday decorations", 58.0, "2026-08-18", "overdue"],
  ];

  const DATA = RAW.map(([customer, desc, amount, date, status], i) => ({
    id: i + 1, customer, desc, amount, date, status,
  })).sort((a, b) => b.date.localeCompare(a.date));

  const CUSTOMERS = [...new Set(DATA.map((r) => r.customer))].sort();

  // Primera fecha en la que aparece cada cliente (para contar "nuevos")
  const FIRST_SEEN = {};
  DATA.forEach((r) => {
    if (!FIRST_SEEN[r.customer] || r.date < FIRST_SEEN[r.customer]) FIRST_SEEN[r.customer] = r.date;
  });

  /* =====================================================
     2. TRADUCCIONES (botón de idioma EN / ES)
     ===================================================== */
  const I18N = {
    en: {
      subtitle: "Financial tracking, credit summaries, and business analytics overview.",
      exportPdf: "Export PDF", exportExcel: "Export Excel",
      dateRange: "Date Range", to: "to",
      customerLabel: "Customer Status / Name", allCustomers: "All Customers (All Names)",
      byStatus: "By status", byName: "By customer", applyFilters: "Apply Filters",
      kpiActive: "Total Active Credit", kpiCollected: "Collected This Month",
      kpiPending: "Pending Balances", kpiCustomers: "Total Customers",
      chartTitle: "Credit Activity & Payments Flow",
      legIssued: "Credit Issued", legPaid: "Payments Received", legOverdue: "Overdue",
      breakdownTitle: "Payment Status Breakdown",
      onTime: "On Time", pending: "Pending", overdue: "Overdue",
      tableTitle: "Recent Credit Transactions",
      colCustomer: "Customer Name", colDesc: "Description", colAmount: "Amount",
      colDate: "Date", colStatus: "Status", week: "Week",
      empty: "No transactions match these filters.", noChart: "No data for this period",
      records: "{n} records", oneRecord: "1 record",
      fromLast: "from last month", fromPrev: "from previous period", effic: "efficiency",
      accountsOverdue: "{n} accounts overdue", oneOverdue: "1 account overdue", noOverdue: "no accounts overdue",
      newMonth: "+{n} new this month", newPeriod: "+{n} new in this period", brandNew: "new",
      themeDark: "Switch to dark mode", themeLight: "Switch to light mode", langBtn: "Change language",
      toastApplied: "Filters applied: {n} records", toastRange: "The start date must be before the end date.",
      toastCsv: "Excel file (.csv) downloaded", toastNoData: "There is no data to export with these filters.",
      toastDates: "Please choose both dates.",
      cTx: "Transactions", cCredit: "Total credit", cPaid: "Paid", cOwed: "Outstanding", cLast: "Last purchase",
      cSince: "Customer since {d}", prev: "Previous page", next: "Next page", page: "Page",
      statusFilter: "Status: {s}", customerChip: "Customer: {c}", allChip: "All customers",
    },
    es: {
      subtitle: "Seguimiento financiero, resúmenes de crédito y análisis del negocio.",
      exportPdf: "Exportar PDF", exportExcel: "Exportar Excel",
      dateRange: "Rango de fechas", to: "a",
      customerLabel: "Estado / Nombre del cliente", allCustomers: "Todos los clientes (todos los nombres)",
      byStatus: "Por estado", byName: "Por cliente", applyFilters: "Aplicar filtros",
      kpiActive: "Crédito activo total", kpiCollected: "Cobrado este mes",
      kpiPending: "Saldos pendientes", kpiCustomers: "Total de clientes",
      chartTitle: "Actividad de crédito y flujo de pagos",
      legIssued: "Crédito otorgado", legPaid: "Pagos recibidos", legOverdue: "Vencido",
      breakdownTitle: "Desglose del estado de pagos",
      onTime: "A tiempo", pending: "Pendiente", overdue: "Vencido",
      tableTitle: "Transacciones de crédito recientes",
      colCustomer: "Nombre del cliente", colDesc: "Descripción", colAmount: "Monto",
      colDate: "Fecha", colStatus: "Estado", week: "Semana",
      empty: "No hay transacciones con estos filtros.", noChart: "Sin datos en este período",
      records: "{n} registros", oneRecord: "1 registro",
      fromLast: "respecto al mes pasado", fromPrev: "respecto al período anterior", effic: "de eficiencia",
      accountsOverdue: "{n} cuentas vencidas", oneOverdue: "1 cuenta vencida", noOverdue: "sin cuentas vencidas",
      newMonth: "+{n} nuevos este mes", newPeriod: "+{n} nuevos en este período", brandNew: "nuevo",
      themeDark: "Cambiar a modo oscuro", themeLight: "Cambiar a modo claro", langBtn: "Cambiar idioma",
      toastApplied: "Filtros aplicados: {n} registros", toastRange: "La fecha inicial debe ser anterior a la final.",
      toastCsv: "Archivo de Excel (.csv) descargado", toastNoData: "No hay datos para exportar con estos filtros.",
      toastDates: "Elige las dos fechas.",
      cTx: "Transacciones", cCredit: "Crédito total", cPaid: "Pagado", cOwed: "Pendiente de pago", cLast: "Última compra",
      cSince: "Cliente desde {d}", prev: "Página anterior", next: "Página siguiente", page: "Página",
      statusFilter: "Estado: {s}", customerChip: "Cliente: {c}", allChip: "Todos los clientes",
    },
  };

  /* =====================================================
     3. ESTADO Y UTILIDADES
     ===================================================== */
  const PAGE_SIZE = 5;
  const DAY = 864e5;
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
  };

  let lang = store.get("fiao-lang") === "es" ? "es" : "en";
  let page = 1;
  let printing = false;
  let applied = { from: "2026-07-01", to: "2026-07-31", customer: "all" };

  const t = (key, vars = {}) =>
    (I18N[lang][key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  const locale = () => (lang === "es" ? "es-PA" : "en-US");
  const ms = (iso) => Date.parse(iso + "T00:00:00Z");
  const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sum = (rows) => rows.reduce((s, r) => s + r.amount, 0);
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const statusLabel = (s) => t(s === "ontime" ? "onTime" : s);
  const fmtDate = (iso) =>
    new Date(ms(iso)).toLocaleDateString(locale(), { timeZone: "UTC" });

  let toastTimer;
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* =====================================================
     4. FILTRADO Y CÁLCULOS
     ===================================================== */
  function matchCustomer(row, customer) {
    if (customer === "all") return true;
    if (customer.startsWith("status:")) return row.status === customer.slice(7);
    if (customer.startsWith("name:")) return row.customer === customer.slice(5);
    return true;
  }

  function filterRows(from, to, customer) {
    const a = ms(from), b = ms(to);
    return DATA.filter((r) => {
      const d = ms(r.date);
      return d >= a && d <= b && matchCustomer(r, customer);
    });
  }

  function previousRange(from, to) {
    const len = Math.round((ms(to) - ms(from)) / DAY) + 1;
    const prevTo = ms(from) - DAY;
    const prevFrom = prevTo - (len - 1) * DAY;
    const iso = (x) => new Date(x).toISOString().slice(0, 10);
    return { from: iso(prevFrom), to: iso(prevTo), days: len };
  }

  function metrics(rows) {
    const ontime = rows.filter((r) => r.status === "ontime");
    const pending = rows.filter((r) => r.status === "pending");
    const overdue = rows.filter((r) => r.status === "overdue");
    return {
      issued: sum(rows),
      collected: sum(ontime),
      owed: sum(pending) + sum(overdue),
      ontime: sum(ontime), pending: sum(pending), overdue: sum(overdue),
      overdueCount: new Set(overdue.map((r) => r.customer)).size,
      customers: new Set(rows.map((r) => r.customer)),
    };
  }

  function changePct(cur, prev) {
    if (prev === 0) return cur === 0 ? 0 : null;
    return ((cur - prev) / prev) * 100;
  }

  /* =====================================================
     5. RENDER: TARJETAS (KPI)
     ===================================================== */
  function setDelta(id, up, text) {
    const el = $(id);
    el.className = "kpi__delta " + (up ? "up" : "down");
    el.innerHTML = `${icon(up ? "arrow-up" : "arrow-down")}<span>${text}</span>`;
  }

  function pctText(p, suffixKey) {
    if (p === null) return `${t("brandNew")} ${t(suffixKey)}`;
    const sign = p >= 0 ? "+" : "-";
    return `${sign}${Math.abs(p).toFixed(1)}% ${t(suffixKey)}`;
  }

  function renderKPIs(rows) {
    const cur = metrics(rows);
    const prevR = previousRange(applied.from, applied.to);
    const prev = metrics(filterRows(prevR.from, prevR.to, applied.customer));
    const suffix = prevR.days >= 28 && prevR.days <= 31 ? "fromLast" : "fromPrev";

    $("kpiActive").textContent = money(cur.issued);
    $("kpiCollected").textContent = money(cur.collected);
    $("kpiPending").textContent = money(cur.owed);
    $("kpiCustomers").textContent = cur.customers.size;

    const pA = changePct(cur.issued, prev.issued);
    setDelta("kpiActiveDelta", pA === null || pA >= 0, pctText(pA, suffix));

    const pC = changePct(cur.collected, prev.collected);
    setDelta("kpiCollectedDelta", pC === null || pC >= 0, pctText(pC, "effic"));

    const n = cur.overdueCount;
    setDelta("kpiPendingDelta", n === 0,
      n === 0 ? t("noOverdue") : n === 1 ? t("oneOverdue") : t("accountsOverdue", { n }));

    const newOnes = [...cur.customers].filter(
      (c) => FIRST_SEEN[c] >= applied.from && FIRST_SEEN[c] <= applied.to).length;
    const days = prevR.days;
    setDelta("kpiCustomersDelta", true,
      t(days >= 28 && days <= 31 ? "newMonth" : "newPeriod", { n: newOnes }));
    $("kpiCustomersDelta").querySelector("use").setAttribute("href", "#i-user-plus");
  }

  /* =====================================================
     6. RENDER: GRÁFICA DE BARRAS
     ===================================================== */
  function buildBuckets(from, to) {
    const start = ms(from), end = ms(to);
    const days = Math.round((end - start) / DAY) + 1;
    const buckets = [];

    if (days <= 35) {
      // Semanas (se reparten en partes iguales)
      const n = Math.max(1, Math.round(days / 7));
      for (let i = 0; i < n; i++) {
        buckets.push({
          from: start + Math.floor((i * days) / n) * DAY,
          to: start + Math.floor(((i + 1) * days) / n) * DAY - DAY,
          label: `${t("week")} ${i + 1}`,
        });
      }
    } else {
      // Meses
      let d = new Date(start);
      d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
      while (d.getTime() <= end) {
        const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
        buckets.push({
          from: Math.max(d.getTime(), start),
          to: Math.min(next - DAY, end),
          label: d.toLocaleDateString(locale(), { month: "short", year: "numeric", timeZone: "UTC" }),
        });
        d = new Date(next);
      }
    }
    return buckets;
  }

  function renderChart(rows) {
    const buckets = buildBuckets(applied.from, applied.to).map((b) => {
      const inB = rows.filter((r) => ms(r.date) >= b.from && ms(r.date) <= b.to);
      return { ...b, issued: sum(inB), paid: metrics(inB).collected, overdue: metrics(inB).overdue };
    });

    const max = Math.max(...buckets.map((b) => b.issued), 0);
    const chart = $("chart");

    if (max === 0) {
      chart.innerHTML = `<div class="chart__empty">${t("noChart")}</div>`;
      return;
    }

    const bar = (cls, value, label) => {
      const h = value > 0 ? Math.max(4, (value / max) * 100) : 0;
      return `<div class="bar bar--${cls}" data-h="${h}" data-tip="${label}: ${money(value)}"></div>`;
    };

    chart.innerHTML = `<div class="chart__plot">${buckets.map((b) => `
      <div class="bar-group">
        <div class="bars">
          ${bar("gold", b.issued, t("legIssued"))}
          ${bar("green", b.paid, t("legPaid"))}
          ${bar("red", b.overdue, t("legOverdue"))}
        </div>
        <span class="bar-label">${b.label}</span>
      </div>`).join("")}</div>`;

    // Animación: las barras suben desde 0
    requestAnimationFrame(() => requestAnimationFrame(() => {
      chart.querySelectorAll(".bar").forEach((el) => (el.style.height = el.dataset.h + "%"));
    }));
  }

  /* =====================================================
     7. RENDER: DESGLOSE DE PAGOS
     ===================================================== */
  function renderBreakdown(rows) {
    const m = metrics(rows);
    const total = m.issued;
    const items = [
      { key: "onTime", amount: m.ontime, cls: "green" },
      { key: "pending", amount: m.pending, cls: "gold" },
      { key: "overdue", amount: m.overdue, cls: "red" },
    ];

    $("breakdown").innerHTML = items.map((it) => {
      const pct = total ? Math.round((it.amount / total) * 100) : 0;
      return `
        <div class="break-row">
          <div class="break-row__top"><span>${t(it.key)} (${pct}%)</span><span>${money(it.amount)}</span></div>
          <div class="track"><div class="fill fill--${it.cls}" data-w="${pct}"></div></div>
        </div>`;
    }).join("");

    requestAnimationFrame(() => requestAnimationFrame(() => {
      $("breakdown").querySelectorAll(".fill").forEach((el) => (el.style.width = el.dataset.w + "%"));
    }));
  }

  /* =====================================================
     8. RENDER: TABLA CON PAGINACIÓN
     ===================================================== */
  function pageList(cur, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const set = new Set([1, total, cur - 1, cur, cur + 1]);
    if (cur <= 3) { set.add(2); set.add(3); }
    if (cur >= total - 2) { set.add(total - 1); set.add(total - 2); }
    const list = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out = [];
    list.forEach((p, i) => {
      if (i && p - list[i - 1] > 1) out.push("…");
      out.push(p);
    });
    return out;
  }

  function renderTable() {
    const rows = filterRows(applied.from, applied.to, applied.customer);
    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    page = Math.min(page, totalPages);

    // Al imprimir/PDF se muestran todas las filas
    const visible = printing ? rows : rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    $("tableCount").textContent = rows.length === 1 ? t("oneRecord") : t("records", { n: rows.length });

    $("tableBody").innerHTML = visible.length
      ? visible.map((r) => `
        <tr>
          <td>${r.customer}</td>
          <td>${r.desc}</td>
          <td>${money(r.amount)}</td>
          <td>${r.date}</td>
          <td><span class="badge badge--${r.status}">${statusLabel(r.status)}</span></td>
        </tr>`).join("")
      : `<tr class="empty-row"><td colspan="5">${t("empty")}</td></tr>`;

    const pag = $("pagination");
    if (printing || totalPages === 1) { pag.innerHTML = ""; return; }

    pag.innerHTML =
      `<button class="page-btn" data-page="${page - 1}" ${page === 1 ? "disabled" : ""} aria-label="${t("prev")}">${icon("chevron-left")}</button>` +
      pageList(page, totalPages).map((p) =>
        p === "…"
          ? `<span class="page-gap">…</span>`
          : `<button class="page-btn ${p === page ? "active" : ""}" data-page="${p}" aria-label="${t("page")} ${p}" ${p === page ? 'aria-current="page"' : ""}>${p}</button>`
      ).join("") +
      `<button class="page-btn" data-page="${page + 1}" ${page === totalPages ? "disabled" : ""} aria-label="${t("next")}">${icon("chevron-right")}</button>`;
  }

  $("pagination").addEventListener("click", (e) => {
    const btn = e.target.closest(".page-btn");
    if (!btn || btn.disabled) return;
    page = Number(btn.dataset.page);
    renderTable();
  });

  /* =====================================================
     9. RENDER: FILTROS APLICADOS Y RESUMEN DEL CLIENTE
     ===================================================== */
  function customerText() {
    const c = applied.customer;
    if (c === "all") return t("allChip");
    if (c.startsWith("status:")) {
      const s = c.slice(7);
      return t("statusFilter", { s: statusLabel(s) });
    }
    return t("customerChip", { c: c.slice(5) });
  }

  function renderChips(count) {
    $("chips").innerHTML = [
      `${fmtDate(applied.from)} – ${fmtDate(applied.to)}`,
      customerText(),
      count === 1 ? t("oneRecord") : t("records", { n: count }),
    ].map((x) => `<span class="chip">${x}</span>`).join("");
  }

  function renderClientCard(rows) {
    const card = $("clientCard");
    if (!applied.customer.startsWith("name:")) { card.hidden = true; return; }

    const name = applied.customer.slice(5);
    const m = metrics(rows);
    card.hidden = false;
    $("clientAvatar").textContent = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
    $("clientName").textContent = name;
    $("clientMeta").textContent = t("cSince", { d: fmtDate(FIRST_SEEN[name]) });

    const last = rows.length ? rows[0].date : null; // ya vienen ordenadas por fecha
    const stats = [
      [t("cTx"), rows.length],
      [t("cCredit"), money(m.issued)],
      [t("cPaid"), money(m.collected)],
      [t("cOwed"), money(m.owed)],
      [t("cLast"), last ? fmtDate(last) : "—"],
    ];
    $("clientStats").innerHTML = stats
      .map(([l, v]) => `<div class="client-stat"><span>${l}</span><strong>${v}</strong></div>`).join("");
  }

  /* =====================================================
     10. RENDER GENERAL
     ===================================================== */
  function render() {
    const rows = filterRows(applied.from, applied.to, applied.customer);
    renderChips(rows.length);
    renderClientCard(rows);
    renderKPIs(rows);
    renderChart(rows);
    renderBreakdown(rows);
    renderTable();
  }

  /* =====================================================
     11. FORMULARIO DE FILTROS (Apply Filters)
     ===================================================== */
  function buildCustomerOptions() {
    const sel = $("customerSelect");
    const current = sel.value || applied.customer;
    sel.innerHTML = "";

    const opt = (value, text) => {
      const o = document.createElement("option");
      o.value = value; o.textContent = text;
      return o;
    };
    const group = (label, items) => {
      const g = document.createElement("optgroup");
      g.label = label;
      items.forEach((i) => g.appendChild(opt(...i)));
      return g;
    };

    sel.appendChild(opt("all", t("allCustomers")));
    sel.appendChild(group(t("byStatus"), [
      ["status:ontime", t("onTime")],
      ["status:pending", t("pending")],
      ["status:overdue", t("overdue")],
    ]));
    sel.appendChild(group(t("byName"), CUSTOMERS.map((c) => ["name:" + c, c])));
    sel.value = current;
  }

  $("filterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const from = $("dateFrom").value;
    const to = $("dateTo").value;
    const msg = $("filterMsg");

    if (!from || !to) { msg.textContent = t("toastDates"); return; }
    if (from > to) { msg.textContent = t("toastRange"); return; }
    msg.textContent = "";

    applied = { from, to, customer: $("customerSelect").value };
    page = 1;
    render();
    toast(t("toastApplied", { n: filterRows(from, to, applied.customer).length }));
  });

  /* =====================================================
     12. EXPORTAR PDF (ventana de impresión)
     ===================================================== */
  $("exportPdf").addEventListener("click", () => window.print());

  let themeBeforePrint, titleBeforePrint;

  window.addEventListener("beforeprint", () => {
    printing = true;
    themeBeforePrint = root.dataset.theme;
    titleBeforePrint = document.title;
    root.dataset.theme = "light";                       // el PDF siempre en modo claro
    document.title = `FIAO_Report_${applied.from}_to_${applied.to}`; // nombre sugerido del PDF
    renderTable();                                      // todas las filas, sin paginación
  });

  window.addEventListener("afterprint", () => {
    printing = false;
    root.dataset.theme = themeBeforePrint;
    document.title = titleBeforePrint;
    renderTable();
  });

  /* =====================================================
     13. EXPORTAR EXCEL (.csv con los filtros aplicados)
     ===================================================== */
  const csvCell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;                // evita fórmulas inyectadas
    return `"${s.replace(/"/g, '""')}"`;
  };

  $("exportExcel").addEventListener("click", () => {
    const rows = filterRows(applied.from, applied.to, applied.customer);
    if (!rows.length) { toast(t("toastNoData")); return; }

    const header = [t("colCustomer"), t("colDesc"), t("colAmount"), t("colDate"), t("colStatus")];
    const lines = [header, ...rows.map((r) => [r.customer, r.desc, r.amount.toFixed(2), r.date, statusLabel(r.status)])]
      .map((cols) => cols.map(csvCell).join(","));

    // "sep=," hace que Excel separe bien las columnas en cualquier idioma; el BOM conserva las tildes
    const csv = "\uFEFF" + "sep=,\r\n" + lines.join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `FIAO_Report_${applied.from}_to_${applied.to}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(t("toastCsv"));
  });

  /* =====================================================
     14. MODO CLARO / OSCURO
     ===================================================== */
  function paintTheme() {
    const dark = root.dataset.theme === "dark";
    $("themeUse").setAttribute("href", dark ? "#i-sun" : "#i-moon");
    const label = dark ? t("themeLight") : t("themeDark");
    $("themeBtn").title = label;
    $("themeBtn").setAttribute("aria-label", label);
    $("themeBtn").setAttribute("aria-pressed", String(dark));
  }

  $("themeBtn").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("fiao-theme", root.dataset.theme);
    paintTheme();
  });

  /* =====================================================
     15. IDIOMA (EN / ES)
     ===================================================== */
  function applyLanguage() {
    root.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.dataset.i18nTitle);
      el.setAttribute("aria-label", t(el.dataset.i18nTitle));
    });
    buildCustomerOptions();
    paintTheme();
    render();
  }

  $("langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";
    store.set("fiao-lang", lang);
    applyLanguage();
  });

  /* =====================================================
     16. INICIO
     ===================================================== */
  applyLanguage();
})();