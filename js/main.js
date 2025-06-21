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
    adminMenu.classList.toggle("d-none", !isAdmin);
  } else {
    btnLogin.textContent = "Login";
    btnLogin.onclick = () => loadAuthPage(onLoginSuccess);
    adminMenu.classList.add("d-none");
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
  // Fecha offcanvas
  const offcanvasEl = document.getElementById("offcanvasMenu");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
  if (offcanvas) offcanvas.hide();

  const main = document.getElementById("main-content");
  main.innerHTML = `<div class="text-center py-5"><i class="fas fa-spinner fa-spin fa-2x"></i></div>`;

  try {
    const mod = await import(`./${page}.js`);
    if (mod.default) {
      mod.default();
    } else {
      throw new Error("Módulo sem export default");
    }
  } catch (err) {
    console.error(err);
    main.innerHTML = `<div class="alert alert-danger">Erro ao carregar "${page}".</div>`;
  }
}

window.navigate = navigate;

// Inicialização
initializeApp().then(() => navigate("home"));
