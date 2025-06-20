import { supabase } from "./supabaseClient.js";

function togglePasswordVisibility(btn, inputs) {
  inputs.forEach(input => {
    const type = input.type === "password" ? "text" : "password";
    input.type = type;
    btn.innerHTML = type === "text" ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
  });
}

function validatePassword(pwd) {
  const rules = {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
  return rules;
}

export function loadAuthPage(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Entrar na sua conta</h2>
      <form id="loginForm" class="space-y-4">
        <input type="email" id="loginEmail" placeholder="Email" required
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <div class="relative">
          <input type="password" id="loginPassword" placeholder="Senha" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <button type="button" id="toggleLoginPwd" class="absolute top-3 right-3 text-gray-400"><i class="fas fa-eye"></i></button>
        </div>
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Entrar
        </button>
      </form>
    </div>`;
  
  const pwdInput = document.getElementById("loginPassword");
  document.getElementById("toggleLoginPwd").onclick = () => togglePasswordVisibility(document.getElementById("toggleLoginPwd"), [pwdInput]);

  document.getElementById("loginForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = pwdInput.value;
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
        <input type="text" id="signupName" placeholder="Nome completo" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-violet-600" />
        <input type="text" id="signupUsername" placeholder="Nome de usuário" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-violet-600" />
        <input type="email" id="signupEmail" placeholder="Email" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-violet-600" />
        <div class="relative">
          <input type="password" id="signupPassword" placeholder="Senha (mín. 8 caracteres)" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-violet-600" />
          <button type="button" id="togglePwd" class="absolute top-3 right-3 text-gray-400"><i class="fas fa-eye"></i></button>
        </div>
        <div id="pwdChecklist" class="text-gray-400 text-sm space-y-1">
          <div class="flex items-center"><i id="c_len" class="fas fa-circle-notch fa-spin text-gray-400 me-2"></i> Mínimo 8 caracteres</div>
          <div class="flex items-center"><i id="c_upper" class="fas fa-circle-notch fa-spin text-gray-400 me-2"></i> Uma letra maiúscula</div>
          <div class="flex items-center"><i id="c_lower" class="fas fa-circle-notch fa-spin text-gray-400 me-2"></i> Uma letra minúscula</div>
          <div class="flex items-center"><i id="c_number" class="fas fa-circle-notch fa-spin text-gray-400 me-2"></i> Um número</div>
          <div class="flex items-center"><i id="c_special" class="fas fa-circle-notch fa-spin text-gray-400 me-2"></i> Um caractere especial</div>
        </div>
        <div class="relative">
          <input type="password" id="signupConfirm" placeholder="Confirme a senha" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-violet-600" />
        </div>
        <div>
          <label class="block mb-1">Avatar (opcional)</label>
          <input type="file" id="avatarFile" accept="image/*" class="w-full text-gray-400" />
        </div>
        <button type="submit" id="btn-signup"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Registrar
        </button>
      </form>
    </div>`;

  const pwd = document.getElementById("signupPassword");
  const confirmPwd = document.getElementById("signupConfirm");
  document.getElementById("togglePwd").onclick = () => togglePasswordVisibility(document.getElementById("togglePwd"), [pwd, confirmPwd]);

  pwd.oninput = () => {
    const rules = validatePassword(pwd.value);
    Object.entries(rules).forEach(([k, ok]) => {
      const el = document.getElementById("c_" + k);
      el.className = ok ? "fas fa-check-circle text-green-400 me-2" : "fas fa-circle-notch fa-spin text-gray-400 me-2";
    });
  };

  document.getElementById("signupForm").onsubmit = async (e) => {
    e.preventDefault();
    if (pwd.value !== confirmPwd.value) return alert("As senhas não coincidem.");

    const name = document.getElementById("signupName").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = pwd.value.trim();

    const res = await fetch("https://social-assistance-backend.onrender.com/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      return alert("Erro: " + (err.detail || "Início do registro falhou"));
    }

    document.getElementById("main-content").innerHTML = `
      <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10 text-center">
        <h2 class="text-xl font-semibold mb-4">Verifique seu e‑mail</h2>
        <p class="mb-6">Enviamos um código para <strong>${email}</strong>.</p>
        <form id="verifyForm">
          <input type="text" id="code" maxlength="6" placeholder="Código de verificação" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 mb-4 focus:ring-2 focus:ring-violet-600" />
          <button class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">Verificar e Criar</button>
        </form>
      </div>`;
    
    document.getElementById("verifyForm").onsubmit = async (e) => {
      e.preventDefault();
      const code = document.getElementById("code").value.trim();

      const verifyRes = await fetch(`https://social-assistance-backend.onrender.com/auth/verify-code?code=${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (!verifyRes.ok) {
        const err = await verifyRes.json();
        return alert("Erro: " + (err.detail || "Falha ao verificar código"));
      }

      // Upload avatar se selecionado
      const file = document.getElementById("avatarFile").files[0];
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `avatars/${email}.${ext}`;
        const { error: uplErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
        if (uplErr) console.warn("Erro upload avatar:", uplErr);
        else {
          const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
          await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", (await supabase.auth.getUser()).data.user.id);
        }
      }

      alert("Conta criada com sucesso! Faça login agora.");
      loadAuthPage(onSuccess);
    };
  };
                            }
