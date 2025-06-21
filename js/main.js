import { loadAuthPage, loadRegisterForm } from "./auth.js";
import { supabase } from "./supabaseClient.js";

let currentUser = null;
let isAdmin = false;

// Inicializa o app e configura botões
async function initializeApp() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (session) {
    currentUser = session.user;
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", currentUser.id)
      .single();
    isAdmin = profile?.is_admin;
  }

  updateAuthButtons();
}

// Atualiza texto/ações dos botões de login/register
function updateAuthButtons() {
  const btnLogin = document.getElementById("btn-login");
  if (currentUser) {
    btnLogin.textContent = "Logout";
    btnLogin.onclick = handleLogout;
    document.getElementById("admin-menu").classList.toggle("hidden", !isAdmin);
  } else {
    btnLogin.textContent = "Login";
    btnLogin.onclick = () => loadAuthPage(onLoginSuccess);
    document.getElementById("admin-menu").classList.add("hidden");
  }

  document.getElementById("btn-register").onclick = () => loadRegisterForm(onLoginSuccess);
}

// Login/logout callback
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

// Navegação com fechamento de menu
export async function navigate(page) {
  // Fecha offcanvas (Tailwind/Bootstrap)
  const offcanvasEl = document.getElementById("offcanvasMenu");
  if (offcanvasEl.classList.contains("translate-x-0")) {
    offcanvasEl.classList.remove("translate-x-0");
    offcanvasEl.classList.add("-translate-x-full");
  }

  try {
    const mod = await import(`./${page}.js`);
    if (typeof mod.default === "function") {
      mod.default();
    } else if (typeof window[`load${capitalize(page)}`] === "function") {
      window[`load${capitalize(page)}`]();
    } else {
      showError(`Página "${page}" não encontrada.`);
    }
  } catch (err) {
    console.error(err);
    showError(`Erro ao carregar "${page}".`);
  }
}

// Mostra erro na UI
function showError(msg) {
  document.getElementById("main-content").innerHTML = `
    <div class="p-6 bg-red-900 text-red-100 rounded-md">
      <p>${msg}</p>
      <button class="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700" onclick="navigate('home')">Voltar</button>
    </div>`;
}

// Torna global para HTML onclick
window.navigate = navigate;

// Inicia aplicação
initializeApp().then(() => navigate("home"));
