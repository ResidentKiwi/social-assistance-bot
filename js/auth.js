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
          <input type="password" id="signupPassword" class="form-control mb-3" placeholder="Senha segura (mín. 8 caracteres)" required />
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

    if (password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    const res = await fetch("https://social-assistance-backend.onrender.com/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password })
    });

    if (!res.ok) {
      const error = await res.json();
      return alert("Erro: " + (error.detail || "Não foi possível iniciar o registro."));
    }

    document.getElementById("main-content").innerHTML = `
      <h2 class="mb-3 text-center">Verifique seu email</h2>
      <p class="text-center">Enviamos um código de verificação para <strong>${email}</strong>.</p>
      <form id="verifyForm" class="row justify-content-center mt-4">
        <div class="col-md-6">
          <input type="text" id="code" maxlength="6" class="form-control mb-3" placeholder="Código de verificação" required />
          <button class="btn btn-primary w-100">Verificar e Criar Conta</button>
        </div>
      </form>
    `;

    document.getElementById("verifyForm").onsubmit = async (e) => {
      e.preventDefault();
      const code = document.getElementById("code").value;

      const verifyRes = await fetch(`https://social-assistance-backend.onrender.com/auth/verify-code?code=${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password })
      });

      if (verifyRes.ok) {
        alert("Conta criada com sucesso! Faça login agora.");
        loadAuthPage(onSuccess);
      } else {
        const err = await verifyRes.json();
        alert("Erro: " + (err.detail || "Falha ao verificar código"));
      }
    };
  };
}
