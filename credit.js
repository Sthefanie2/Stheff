/* ===== Traducciones ===== */
const I18N = {
  es: {
    nav:['Inicio','Crédito','Productos','Clientes','Reportes','Contacto'],
    title1:'Deudas', title2:'y Pagos', subtitle:'Administra las deudas, registra pagos y controla los saldos fácilmente.',
    selectCustomer:'Seleccionar cliente', addCustomer:'+ Agregar cliente', currentDebt:'Deuda actual', creditLimit:'Límite de crédito',
    used:'usado', limit:'Límite: ', limitWarn:'El cliente alcanzó el límite de crédito.',
    autoBlock:'Bloqueo automático', autoBlockDesc:'Si un cliente supera el límite de deuda, el sistema impide nuevos créditos.',
    debtHistory:'Historial de deudas', debtHistoryDesc:'Consulta todas las compras y pagos.', viewHistory:'Ver historial completo →',
    registerPayment:'Registrar pago', registerPaymentDesc:'Registra los pagos realizados por el cliente.',
    amount:'Monto del pago', type:'Tipo de pago', partial:'Pago parcial', full:'Pago total', registerBtn:'Registrar pago', markPaid:'Marcar como pagado',
    recent:'Actividad reciente', viewActivity:'Ver toda la actividad →', overview:'Resumen de deudas',
    outstanding:'Deuda pendiente', today:'Pagos de hoy', withDebt:'Clientes con deuda', overdue:'Vencidas',
    pending:'Pendiente', paid:'Pagado', todayW:'Hoy', yesterday:'Ayer', daysAgo:'Hace {n} días', fiado:'Fiado', pago:'Pago', abono:'Abono',
    payReceived:'Pago recibido', fullPayment:'Pago total', paidLabel:'Pagó', newDebt:'Nueva deuda',
    addCustomerT:'Agregar cliente', fullName:'Nombre completo', limitLbl:'Límite de crédito (B/.)', saveCustomer:'Guardar cliente', namePh:'Nombre del cliente',
    fullHistoryT:'Historial completo de deudas', allActivityT:'Toda la actividad', notifT:'Notificaciones', noNotif:'Sin notificaciones',
    errAmount:'Ingresa un monto válido.', errExceeds:'El monto supera la deuda actual.', errNoDebt:'Este cliente no tiene deuda.',
    okPayment:'Pago registrado correctamente.', okPaid:'Deuda marcada como pagada.', okCustomer:'Cliente agregado.',
    nPayment:'Pago de {a} registrado para {c}', nPaid:'{c} saldó su deuda', nCustomer:'Nuevo cliente: {c}',
    n1:'Carlos Gómez tiene una deuda cerca del límite', n2:'Recordatorio: hay cuentas con pagos pendientes', n3:'Bienvenido a FIA\'O',
    footer:['FIA\'O · Sistema de gestión de deudas','Crédito y pagos de clientes'], close:'Cerrar'
  },
  en: {
    nav:['Home','Credit','Products','Clients','Reports','Contact'],
    title1:'Debts', title2:'Payments', subtitle:'Manage customer debts, register payments, and track balances easily.',
    selectCustomer:'Select a Customer', addCustomer:'+ Add Customer', currentDebt:'Current Debt', creditLimit:'Credit Limit',
    used:'used', limit:'Limit: ', limitWarn:'Customer has reached the credit limit.',
    autoBlock:'Automatic Blocking', autoBlockDesc:'If a customer exceeds the debt limit, system prevents new credits.',
    debtHistory:'Debt History', debtHistoryDesc:'Track all purchases and payments.', viewHistory:'View Full History →',
    registerPayment:'Register Payment', registerPaymentDesc:'Record payments made by the customer.',
    amount:'Payment Amount', type:'Payment Type', partial:'Partial Payment', full:'Full Payment', registerBtn:'Register Payment', markPaid:'Mark as Paid',
    recent:'Recent Activity', viewActivity:'View all activity →', overview:'Debt Overview',
    outstanding:'Outstanding Debt', today:'Payments Today', withDebt:'Customers with Debt', overdue:'Overdue',
    pending:'Pending', paid:'Paid', todayW:'Today', yesterday:'Yesterday', daysAgo:'{n} days ago', fiado:'Fiado', pago:'Payment', abono:'Abono',
    payReceived:'Payment Received', fullPayment:'Full Payment', paidLabel:'Paid', newDebt:'New debt',
    addCustomerT:'Add Customer', fullName:'Full name', limitLbl:'Credit limit (B/.)', saveCustomer:'Save Customer', namePh:'Customer name',
    fullHistoryT:'Full Debt History', allActivityT:'All Activity', notifT:'Notifications', noNotif:'No notifications',
    errAmount:'Enter a valid amount.', errExceeds:'Amount exceeds the current debt.', errNoDebt:'This customer has no debt.',
    okPayment:'Payment registered successfully.', okPaid:'Debt marked as paid.', okCustomer:'Customer added.',
    nPayment:'Payment of {a} registered for {c}', nPaid:'{c} settled their debt', nCustomer:'New customer: {c}',
    n1:'Carlos Gómez is close to the debt limit', n2:'Reminder: some accounts have pending payments', n3:'Welcome to FIA\'O',
    footer:['FIA\'O · Debt Management System','Customer credit and payments'], close:'Close'
  }
};

