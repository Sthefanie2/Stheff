
// =============================================
// 1. BASE DE DATOS DE TRANSACCIONES DE EJEMPLO
// =============================================

const transactions = [

    {name:"Maria Gomez", description:"Grocery items & supplies", amount:45, date:"2026-07-28", status:"On Time"},
    {name:"Carlos Mendoza", description:"Weekly hardware credit", amount:120, date:"2026-07-25", status:"Pending"},
    {name:"Ana Ruiz", description:"Bakery stock order", amount:85.50, date:"2026-07-18", status:"Overdue"},
    {name:"Luis Torres", description:"Office supplies", amount:75, date:"2026-07-15", status:"On Time"},
    {name:"Sofia Perez", description:"Food products", amount:150, date:"2026-07-12", status:"Pending"},
    {name:"Maria Gomez", description:"Household products", amount:60, date:"2026-07-10", status:"On Time"},
    {name:"Carlos Mendoza", description:"Construction materials", amount:210, date:"2026-07-08", status:"Overdue"},
    {name:"Ana Ruiz", description:"Bakery ingredients", amount:95, date:"2026-07-05", status:"On Time"},
    {name:"Luis Torres", description:"Maintenance products", amount:130, date:"2026-07-03", status:"Pending"},

    {name:"Pedro Castillo", description:"Electronic equipment", amount:250, date:"2026-07-27", status:"On Time"},
    {name:"Laura Fernandez", description:"Cleaning supplies", amount:80, date:"2026-07-24", status:"Pending"},
    {name:"Jose Martinez", description:"Restaurant products", amount:175, date:"2026-07-22", status:"Overdue"},
    {name:"Daniela Lopez", description:"Clothing supplies", amount:110, date:"2026-07-20", status:"On Time"},
    {name:"Roberto Sanchez", description:"Hardware products", amount:300, date:"2026-07-19", status:"Pending"},
    {name:"Gabriela Morales", description:"Office furniture", amount:450, date:"2026-07-16", status:"On Time"},
    {name:"Miguel Herrera", description:"Food distribution", amount:90, date:"2026-07-14", status:"Overdue"},
    {name:"Valentina Cruz", description:"Beauty products", amount:135, date:"2026-07-11", status:"On Time"},
    {name:"Fernando Diaz", description:"Automotive supplies", amount:220, date:"2026-07-09", status:"Pending"},
    {name:"Camila Romero", description:"Bakery products", amount:65, date:"2026-07-07", status:"On Time"},
    {name:"Andres Vargas", description:"Building materials", amount:380, date:"2026-07-06", status:"Overdue"},
    {name:"Patricia Reyes", description:"Supermarket products", amount:155, date:"2026-07-04", status:"Pending"},
    {name:"Ricardo Flores", description:"Technology products", amount:290, date:"2026-07-02", status:"On Time"},
    {name:"Elena Navarro", description:"Household supplies", amount:105, date:"2026-07-01", status:"On Time"},
    {name:"Javier Ortega", description:"Restaurant equipment", amount:195, date:"2026-07-29", status:"Pending"},
    {name:"Monica Silva", description:"Clothing products", amount:85, date:"2026-07-30", status:"Overdue"}

];

// =============================================
// 2. VARIABLES
// =============================================

let filteredTransactions = [...transactions];

let currentPage = 1;

const rowsPerPage = 5;


// =============================================
// 3. INICIALIZAR SELECTOR DE CLIENTES
// =============================================

function loadCustomers() {

    const select = document.getElementById("customerFilter");

    if (!select) return;

    // Obtener todos los nombres sin repetir
    const customers = [...new Set(
        transactions.map(item => item.name)
    )].sort((a, b) => a.localeCompare(b));

    // Limpiar opciones anteriores
    select.innerHTML = "";

    // Primera opción: todos los clientes
    const allOption = document.createElement("option");

    allOption.value = "all";
    allOption.textContent = "👥 All Customers (All Names)";

    select.appendChild(allOption);

    // Agregar todos los clientes automáticamente
    customers.forEach(name => {

        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;

        select.appendChild(option);

    });

}


// =============================================
// 4. FORMATO DE DINERO
// =============================================

function money(value) {

    return "$" + Number(value).toLocaleString("en-US", {

        minimumFractionDigits: 2,
        maximumFractionDigits: 2

    });

}


// =============================================
// 5. MOSTRAR TRANSACCIONES
// =============================================

