// Cambia este nombre si tu página de perfil se llama distinto
const PROFILE_PAGE = 'perfil.html';

const form = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');

const fields = {
  fullname: document.getElementById('fullname'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  business: document.getElementById('business'),
  password: document.getElementById('password'),
  confirm: document.getElementById('confirm')
};

// Muestra u oculta el error debajo de cada campo (el <small class="form__error">)
function setError(input, text) {
  const small = input.closest('.form__group').querySelector('.form__error');
  small.textContent = text;
}

function clearErrors() {
  Object.values(fields).forEach(input => setError(input, ''));
  formMessage.textContent = '';
  formMessage.style.color = '';
}

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // evita el POST que causaba el error 405
  clearErrors();

  const name = fields.fullname.value.trim();
  const email = fields.email.value.trim();
  const phone = fields.phone.value.trim();
  const business = fields.business.value.trim();
  const password = fields.password.value;
  const confirm = fields.confirm.value;
  let valid = true;

  if (!name) {
    setError(fields.fullname, 'Enter your full name.');
    valid = false;
  }

  if (!email) {
    setError(fields.email, 'Enter your email.');
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    setError(fields.email, 'Enter a valid email.');
    valid = false;
  }

  const digits = phone.replace(/\D/g, '');
  if (!phone) {
    setError(fields.phone, 'Enter your phone number.');
    valid = false;
  } else if (digits.length < 7 || digits.length > 15) {
    setError(fields.phone, 'Enter a valid phone number.');
    valid = false;
  }

  if (!business) {
    setError(fields.business, 'Enter your business name.');
    valid = false;
  }

  if (!password) {
    setError(fields.password, 'Enter a password.');
    valid = false;
  } else if (password.length < 6) {
    setError(fields.password, 'Use at least 6 characters.');
    valid = false;
  }

  if (!confirm) {
    setError(fields.confirm, 'Confirm your password.');
    valid = false;
  } else if (password !== confirm) {
    setError(fields.confirm, 'Passwords do not match.');
    valid = false;
  }

  if (!valid) return;

  const result = await Auth.register(name, email, password, { phone, business });

  if (!result.ok) {
    setError(fields.email, result.error);
    return;
  }

  formMessage.textContent = 'Account created! Redirecting to your profile…';
  formMessage.style.color = 'green';
  setTimeout(() => { window.location.href = PROFILE_PAGE; }, 800);
});