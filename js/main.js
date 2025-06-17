import { logoutUser, loadAuthPage } from "./auth.js";
import { supabase } from "../supabaseClient.js";

let currentUser = null;
let isAdmin = false;

function loadPage(page) {
  import(`./${page}.js`)
    .then(module => {
      if (module.default) {
        module.default();
      } else if (typeof window[`load${capitalize(page)}`] === "function") {
        window[`load${capitalize(page)}`]();
      } else {
        document.getElementById("main-content").innerHTML = `<p>Página não encontrada.</p>`;
      }
    })
    .catch(() => {
      document.getElementById("main-content").innerHTML = `<p>Erro ao carregar página.</p>`;
    });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function showAdminMenu(show) {
  const adminItem = document.getElementById("admin-menu");
  if (adminItem) {
    adminItem.classList.toggle("d-none", !show);
  }
}

function updateLoginButton() {
  const btn = document.getElementById("btn-login");
  if (currentUser) {
    btn.textContent = `Logout (${currentUser.email})`;
  } else {
    btn.textContent = "Login";
  }
}

document.getElementById("btn-login").onclick = async () => {
  if (currentUser) {
    await logoutUser();
  } else {
    loadAuthPage();
  }
};

async function initializeApp() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (session) {
    currentUser = session.user;
    const profile = await supabase.from("profiles").select("is_admin").eq("id", currentUser.id).single();
    isAdmin = profile.data?.is_admin;
    showAdminMenu(isAdmin);
  }
  updateLoginButton();
  loadPage("home");
}

initializeApp();
