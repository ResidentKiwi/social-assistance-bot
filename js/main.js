// src/main.js
import { loadAuthPage, loadRegisterForm } from './auth.js';
import jwtDecode from 'jwt-decode';

let currentUser = null;
let isAdmin = false;

const routes = {
  home: () => import('./home.js'),
  profile: () => import('./profile.js'),
  'cv-generator': () => import('./cv-generator.js'),
  'benefit-checker': () => import('./benefit-checker.js'),
  'vestibular-guide': () => import('./vestibular-guide.js'),
  admin: () => import('./admin.js')
};

async function initializeApp() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = jwtDecode(token);
      currentUser = payload.sub;
      isAdmin = Boolean(payload.is_admin);
    } catch (err) {
      console.warn("Token inválido, removendo...");
      localStorage.removeItem('token');
    }
  }
  updateAuthButtons();
}

function updateAuthButtons() {
  const btnLogin = document.getElementById('btn-login');
  const btnRegister = document.getElementById('btn-register');
  const adminMenu = document.getElementById('admin-menu');

  if (currentUser) {
    btnLogin.textContent = 'Logout';
    btnLogin.onclick = handleLogout;
    if (adminMenu) adminMenu.classList.toggle('hidden', !isAdmin);
    if (btnRegister) btnRegister.classList.add('hidden');
  } else {
    btnLogin.textContent = 'Login';
    btnLogin.onclick = () => loadAuthPage(onLoginSuccess);
    if (adminMenu) adminMenu.classList.add('hidden');
    if (btnRegister) {
      btnRegister.classList.remove('hidden');
      btnRegister.onclick = () => loadRegisterForm(onLoginSuccess);
    }
  }
}

function onLoginSuccess(userId, adminFlag) {
  currentUser = userId;
  isAdmin = adminFlag;
  updateAuthButtons();
  navigate('home');
}

function handleLogout() {
  localStorage.removeItem('token');
  currentUser = null;
  isAdmin = false;
  updateAuthButtons();
  navigate('home');
}

export async function navigate(page) {
  document.getElementById('sidebar')?.classList.add('-translate-x-full');
  document.getElementById('overlay')?.classList.add('hidden');

  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = `<div class="text-center py-10"><i class="fas fa-spinner fa-spin fa-2x text-white"></i></div>`;
  }

  try {
    if (!(page in routes)) throw new Error("Página inválida");
    const mod = await routes[page]();
    if (mod.default) mod.default();
    else throw new Error('Módulo não possui export default');
  } catch (err) {
    console.error(err);
    if (main) {
      main.innerHTML = `<div class="text-red-500 text-center mt-10">Erro ao carregar "${page}"</div>`;
    }
  }
}

window.navigate = navigate;

initializeApp().then(() => navigate('home'));