/* ===== Iconos SVG profesionales ===== */
const P = {
  user:'<path fill="currentColor" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5Z"/>',
  bell:'<path fill="currentColor" d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5-6.7V3a2 2 0 1 0-4 0v1.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/>',
  globe:'<path fill="none" stroke="currentColor" stroke-width="2" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  moon:'<path fill="currentColor" d="M21 13.5A9 9 0 0 1 10.5 3a9 9 0 1 0 10.5 10.5Z"/>',
  sun:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
  shield:'<path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Z"/>',
  cart:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 4h2l2.4 11h10.2L20 7H6M9 20h.01M17 20h.01"/>',
  cash:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M3 6h18v12H3zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>',
  wallet:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0 2-3h12M16 14h2"/>'
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;

/* ===== Estado ===== */
const DAY = 86400000, NOW = Date.now();
const seed = {
  lang:'es', theme:'light', selected:1, nextId:4, block:true,
  customers:[
    {id:1, name:'Ramón Batista', limit:100, history:[
      {ts:NOW-14*DAY, label:'Groceries Pack', sub:'fiado', amount:57.5, status:'pending'},
      {ts:NOW-9*DAY,  label:'payReceived', sub:'abono', amount:-20, status:'paid'},
      {ts:NOW-5*DAY,  label:'Detergent', sub:'fiado', amount:4.5, status:'pending'},
      {ts:NOW-2*DAY,  label:'Milk (2)', sub:'fiado', amount:8, status:'pending'},
      {ts:NOW-1000,   label:'payReceived', sub:'abono', amount:-15, status:'paid'}]},
    {id:2, name:'Carlos Gómez', limit:80, history:[{ts:NOW-DAY, label:'Groceries', sub:'fiado', amount:12.5, status:'pending'}]},
    {id:3, name:'Ana Martínez', limit:60, history:[{ts:NOW-DAY, label:'payReceived', sub:'abono', amount:-20, status:'paid'}]}
  ],
  activity:[
    {ts:NOW, kind:'paid', who:'Ramón Batista', amount:15},
    {ts:NOW-DAY, kind:'debt', who:'Carlos Gómez', amount:12.5},
    {ts:NOW-DAY, kind:'pay', who:'Ana Martínez', amount:20}
  ],
  notifs:[{id:1,key:'n1',ts:NOW,read:false},{id:2,key:'n2',ts:NOW-DAY,read:false},{id:3,key:'n3',ts:NOW-2*DAY,read:false}]
};
let S;
try { S = JSON.parse(localStorage.getItem('fiao_credit_v1')) || seed; } catch (e) { S = seed; }
const persist = () => { try { localStorage.setItem('fiao_credit_v1', JSON.stringify(S)); } catch (e) {} };

/* ===== Helpers ===== */
const $ = id => document.getElementById(id);
const q = (s, r = document) => r.querySelector(s);
const T = () => I18N[S.lang];
const fmt = (s, p = {}) => s.replace(/\{(\w+)\}/g, (_, k) => p[k]);
const money = n => 'B/. ' + Math.abs(n).toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cust = () => S.customers.find(c => c.id === S.selected);
const debtOf = c => Math.max(0, c.history.reduce((s, h) => s + h.amount, 0));
const dayDiff = ts => Math.round((new Date().setHours(0,0,0,0) - new Date(ts).setHours(0,0,0,0)) / DAY);
const whenTxt = ts => { const d = dayDiff(ts), t = T(); return d <= 0 ? t.todayW : d === 1 ? t.yesterday : fmt(t.daysAgo, {n:d}); };
const labelOf = h => T()[h.label] || h.label;

/* Cambia solo el último texto de un elemento sin borrar sus hijos (íconos, <b>, etc.) */
function setText(el, text) {
  if (!el) return;
  const nodes = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
  if (nodes.length) nodes[nodes.length - 1].textContent = ' ' + text + ' ';
  else el.appendChild(document.createTextNode(' ' + text));
}
let toastTimer;
function message(txt, type) {
  const m = $('paymentMessage'); m.textContent = txt; m.className = 'form-message ' + type;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { m.textContent = ''; }, 3500);
}
const addNotif = (key, p = {}) => S.notifs.unshift({id:Date.now() + Math.random(), key, p, ts:Date.now(), read:false});
const logActivity = (kind, who, amount) => S.activity.unshift({ts:Date.now(), kind, who, amount});

