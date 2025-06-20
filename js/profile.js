import { supabase } from "./supabaseClient.js";

export function loadAuthPage(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Entrar na sua conta</h2>
      <form id="loginForm" class="space-y-4">
        <input type="email" id="loginEmail" placeholder="Email" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <input type="password" id="loginPassword" placeholder="Senha" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Entrar
        </button>
      </form>
      <p class="mt-4 text-center text-gray-400">
        Não tem uma conta? 
        <a href="#" class="text-violet-400 hover:underline" onclick="navigate('register')">Registre-se</a>
      </p>
    </div>
  `;

  document.getElementById("loginForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Erro: " + error.message);

    const { user } = data;
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    onSuccess(user, profile?.is_admin);
  };
}

export function loadRegisterForm(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Criar nova conta</h2>
      <form id="signupForm" class="space-y-4">
        <input type="text" id="signupName" placeholder="Nome completo" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <input type="text" id="signupUsername" placeholder="Nome de usuário" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <input type="email" id="signupEmail" placeholder="Email" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <input type="password" id="signupPassword" placeholder="Senha (mín. 8 caracteres)" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Registrar
        </button>
      </form>
      <p class="mt-4 text-center text-gray-400">
        Já tem conta? 
        <a href="#" class="text-violet-400 hover:underline" onclick="navigate('login')">Entre aqui</a>
      </p>
    </div>
  `;

  document.getElementById("signupForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = e.target.signupName.value;
    const username = e.target.signupUsername.value;
    const email = e.target.signupEmail.value;
    const password = e.target.signupPassword.value;

    if (password.length < 8) return alert("A senha deve ter no mínimo 8 caracteres.");

    const res = await fetch("https://social-assistance-backend.onrender.com/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return alert("Erro: " + (err.detail || "Não foi possível iniciar o registro."));
    }

    document.getElementById("main-content").innerHTML = `
      <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
        <h2 class="text-xl font-semibold text-center mb-4">Verifique seu e‑mail</h2>
        <p class="text-center mb-6">Enviamos um código para <strong>${email}</strong>.</p>
        <form id="verifyForm" class="space-y-4">
          <input type="text" id="code" maxlength="6" placeholder="Código de verificação" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <button class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
            Verificar e Criar Conta
          </button>
        </form>
      </div>
    `;

    document.getElementById("verifyForm").onsubmit = async (e2) => {
      e2.preventDefault();
      const code = e2.target.code.value;

      const verifyRes = await fetch(`https://social-assistance-backend.onrender.com/auth/verify-code?code=${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password })
      });

      if (verifyRes.ok) {
        alert("Conta criada com sucesso! Faça login agora.");
        loadAuthPage(onSuccess);
      } else {
        const err = await verifyRes.json().catch(() => ({}));
        alert("Erro: " + (err.detail || "Falha ao verificar código"));
      }
    };
  };
}
