import { supabase } from "../supabaseClient.js";

let currentUser = null;
let isAdmin = false;

export async function loadAuthPage() {
  document.getElementById("main-content").innerHTML = `
    <h2>Entrar / Registrar</h2>
    <div class="row">
      <div class="col-md-6">
        <h4>Registrar</h4>
        <form id="signupForm">
          <input class="form-control mb-2" id="signupName" placeholder="Nome completo" required />
          <input class="form-control mb-2" id="signupUsername" placeholder="Nome de usuário" required />
          <input class="form-control mb-2" type="email" id="signupEmail" placeholder="Email" required />
          <input class="form-control mb-2" type="password" id="signupPassword" placeholder="Senha" required />
          <button class="btn btn-success">Criar conta</button>
        </form>
      </div>
      <div class="col-md-6">
        <h4>Entrar</h4>
        <form id="loginForm">
          <input class="form-control mb-2" type="email" id="loginEmail" placeholder="Email" required />
          <input class="form-control mb-2" type="password" id="loginPassword" placeholder="Senha" required />
          <button class="btn btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("signupForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, username }
      }
    });

    if (error) return alert("Erro ao registrar: " + error.message);
    alert("Conta criada! Verifique seu email para ativar.");
    loadAuthPage();
  };

  document.getElementById("loginForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Erro ao entrar: " + error.message);

    currentUser = data.user;
    const profile = await loadUserProfile(currentUser.id);

    isAdmin = profile?.is_admin || false;
    showAdminMenu(isAdmin);
    updateLoginButton();
    loadPage("home");
  };
}

export async function logoutUser() {
  await supabase.auth.signOut();
  currentUser = null;
  isAdmin = false;
  showAdminMenu(false);
  updateLoginButton();
  loadPage("home");
}

async function loadUserProfile(uid) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", uid)
    .single();
  if (error) {
    console.warn("Erro ao buscar perfil:", error.message);
    return null;
  }
  return data;
}
