// ===== Utilidades: "base de datos" local de usuarios (simulada) =====
// Guarda las contraseñas restauradas en el navegador. Cuando tengas backend, reemplaza esto por tu API.
function getUsers() {
  try { return JSON.parse(localStorage.getItem("fiao_users")) || {}; }
  catch { return {}; }
}
function saveUsers(users) {
  localStorage.setItem("fiao_users", JSON.stringify(users));
}
const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const captcha = document.getElementById("captcha").checked;

  if (!email || !password) return (loginError.textContent = "Please fill in all fields.");
  if (!emailValido(email)) return (loginError.textContent = "Enter a valid email address.");
  if (!captcha) return (loginError.textContent = "Please confirm you're not a robot.");

  // Si el usuario ya restauró su contraseña, se valida contra la guardada
  const users = getUsers();
  if (users[email] && users[email] !== password) {
    return (loginError.textContent = "Incorrect email or password.");
  }

  loginError.textContent = "";
  sessionStorage.setItem("fiao_session", email);
  window.location.href = "perfil.html"; // <-- redirige a tu página de perfil
});

// ===== MODAL: RESTAURAR CONTRASEÑA =====
const modal = document.getElementById("resetModal");
const resetForm = document.getElementById("resetForm");
const resetMsg = document.getElementById("resetMsg");

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("resetEmail").value = document.getElementById("email").value;
  document.getElementById("resetEmail").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  resetForm.reset();
  resetMsg.textContent = "";
  resetMsg.classList.remove("ok");
}

document.getElementById("forgotLink").addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

resetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("resetEmail").value.trim().toLowerCase();
  const nueva = document.getElementById("newPassword").value;
  const confirmar = document.getElementById("confirmPassword").value;

  resetMsg.classList.remove("ok");
  if (!emailValido(email)) return (resetMsg.textContent = "Enter a valid email address.");
  if (nueva.length < 8) return (resetMsg.textContent = "Password must be at least 8 characters.");
  if (nueva !== confirmar) return (resetMsg.textContent = "Passwords do not match.");

  const users = getUsers();
  users[email] = nueva;
  saveUsers(users);

  resetMsg.classList.add("ok");
  resetMsg.textContent = "Password updated. You can log in now.";
  document.getElementById("email").value = email;
  setTimeout(closeModal, 1600);
});

// ===== MOSTRAR / OCULTAR CONTRASEÑA =====
document.querySelectorAll(".toggle-pw").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");
    const mostrar = input.type === "password";
    input.type = mostrar ? "text" : "password";
    btn.classList.toggle("visible", mostrar);
    btn.setAttribute("aria-label", mostrar ? "Hide password" : "Show password");
  });
});