// Se carga DESPUÉS de perfil.js para que los datos reales del usuario
// queden por encima de los textos de ejemplo ("User", "My Business").

(function () {
  const user = Auth.currentUser();
  if (!user) return; // el guard del <head> ya redirige a login.html

  const fullName = user.name || 'User';
  const firstName = fullName.split(' ')[0];

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  setText('userName', firstName);
  setText('profileName', fullName);
  setText('dropdownName', fullName);
  setText('businessName', user.business || 'My Business');
  setText('avatarLetter', fullName.charAt(0).toUpperCase());

  // Cerrar sesión: borra la sesión y vuelve al login
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action="logout"]');
    if (!btn) return;
    Auth.logOut();
    window.location.href = 'login.html';
  });
})();