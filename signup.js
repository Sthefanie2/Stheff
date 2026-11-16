
// ============================================================
// FIA'O - SISTEMA DE REGISTRO
// Validación, almacenamiento y confirmación de cuenta
// ============================================================

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

// ============================================================
// MOSTRAR Y OCULTAR CONTRASEÑA
// ============================================================

document.querySelectorAll('.eye-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);

    const show = input.type === 'password';

    input.type = show ? 'text' : 'password';

    btn.classList.toggle('visible', show);

    btn.setAttribute(
      'aria-label',
      show ? 'Hide password' : 'Show password'
    );
  });
});

// ============================================================
// MOSTRAR ERRORES
// ============================================================

function setError(input, message) {
  const field = input.closest('.field');

  field.querySelector('.error').textContent = message;

  field.classList.add('has-error');

  input.classList.add('invalid');
}

function clearError(input) {
  const field = input.closest('.field');

  field.classList.remove('has-error');

  field.querySelector('.error').textContent = '';

  input.classList.remove('invalid');
}

// ============================================================
// VALIDAR FORMULARIO
// ============================================================

function validate() {
  let valid = true;

  Object.values(fields).forEach(clearError);

  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const phone = fields.phone.value.trim();
  const business = fields.business.value.trim();
  const pass = fields.password.value;
  const confirm = fields.confirm.value;

  // Nombre
  if (name.length < 3) {
    setError(fields.fullName, 'Enter your full name');
    valid = false;
  }

  // Correo electrónico
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError(fields.email, 'Enter a valid email');
    valid = false;
  }

  // Teléfono
  if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) {
    setError(fields.phone, 'Enter a valid phone number');
    valid = false;
  }

  // Negocio
  if (business.length < 2) {
    setError(fields.business, 'Enter your business name');
    valid = false;
  }

  // Contraseña
  if (pass.length < 6) {
    setError(fields.password, 'Min. 6 characters');
    valid = false;
  }

  // Confirmar contraseña
  if (confirm === '' || confirm !== pass) {
    setError(fields.confirm, "Passwords don't match");
    valid = false;
  }

  return valid;
}

// ============================================================
// LIMPIAR ERRORES AL ESCRIBIR
// ============================================================

Object.values(fields).forEach((input) => {
  input.addEventListener('input', () => {
    clearError(input);
  });
});

// ============================================================
// REGISTRAR USUARIO
// ============================================================

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Comprobar que todos los datos sean correctos
  if (!validate()) {
    return;
  }

  // Crear objeto del usuario
  const user = {
    fullName: fields.fullName.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    business: fields.business.value.trim(),
    createdAt: new Date().toISOString()
  };

  try {

    // Guardar información en el navegador
    localStorage.setItem('fiaoUser', JSON.stringify(user));

    // Mensaje de registro exitoso
    alert(
      "🎉 ¡FELICIDADES!\n\n" +
      "Te has registrado correctamente en FIA'O.\n\n" +
      "Tu cuenta ha sido creada exitosamente.\n" +
      "¡Bienvenido a nuestra plataforma!"
    );

    // Redirigir al perfil después de aceptar
    window.location.href = PROFILE_PAGE;

  } catch (error) {

    console.error('Error al registrar usuario:', error);

    alert(
      'No se pudo completar tu registro.\n\n' +
      'Por favor, verifica tu navegador e inténtalo nuevamente.'
    );

  }
});
