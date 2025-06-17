import { loadAuthPage, loadRegisterForm } from "./auth.js";
import { supabase } from "../supabaseClient.js";

let currentUser = null, isAdmin = false;

async function initializeApp() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (session) {
    currentUser = session.user;
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", currentUser.id).single();
    isAdmin = profile?.is_admin;
    document.getElementById("admin-menu").classList.toggle("d-none", !isAdmin);
  }
  initButtons();
  navigate("home");
}

function initButtons() {
  document.getElementById("btn-login").onclick = () => loadAuthPage(onLoginSuccess);
  document.getElementById("btn-register").onclick = () => loadRegisterForm(onLoginSuccess);
}

function onLoginSuccess(user, admin) {
  currentUser = user;
  isAdmin = admin;
  document.getElementById("admin-menu").classList.toggle("d-none", !isAdmin);
  document.getElementById("btn-login").textContent = "Logout";
  document.getElementById("btn-login").onclick = handleLogout;
}

function handleLogout() {
  supabase.auth.signOut().then(() => {
    currentUser = null; isAdmin = false;
    document.getElementById("btn-login").textContent = "Login";
    document.getElementById("admin-menu").classList.toggle("d-none", true);
    navigate("home");
  });
}

export function navigate(page) {
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasMenu"));
  offcanvas.hide();
  import(`./${page}.js`)
    .then(mod => mod.default ? mod.default() : window[`load${capitalize(page)}`]())
    .catch(() => {
      document.getElementById("main-content").innerHTML = "<p>Página não encontrada.</p>";
    });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

initializeApp();

export { initializeApp };
