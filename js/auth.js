import { supabase } from "./supabaseClient.js";

const PASSWORD_RULES = [
  { regex: /.{8,}/, label: "Mínimo de 8 caracteres" },
  { regex: /[A-Z]/, label: "Letra maiúscula (A‑Z)" },
  { regex: /[a-z]/, label: "Letra minúscula (a‑z)" },
  { regex: /[0-9]/, label: "Número (0‑9)" },
  { regex: /[^A-Za-z0-9]/, label: "Caractere especial (!@#...)" },
];

function createPasswordChecklist() {
  return PASSWORD_RULES
    .map((r, i) => `<li id="rule-${i}" class="text-danger">❌ ${r.label}</li>`)
    .join("");
}

export function loadAuthPage(onSuccess) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Entrar na sua conta</h2>
      <form id="loginForm" class="space-y-4">
        <div class="relative">
          <input type="email" id="loginEmail" placeholder="Email" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        </div>
        <div class="relative">
          <input type="password" id="loginPassword" placeholder="Senha" required
            class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <button type="button" class="absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200" onclick="togglePassword('loginPassword')">
            <i class="fas fa-eye"></i>
          </button>
        </div>
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">
          Entrar
        </button>
      </form>
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
    <div class="max-w-xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10 space-y-4">
      <h2 class="text-2xl font-semibold text-center">Criar nova conta</h2>
      <form id="signupForm" class="space-y-4">
        <input type="text" id="signupName" placeholder="Nome completo" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <input type="text" id="signupUsername" placeholder="Nome de usuário" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <input type="email" id="signupEmail" placeholder="Email" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <div class="relative">
          <input type="password" id="signupPassword" placeholder="Senha" required class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600" />
          <button type="button" class="absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200" onclick="togglePassword('signupPassword')"><i class="fas fa-eye"></i></button>
        </div>
        <div class="space-y-1 text-sm text-gray-300"><ul>${createPasswordChecklist()}</ul></div>
        <div class="text-sm text-gray-400"><input type="checkbox" id="showAllPass"> Mostrar senha acima</div>
        <button type="submit" id="registerBtn"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded disabled:opacity-50 transition-all duration-300" disabled>
          Registrar
        </button>
      </form>
    </div>
  `;

  const passInput = document.getElementById("signupPassword");
  const checklist = PASSWORD_RULES.map((rule, i) => ({
    el: document.getElementById(`rule-${i}`),
    regex: rule.regex
  }));
  const registerBtn = document.getElementById("registerBtn");

  passInput.addEventListener("input", () => {
    const val = passInput.value;
    let allOK = true;
    checklist.forEach(c => {
      const ok = c.regex.test(val);
      c.el.textContent = `${ok ? '✅' : '❌'} ${c.el.textContent.slice(2)}`;
      c.el.classList.toggle("text-success", ok);
      c.el.classList.toggle("text-danger", !ok);
      if (!ok) allOK = false;
    });
    registerBtn.disabled = !allOK;
  });

  document.getElementById("showAllPass").addEventListener("change", () => {
    passInput.type = passInput.type === "password" ? "text" : "password";
  });

  document.getElementById("signupForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = passInput.value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, username } }
    });
    if (error) return alert("Erro: " + error.message);

    alert("Cadastro realizado! Verifique seu email para ativar.");

    // Volta ao login
    loadAuthPage(onSuccess);
  };
}

// Função global para alternar visibilidade da senha
window.togglePassword = function (id) {
  const inp = document.getElementById(id);
  if (inp) inp.type = inp.type === "password" ? "text" : "password";
};
