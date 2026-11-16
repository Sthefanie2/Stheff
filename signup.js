// ============================================================
// FIA'O - Registro
// Al crear la cuenta se guardan los datos en el navegador
// (localStorage) y se redirige a la página de perfil.
// ============================================================

// Cambia este nombre si tu página de perfil se llama diferente
const PROFILE_PAGE = 'profile.html';

const form = document.getElementById('signupForm');
const fields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  business: document.getElementById('business'),
  password: document.getElementById('password'),
  confirm: document.getElementById('confirm')
};

// ----- Icono del ojo: mostrar / ocultar contraseña -----
document.querySelectorAll('.eye-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.classList.toggle('visible', show);
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
});

// ----- Errores -----
function setError(input, message) {
  const field = input.closest('.field');
  field.querySelector('.error').textContent = message;
  field.classList.add('has-error');
  input.classList.add('invalid');
}

function clearError(input) {
  input.closest('.field').classList.remove('has-error');
  input.classList.remove('invalid');
}

function validate() {
  let valid = true;
  Object.values(fields).forEach(clearError);

  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const phone = fields.phone.value.trim();
  const business = fields.business.value.trim();
  const pass = fields.password.value;
  const confirm = fields.confirm.value;

  if (name.length < 3) { setError(fields.fullName, 'Enter your full name'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(fields.email, 'Enter a valid email'); valid = false; }
  if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) { setError(fields.phone, 'Enter a valid phone number'); valid = false; }
  if (business.length < 2) { setError(fields.business, 'Enter your business name'); valid = false; }
  if (pass.length < 6) { setError(fields.password, 'Min. 6 characters'); valid = false; }
  if (confirm === '' || confirm !== pass) { setError(fields.confirm, "Passwords don't match"); valid = false; }

  return valid;
}

Object.values(fields).forEach((input) => {
  input.addEventListener('input', () => clearError(input));
});

// ----- Crear cuenta -----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Se guarda el usuario SIN la contraseña (profile.html lee esta clave)
  const user = {
    fullName: fields.fullName.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    business: fields.business.value.trim(),
    createdAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('fiaoUser', JSON.stringify(user));
  } catch (err) {
    console.error('No se pudo guardar en localStorage:', err);
  }

  window.location.href = perfil.html;
});
