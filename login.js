// Cambia este nombre si tu página de perfil se llama distinto
const PROFILE_PAGE = 'perfil.html';

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const captchaInput = document.getElementById('captcha');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const captchaError = document.getElementById('captchaError');

// If the user is already logged in, go straight to the profile
if (Auth.currentUser()) {
  window.location.href = PROFILE_PAGE;
}

function clearErrors() {
  emailError.textContent = '';
  passwordError.textContent = '';
  captchaError.textContent = '';
}

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // prevents the POST that caused the 405 error
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  if (!email) {
    emailError.textContent = 'Enter your email.';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailError.textContent = 'Enter a valid email.';
    valid = false;
  }

  if (!password) {
    passwordError.textContent = 'Enter your password.';
    valid = false;
  }

  if (!captchaInput.checked) {
    captchaError.textContent = 'Please confirm you are not a robot.';
    valid = false;
  }

  if (!valid) return;

  const result = await Auth.logIn(email, password);

  if (!result.ok) {
    if (result.field === 'email') emailError.textContent = result.error;
    else passwordError.textContent = result.error;
    return;
  }

  window.location.href = PROFILE_PAGE;
});

document.getElementById('forgotLink').addEventListener('click', function (e) {
  e.preventDefault();
  passwordError.textContent = 'Password recovery is not available yet.';
});