import { supabase } from "./supabaseClient.js";

export function loadAuthPage(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Entrar</h2>
        <form id="loginForm">
          <input type="email" id="loginEmail" class="form-control mb-3" placeholder="Email" required />
          <input type="password" id="loginPassword" class="form-control mb-3" placeholder="Senha" required />
          <button type="submit" class="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("loginForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Erro: " + error.message);

    const { user } = data;
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    onSuccess(user, profile?.is_admin);
  };
}

export function loadRegisterForm(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center mb-4">Criar Conta</h2>
        <form id="signupForm">
          <input type="text" id="signupName" class="form-control mb-3" placeholder="Nome completo" required />
          <input type="text" id="signupUsername" class="form-control mb-3" placeholder="Nome de usuário" required />
          <input type="email" id="signupEmail" class="form-control mb-3" placeholder="Email" required />
          <input type="password" id="signupPassword" class="form-control mb-3" placeholder="Senha segura" required />
          <button type="submit" class="btn btn-success w-100">Registrar</button>
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, username }
      }
    });

    if (error) return alert("Erro: " + error.message);
    alert("Conta criada! Verifique seu e-mail para ativar.");

    const { user } = data;
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    onSuccess(user, profile?.is_admin);
  };
}
