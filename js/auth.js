import { supabase } from "./supabaseClient.js";

function togglePasswordVisibility(toggleBtn, ...fields) {
  fields.forEach(field => {
    field.type = field.type === "password" ? "text" : "password";
    toggleBtn.innerHTML = field.type === "text"
      ? '<i class="fas fa-eye-slash"></i> Ocultar'
      : '<i class="fas fa-eye"></i> Ver';
  });
}

function createPasswordChecklist() {
  const checklist = document.createElement("ul");
  checklist.classList.add("password-checklist", "list-unstyled", "ps-0", "small", "text-muted");
  const items = [
    { id: "length", text: "Mín. 8 caracteres", check: v => v.length >= 8 },
    { id: "uppercase", text: "Maiúscula (A‑Z)", check: v => /[A-Z]/.test(v) },
    { id: "lowercase", text: "Minúscula (a‑z)", check: v => /[a-z]/.test(v) },
    { id: "number", text: "Número (0‑9)", check: v => /\d/.test(v) },
    { id: "special", text: "Caractere especial (!@#…)", check: v => /[^A-Za-z0-9]/.test(v) },
  ];
  items.forEach(i => {
    const li = document.createElement("li");
    li.id = `pw-${i.id}`;
    li.innerHTML = `<i class="far fa-circle me-2"></i>${i.text}`;
    checklist.appendChild(li);
  });
  checklist._items = items;
  return checklist;
}

function updateChecklist(checklist, val) {
  checklist._items.forEach(i => {
    const li = checklist.querySelector(`#pw-${i.id}`);
    const met = i.check(val);
    li.innerHTML = `<i class="${met ? "fas fa-check-circle text-success" : "far fa-circle"} me-2"></i>${i.text}`;
  });
}

export function loadAuthPage(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Entrar na sua conta</h2>
      <form id="loginForm" class="space-y-4">
        <div class="position-relative">
          <input type="email" id="loginEmail" placeholder="Email" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        </div>
        <div class="position-relative">
          <input type="password" id="loginPassword" placeholder="Senha" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <span id="loginToggle" class="position-absolute" style="top:12px; right:12px; cursor:pointer;">
            <i class="fas fa-eye"></i>
          </span>
        </div>
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Entrar
        </button>
      </form>
    </div>
  `;

  const passField = document.getElementById("loginPassword");
  const loginToggle = document.getElementById("loginToggle");
  loginToggle.onclick = () => togglePasswordVisibility(loginToggle, passField);

  document.getElementById("loginForm").onsubmit = async e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = passField.value;

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
        <div class="position-relative">
          <input type="password" id="signupPassword" placeholder="Senha" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <span id="regToggle" class="position-absolute" style="top:12px; right:12px; cursor:pointer;">
            <i class="fas fa-eye"></i>
          </span>
        </div>
        <div class="position-relative">
          <input type="password" id="signupPassword2" placeholder="Repita a senha" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        </div>
        <div id="pwChecklistContainer"></div>
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Registrar-se
        </button>
      </form>
    </div>
  `;

  const pw1 = document.getElementById("signupPassword");
  const pw2 = document.getElementById("signupPassword2");
  const regToggle = document.getElementById("regToggle");
  regToggle.onclick = () => togglePasswordVisibility(regToggle, pw1, pw2);

  const checklist = createPasswordChecklist();
  document.getElementById("pwChecklistContainer").appendChild(checklist);

  [pw1, pw2].forEach(f => f.addEventListener("input", () => {
    updateChecklist(checklist, pw1.value);
  }));

  document.getElementById("signupForm").onsubmit = async e => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const passv = pw1.value;
    const pass2 = pw2.value;

    if (passv !== pass2) {
      return alert("As senhas não conferem.");
    }

    const unmet = checklist._items.filter(i => !i.check(passv));
    if (unmet.length) {
      return alert("A senha não atende aos requisitos.");
    }

    const res = await fetch("https://social-assistance-backend.onrender.com/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password: passv })
    });

    if (!res.ok) {
      const err = await res.json();
      return alert("Erro: " + (err.detail || "Não foi possível iniciar o registro."));
    }

    document.getElementById("main-content").innerHTML = `
      <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10 text-center">
        <h2 class="text-xl font-semibold mb-4">Verifique seu e‑mail</h2>
        <p>Um código de verificação foi enviado para <strong>${email}</strong>.</p>
        <form id="verifyForm" class="space-y-4 mt-4">
          <input type="text" id="code" maxlength="6" placeholder="Código de verificação" required
            class="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <button class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
            Verificar & Criar Conta
          </button>
        </form>
      </div>`;
    
    document.getElementById("verifyForm").onsubmit = async ev => {
      ev.preventDefault();
      const code = document.getElementById("code").value.trim();

      const vr = await fetch(`https://social-assistance-backend.onrender.com/auth/verify-code?code=${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password: passv })
      });

      if (vr.ok) {
        alert("Conta criada com sucesso! Agora é só fazer login.");
        loadAuthPage(onSuccess);
      } else {
        const err = await vr.json().catch(() => ({}));
        alert("Erro: " + (err.detail || "Falha ao verificar código"));
      }
    };
  };
    }