/* ===== Plantillas ===== */
function historyItem(h) {
  const d = new Date(h.ts), neg = h.amount < 0;
  const mon = d.toLocaleDateString(S.lang, {month:'short'}).replace('.', '');
  return `<div class="item"><div class="date">${String(d.getDate()).padStart(2,'0')}<small>${mon}</small></div>
    <div class="round">${ic(neg ? 'cash' : 'cart')}</div>
    <div class="info">${esc(labelOf(h))}<small>${T()[h.sub]}</small></div>
    <div class="amt ${neg ? 'neg' : ''}">${neg ? '-' : ''}${money(h.amount)}</div>
    <span class="tag ${h.status === 'paid' ? 'paid' : ''}">${T()[h.status]}</span></div>`;
}
const sorted = c => [...c.history].sort((a, b) => b.ts - a.ts);

function activityRow(a) {
  const t = T();
  const txt = a.kind === 'debt' ? `${t.newDebt}: ${money(a.amount)}` : a.kind === 'paid' ? `${t.paidLabel} ${money(a.amount)}` : `${t.payReceived}: ${money(a.amount)}`;
  return `<div class="activity-row"><div class="round">${ic(a.kind === 'debt' ? 'cart' : a.kind === 'paid' ? 'wallet' : 'cash')}</div>
    <div class="info">${esc(a.who)}<small>${txt}</small></div>
    <span class="when">${whenTxt(a.ts)}<i class="dot ${a.kind === 'debt' ? 'o' : ''}"></i></span></div>`;
}

