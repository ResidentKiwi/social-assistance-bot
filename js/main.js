function loadPage(page) {
  fetch(`js/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
      if (page === 'profile' && typeof loadProfile === 'function') loadProfile();
    })
    .catch(err => {
      document.getElementById('main-content').innerHTML = "<p>Erro ao carregar página.</p>";
    });
}
