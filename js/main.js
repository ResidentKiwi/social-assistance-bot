// js/main.js
import { loadAuthPage, loadRegisterForm } from './auth.js';
let currentUser = null;
let isAdmin = false;

async function initializeApp() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = jwt_decode(token);
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
    const mod = await import(`./${page}.js`);
    if (mod.default) mod.default();
    else throw new Error('Módulo não possui export default');
  } catch (err) {
    console.error(err);
    if (main) {
      main.innerHTML = `<div class="text-red-500 text-center mt-10">Erro ao carregar "${page}"</div>`;
    }
  }
}

// Expor função global para navegação
window.navigate = navigate;

// Inicializar aplicação
initializeApp().then(() => navigate('home'));