function renderTable() {

    const tbody = document.getElementById("transactionBody");

    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    const pageData = filteredTransactions.slice(
        start,
        start + rowsPerPage
    );

    // Si no hay resultados
    if (pageData.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No transactions found.
                    Try changing your filters.
                </td>
            </tr>
        `;

    }

    // Mostrar resultados
    pageData.forEach(item => {

        let statusClass = "";

        if (item.status === "On Time") {

            statusClass = "on-time";

        } else if (item.status === "Pending") {

            statusClass = "pending";

        } else {

            statusClass = "overdue";

        }

        const row = document.createElement("tr");

        const values = [
            item.name,
            item.description,
            money(item.amount),
            item.date
        ];

        values.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        const statusCell = document.createElement("td");

        const badge = document.createElement("span");

        badge.className = `status ${statusClass}`;

        badge.textContent = item.status;

        statusCell.appendChild(badge);

        row.appendChild(statusCell);

        tbody.appendChild(row);

    });

    renderPagination();

}


// =============================================
// 6. FILTRAR POR FECHA Y CLIENTE
// =============================================

function applyFilters() {

    const startDate = document.getElementById("startDate").value;

    const endDate = document.getElementById("endDate").value;

    const customer = document.getElementById("customerFilter").value;

    // Validar fechas
    if (startDate && endDate && startDate > endDate) {

        alert("La fecha inicial no puede ser mayor que la fecha final.");

        return;

    }

    // Aplicar filtros
    filteredTransactions = transactions.filter(item => {

        // Comparar fechas en formato YYYY-MM-DD
        const matchesStartDate =
            !startDate || item.date >= startDate;

        const matchesEndDate =
            !endDate || item.date <= endDate;

        // Comparar nombre del cliente
        const matchesCustomer =
            customer === "all" || item.name === customer;

        // Todos los filtros deben cumplirse
        return (
            matchesStartDate &&
            matchesEndDate &&
            matchesCustomer
        );

    });

    // Volver a la primera página
    currentPage = 1;

    // Actualizar tabla
    renderTable();

    console.log("Filtros aplicados:", {
        startDate,
        endDate,
        customer,
        results: filteredTransactions.length
    });

}


// =============================================
// 7. RESTABLECER FILTROS
// =============================================

function resetFilters() {

    document.getElementById("startDate").value = "";

    document.getElementById("endDate").value = "";

    document.getElementById("customerFilter").value = "all";

    filteredTransactions = [...transactions];

    currentPage = 1;

    renderTable();

}


// =============================================
// 8. PAGINACIÓN
// =============================================

function renderPagination() {

    const container = document.getElementById("pagination");

    container.innerHTML = "";

    const totalPages = Math.ceil(
        filteredTransactions.length / rowsPerPage
    );

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        if (i === currentPage) {

            button.classList.add("active");

        }

        button.addEventListener("click", () => {

            currentPage = i;

            renderTable();

        });

        container.appendChild(button);

    }

}


// =============================================
// 9. GRÁFICA DE ACTIVIDAD
// =============================================

const activityCanvas = document.getElementById("activityChart");

const activityChart = new Chart(activityCanvas, {

    type: "bar",

    data: {

        labels: [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4"
        ],

        datasets: [

            {
                label: "Credit Issued",

                data: [55, 75, 45, 90],

                backgroundColor: "#d8ae30",

                borderRadius: 4,

                barPercentage: 0.65
            },

            {
                label: "Payments Received",

                data: [82, 100, 68, 115],

                backgroundColor: "#12bd83",

                borderRadius: 4,

                barPercentage: 0.65
            },

            {
                label: "Overdue",

                data: [18, 30, 14, 36],

                backgroundColor: "#fa4848",

                borderRadius: 4,

                barPercentage: 0.65
            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            },

            tooltip: {
                enabled: true
            }

        },

        scales: {

            y: {

                display: false,

                beginAtZero: true,

                grid: {
                    display: false
                }

            },

            x: {

                grid: {
                    display: false
                },

                ticks: {

                    color: "#806b51",

                    font: {
                        size: 9
                    }

                }

            }

        }

    }

});


// =============================================
// 10. MODO OSCURO
// =============================================

function toggleTheme() {

    document.body.classList.toggle("dark");

    const button = document.querySelector(".theme-btn");

    button.textContent =
        document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";

}


// =============================================
// 11. EXPORTAR EXCEL
// =============================================

function exportExcel() {

    let csv = "Customer Name,Description,Amount,Date,Status\n";

    filteredTransactions.forEach(item => {

        const row = [
            item.name,
            item.description,
            item.amount.toFixed(2),
            item.date,
            item.status
        ];

        csv += row.map(value =>
            '"' + String(value).replace(/"/g, '""') + '"'
        ).join(",") + "\n";

    });

    const blob = new Blob(

        ["\uFEFF" + csv],

        {
            type: "text/csv;charset=utf-8;"
        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "FIAO_Reports.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


// =============================================
// 12. EXPORTAR PDF
// =============================================

function exportPDF() {

    window.print();

}


// =============================================
// 13. INICIALIZAR DASHBOARD
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    loadCustomers();

    renderTable();

});
