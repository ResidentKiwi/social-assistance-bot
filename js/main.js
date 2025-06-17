let currentUser = null;
let isAdmin = false;

function loadPage(page) {
  fetch(`js/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
      switch(page) {
        case 'profile':
          if (typeof loadProfile === 'function') loadProfile(currentUser);
          break;
        case 'admin':
          if (typeof loadAdmin === 'function') loadAdmin();
          break;
      }
    })
    .catch(() => {
      document.getElementById('main-content').innerHTML = "<p>Erro ao carregar página.</p>";
    });
}

function showAdminMenu(show) {
  document.getElementById('admin-menu').classList.toggle('d-none', !show);
}

function updateLoginButton() {
  document.getElementById('btn-login').textContent = currentUser ? `Logout (${currentUser.email})` : 'Login';
}

document.getElementById('btn-login').onclick = () => {
  if (currentUser) {
    currentUser = null;
    isAdmin = false;
    showAdminMenu(false);
    updateLoginButton();
    loadPage('home');
  } else {
    loadPage('auth');
  }
}

loadPage('home');
