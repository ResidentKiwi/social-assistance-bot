import { loadAuthPage, loadRegisterForm } from "./auth.js";
import { supabase } from "./supabaseClient.js";

let currentUser = null;
let isAdmin = false;

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
    document.getElementById("admin-menu").classList.toggle("d-none", !isAdmin);
    document.getElementById("btn-login").textContent = "Logout";
    document.getElementById("btn-login").onclick = handleLogout;
  }

  document.getElementById("btn-login").onclick = () => loadAuthPage(onLoginSuccess);
  document.getElementById("btn-register").onclick = () => loadRegisterForm(onLoginSuccess);
}

function onLoginSuccess(user, admin) {
  currentUser = user;
  isAdmin = admin;

  document.getElementById("admin-menu").classList.toggle("d-none", !isAdmin);
  document.getElementById("btn-login").textContent = "Logout";
  document.getElementById("btn-login").onclick = handleLogout;

  navigate("home");
}

function handleLogout() {
  supabase.auth.signOut().then(() => {
    currentUser = null;
    isAdmin = false;
    document.getElementById("admin-menu").classList.add("d-none");
    document.getElementById("btn-login").textContent = "Login";
    document.getElementById("btn-login").onclick = () => loadAuthPage(onLoginSuccess);
    navigate("home");
  });
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function navigate(page) {
  const offcanvasEl = document.getElementById("offcanvasMenu");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
  if (offcanvas) offcanvas.hide();

  import(`./${page}.js`)
    .then((mod) => {
      if (mod.default) {
        mod.default();
      } else {
        document.getElementById("main-content").innerHTML = `<p class="text-warning">Página "${page}" não encontrada.</p>`;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("main-content").innerHTML = `<p class="text-danger">Erro ao carregar "${page}".</p>`;
    });
}

window.navigate = navigate;

initializeApp().then(() => {
  navigate("home");
});