/* ===== Traducir la interfaz (sin tocar tu HTML) ===== */
function translateUI() {
  const t = T();
  document.documentElement.lang = S.lang;
  document.querySelectorAll('.main-nav a').forEach((a, i) => a.textContent = t.nav[i]);
  q('.page-heading h1').innerHTML = `${t.title1} <span>&amp;</span> ${t.title2}`;
  q('.page-heading p').textContent = t.subtitle;
  setText(q('.section-label'), t.selectCustomer);
  q('.add-customer-btn').textContent = t.addCustomer;
  q('.balance-box:nth-child(1) span').textContent = t.currentDebt;
  q('.balance-box:nth-child(2) span').textContent = t.creditLimit;
  setText(q('.progress-info span:nth-child(2)'), t.limit.trim());
  $('limitWarning').textContent = t.limitWarn;
  setText(q('.blocking-content h2'), t.autoBlock);
  q('.blocking-content p').textContent = t.autoBlockDesc;
  q('.history-card h2').textContent = t.debtHistory;
  q('.history-card .card-heading p').textContent = t.debtHistoryDesc;
  $('showHistoryBtn').textContent = t.viewHistory;
  q('.payment-card h2').textContent = t.registerPayment;
  q('.payment-card .card-heading p').textContent = t.registerPaymentDesc;
  q('label[for="paymentAmount"]').textContent = t.amount;
  q('.payment-type legend').textContent = t.type;
  const radios = document.querySelectorAll('.payment-type label span');
  radios[0].textContent = t.partial; radios[1].textContent = t.full;
  q('.payment-actions .btn-primary').textContent = t.registerBtn;
  $('markPaidBtn').textContent = t.markPaid;
  q('.activity-card h2').textContent = t.recent;
  $('viewActivityBtn').textContent = t.viewActivity;
  q('.overview-card h2').textContent = t.overview;
  ['outstanding','today','withDebt','overdue'].forEach((k, i) => q(`.stat-box:nth-child(${i + 1}) span`).textContent = t[k]);
  q('#customerDialog h2').textContent = t.addCustomerT;
  q('label[for="newCustomerName"]').textContent = t.fullName;
  q('label[for="newCustomerLimit"]').textContent = t.limitLbl;
  $('newCustomerName').placeholder = t.namePh;
  q('#customerForm .modal-submit').textContent = t.saveCustomer;
  q('#historyDialog h2').textContent = t.fullHistoryT;
  q('#activityDialog h2').textContent = t.allActivityT;
  q('#notificationDialog h2').textContent = t.notifT;
  const f = document.querySelectorAll('.page-footer span'); f[0].textContent = t.footer[0]; f[1].textContent = t.footer[1];
  document.querySelectorAll('.close-btn').forEach(b => b.setAttribute('aria-label', t.close));
}

/* ===== Iconos en los botones (reemplazan los símbolos de texto) ===== */
function setIcons() {
  q('.section-label span').innerHTML = ic('user');
  q('.customer-avatar').innerHTML = ic('user').replace('class="ic"', 'class="ic" style="width:22px;height:22px"');
  q('.shield').innerHTML = ic('shield');
  const place = (btn, name) => {
    [...btn.childNodes].forEach(n => { if (n.nodeType === 3) n.remove(); });
    let s = btn.querySelector('svg'); if (s) s.remove();
    btn.insertAdjacentHTML('afterbegin', ic(name));
  };
  place($('notificationBtn'), 'bell');
  place($('languageBtn'), 'globe');
  $('themeBtn').innerHTML = ic(S.theme === 'dark' ? 'sun' : 'moon');
}

/* ===== Render principal ===== */
function render() {
  document.documentElement.dataset.theme = S.theme;
  translateUI(); setIcons();
  const t = T(), c = cust(), debt = debtOf(c), pct = Math.min(100, Math.round(debt / c.limit * 100)) || 0;

  $('languageLabel').textContent = S.lang.toUpperCase();
  $('customerSelect').innerHTML = S.customers.map(x => `<option value="${x.id}" ${x.id === S.selected ? 'selected' : ''}>${esc(x.name)}</option>`).join('');
  $('customerName').textContent = c.name;
  $('currentDebt').textContent = money(debt);
  $('creditLimit').textContent = money(c.limit);
  $('limitLabel').textContent = money(c.limit);
  $('creditProgress').style.width = pct + '%';
  $('creditUsed').textContent = `${pct}% ${t.used}`;
  $('limitWarning').hidden = !(debt >= c.limit && c.limit > 0);
  $('blockingToggle').checked = S.block;

  $('historyList').innerHTML = sorted(c).slice(0, 4).map(historyItem).join('') || '<p class="empty">—</p>';
  $('activityList').innerHTML = S.activity.slice(0, 3).map(activityRow).join('');

  const all = S.customers;
  $('outstandingDebt').textContent = money(all.reduce((s, x) => s + debtOf(x), 0));
  $('paymentsToday').textContent = money(all.flatMap(x => x.history).filter(h => h.amount < 0 && dayDiff(h.ts) === 0).reduce((s, h) => s + Math.abs(h.amount), 0));
  $('customersWithDebt').textContent = all.filter(x => debtOf(x) > 0).length;
  $('overdueCount').textContent = all.filter(x => x.history.some(h => h.amount > 0 && h.status === 'pending' && dayDiff(h.ts) > 30)).length;

  const unread = S.notifs.filter(n => !n.read).length;
  $('notificationCount').textContent = unread;
  $('notificationCount').classList.toggle('is-hidden', unread === 0);

  const full = document.querySelector('input[name="paymentType"]:checked').value === 'full';
  $('paymentAmount').readOnly = full;
  if (full) $('paymentAmount').value = debt ? debt.toFixed(2) : '';
  persist();
}

