function loadPage(page) {
  if (page === 'auth') {
    document.getElementById('main-content').innerHTML = `
      <h2>Login / Registrar</h2>
      <form id="authForm">
        <div class="mb-3"><label>Email</label><input type="email" class="form-control" id="email" required></div>
        <div class="mb-3"><label>Nome</label><input type="text" class="form-control" id="name"></div>
        <div class="mb-3"><label>Sou desenvolvedor (ignorar verificação)</label><input type="checkbox" id="isDev"></div>
        <button type="submit" class="btn btn-primary">Continuar</button>
      </form>
    `;
    document.getElementById('authForm').onsubmit = authSubmit;
  }
}

async function authSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const dev = document.getElementById('isDev').checked;

  const loginRes = await fetch('https://<SEU-RENDER-APP>.onrender.com/auth/login', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email, name})
  }).then(res => res.json());

  if (dev) {
    currentUser = { email, name };
    isAdmin = true;
    showAdminMenu(true);
    updateLoginButton();
    loadPage('home');
    return;
  }

  await fetch('https://<SEU-RENDER-APP>.onrender.com/auth/send-code', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email, name})
  });

  document.getElementById('main-content').innerHTML = `
    <h2>Verifique seu Email</h2>
    <p>Código enviado para <strong>${email}</strong></p>
    <form id="verifyForm">
      <div class="mb-3"><label>Código</label><input type="text" class="form-control" id="code" maxlength="6"></div>
      <button type="submit" class="btn btn-success">Verificar</button>
    </form>
  `;

  document.getElementById('verifyForm').onsubmit = async (e) => {
    e.preventDefault();
    const code = document.getElementById('code').value;
    const res = await fetch(`https://<SEU-RENDER-APP>.onrender.com/auth/verify-code?email=${email}&code=${code}`, {method: 'POST'});
    if (res.ok) {
      currentUser = { email, name };
      updateLoginButton();
      loadPage('home');
    } else {
      alert('Código inválido ou expirado');
    }
  };
      }
