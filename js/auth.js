import jwtDecode from 'jwt-decode';

function togglePasswordVisibility(btn, inputs) {
  inputs.forEach(input => {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    btn.innerHTML = type === 'text'
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  });
}

function validatePassword(pwd) {
  return {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

export function loadAuthPage(onSuccess) {
  document.getElementById('main-content').innerHTML = `...`; // mesmo HTML

  const pwdInput = document.getElementById('loginPassword');
  document.getElementById('toggleLoginPwd')
    .onclick = () => togglePasswordVisibility(document.getElementById('toggleLoginPwd'), [pwdInput]);

  document.getElementById('loginForm').onsubmit = async e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = pwdInput.value;

    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      return alert(`Erro: ${err.detail || res.statusText}`);
    }

    const { token } = await res.json();
    localStorage.setItem('token', token);

    const payload = jwtDecode(token);
    onSuccess(payload.sub, payload.is_admin);
  };
}

export function loadRegisterForm(onSuccess) {
  document.getElementById('main-content').innerHTML = `...`; // mesmo HTML

  const pwd = document.getElementById('signupPassword');
  const confirmPwd = document.getElementById('signupConfirm');
  document.getElementById('togglePwd')
    .onclick = () => togglePasswordVisibility(document.getElementById('togglePwd'), [pwd, confirmPwd]);

  pwd.oninput = () => {
    const rules = validatePassword(pwd.value);
    Object.entries(rules).forEach(([k, ok]) => {
      const el = document.getElementById(`c_${k}`);
      el.className = ok
        ? 'fas fa-check-circle text-green-400 me-2'
        : 'fas fa-circle-notch fa-spin text-gray-400 me-2';
    });
  };

  document.getElementById('signupForm').onsubmit = async e => {
    e.preventDefault();

    if (pwd.value !== confirmPwd.value)
      return alert('As senhas não coincidem.');

    const file = document.getElementById('avatarFile').files[0];
    const form = new FormData();
    form.append('name', document.getElementById('signupName').value.trim());
    form.append('username', document.getElementById('signupUsername').value.trim());
    form.append('email', document.getElementById('signupEmail').value.trim());
    form.append('password', pwd.value.trim());
    if (file) form.append('avatar', file);

    const res = await fetch('/auth/send-code', {
      method: 'POST',
      body: form
    });

    if (!res.ok) {
      const err = await res.json();
      return alert('Erro: ' + (err.detail || 'Falha'));
    }

    document.getElementById('main-content').innerHTML = `...verificação de código...`;

    document.getElementById('verifyForm').onsubmit = async evt => {
      evt.preventDefault();
      const code = document.getElementById('code').value.trim();
      const res2 = await fetch(`/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email: form.get('email') })
      });

      if (!res2.ok) {
        const err = await res2.json();
        return alert('Erro: ' + (err.detail || 'Verificação falhou'));
      }

      alert('Conta criada com sucesso! Faça login.');
      loadAuthPage(onSuccess);
    };
  };
}
