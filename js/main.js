import { loadAuthPage, loadRegisterForm } from "./auth.js";
import { supabase } from "./supabaseClient.js";

let currentUser = null;
let isAdmin = false;

async function initializeApp() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (session) {
    currentUser = session.user;
    const resp = await supabase.from("profiles").select("is_admin").eq("id", currentUser.id).single();
    isAdmin = resp.data?.is_admin;
  }
  updateAuthButtons();
}

function updateAuthButtons() {
  const btnLogin = document.getElementById("btn-login");
  const btnRegister = document.getElementById("btn-register");
  const adminMenu = document.getElementById("admin-menu");

  if (currentUser) {
    btnLogin.textContent = "Logout";
    btnLogin.onclick = handleLogout;
    adminMenu.classList.remove("hidden");
    if (!isAdmin) adminMenu.classList.add("hidden");
  } else {
    btnLogin.textContent = "Login";
    btnLogin.onclick = () => loadAuthPage(onLoginSuccess);
    adminMenu.classList.add("hidden");
  }

  btnRegister.onclick = () => loadRegisterForm(onLoginSuccess);
}

function onLoginSuccess(user, admin) {
  currentUser = user;
  isAdmin = admin;
  updateAuthButtons();
  navigate("home");
}

function handleLogout() {
  supabase.auth.signOut().then(() => {
    currentUser = null;
    isAdmin = false;
    updateAuthButtons();
    navigate("home");
  });
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function navigate(page) {
  // Fecha menu lateral com Tailwind
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");

  const main = document.getElementById("main-content");
  main.innerHTML = `<div class="text-center py-10"><i class="fas fa-spinner fa-spin fa-2x text-white"></i></div>`;

  try {
    const mod = await import(`./${page}.js`);
    if (mod.default) {
      mod.default();
    } else {
      throw new Error("Módulo sem export default");
    }
  } catch (err) {
    console.error(err);
    main.innerHTML = `<div class="text-red-500 text-center mt-10">Erro ao carregar "${page}"</div>`;
  }
}

window.navigate = navigate;

// Inicialização
initializeApp().then(() => navigate("home"));
