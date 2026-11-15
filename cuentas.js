// FIA'O accounts: sign up, log in and session handling.
// Simulation for GitHub Pages (no server). Data is stored in the browser.
// Shared by login.html, signup.html and perfil.html.

const Auth = {
  readUsers() {
    try {
      return JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch (e) {
      return [];
    }
  },

  saveUsers(list) {
    localStorage.setItem('usuarios', JSON.stringify(list));
  },

  async hash(text) {
    const data = new TextEncoder().encode(text);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  async register(name, email, password, extra = {}) {
    email = email.trim().toLowerCase();
    const users = this.readUsers();

    if (users.some(u => u.email === email)) {
      return { ok: false, error: 'This email is already registered. Log in instead.' };
    }

    users.push({
      name: name.trim(),
      email,
      phone: (extra.phone || '').trim(),
      business: (extra.business || '').trim(),
      password: await this.hash(password),
      created: new Date().toISOString()
    });
    this.saveUsers(users);
    sessionStorage.setItem('sesion', email);
    return { ok: true };
  },

  async logIn(email, password) {
    email = email.trim().toLowerCase();
    const user = this.readUsers().find(u => u.email === email);

    if (!user) {
      return { ok: false, field: 'email', error: 'No account found with this email.' };
    }
    if (user.password !== await this.hash(password)) {
      return { ok: false, field: 'password', error: 'Incorrect password.' };
    }

    sessionStorage.setItem('sesion', email);
    return { ok: true };
  },

  currentUser() {
    const email = sessionStorage.getItem('sesion');
    if (!email) return null;
    return this.readUsers().find(u => u.email === email) || null;
  },

  logOut() {
    sessionStorage.removeItem('sesion');
  }
};