/* ===== Pagos ===== */
function pay(amount, isFull) {
  const c = cust();
  c.history.push({ts:Date.now(), label: isFull ? 'fullPayment' : 'payReceived', sub: isFull ? 'pago' : 'abono', amount:-amount, status:'paid'});
  if (isFull) c.history.forEach(h => { if (h.amount > 0) h.status = 'paid'; });
  logActivity('paid', c.name, amount);
  addNotif(isFull ? 'nPaid' : 'nPayment', {c:c.name, a:money(amount)});
  $('paymentAmount').value = '';
  render(); message(T()[isFull ? 'okPaid' : 'okPayment'], 'ok');
}

$('paymentForm').addEventListener('submit', e => {
  e.preventDefault();
  const c = cust(), debt = debtOf(c), t = T();
  if (debt <= 0) return message(t.errNoDebt, 'error');
  const amount = Math.round(parseFloat($('paymentAmount').value) * 100) / 100;
  if (!amount || amount <= 0) return message(t.errAmount, 'error');
  if (amount > debt + 0.001) return message(t.errExceeds, 'error');
  pay(amount, Math.abs(amount - debt) < 0.005);
});

$('markPaidBtn').addEventListener('click', () => {
  const debt = debtOf(cust());
  if (debt <= 0) return message(T().errNoDebt, 'error');
  pay(Math.round(debt * 100) / 100, true);
});

document.querySelectorAll('input[name="paymentType"]').forEach(r => r.addEventListener('change', () => {
  if (r.value === 'partial' && r.checked) $('paymentAmount').value = '';
  render();
}));

/* ===== Cliente ===== */
$('customerSelect').addEventListener('change', e => { S.selected = +e.target.value; $('paymentAmount').value = ''; render(); });
$('addCustomerBtn').addEventListener('click', () => { $('customerForm').reset(); $('newCustomerLimit').value = 100; $('customerDialog').showModal(); });
$('customerForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('newCustomerName').value.trim(), limit = parseFloat($('newCustomerLimit').value);
  if (!name || !(limit > 0)) return;
  const c = {id:S.nextId++, name, limit, history:[]};
  S.customers.push(c); S.selected = c.id;
  addNotif('nCustomer', {c:name});
  $('customerDialog').close(); render(); message(T().okCustomer, 'ok');
});

/* ===== Historial, actividad y notificaciones ===== */
$('showHistoryBtn').addEventListener('click', () => {
  $('fullHistoryList').innerHTML = `<div class="history-list" style="max-height:none">${sorted(cust()).map(historyItem).join('') || '<p class="empty">—</p>'}</div>`;
  $('historyDialog').showModal();
});
$('viewActivityBtn').addEventListener('click', () => {
  $('fullActivityList').innerHTML = S.activity.map(activityRow).join('');
  $('activityDialog').showModal();
});
$('notificationBtn').addEventListener('click', () => {
  const t = T();
  $('notificationList').innerHTML = S.notifs.length
    ? S.notifs.map(n => `<div class="notif-row ${n.read ? '' : 'unread'}">${esc(fmt(t[n.key] || n.key, n.p || {}))}<small>${whenTxt(n.ts)}</small></div>`).join('')
    : `<p class="empty">${t.noNotif}</p>`;
  $('notificationDialog').showModal();
  S.notifs.forEach(n => n.read = true);
  render();
});

/* ===== Idioma, tema, bloqueo ===== */
$('languageBtn').addEventListener('click', () => { S.lang = S.lang === 'es' ? 'en' : 'es'; render(); });
$('themeBtn').addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; render(); });
$('blockingToggle').addEventListener('change', e => { S.block = e.target.checked; persist(); });

/* ===== Cerrar modales ===== */
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => $(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

render();