function loadProfile(user) {
  document.getElementById('main-content').innerHTML = `
    <h2><i class="fas fa-user"></i> Perfil</h2>
    <form id="profileForm">
      <div class="mb-3"><label class="form-label">Nome</label><input class="form-control" id="nome" value="${user?.name || ''}"></div>
      <div class="mb-3"><label class="form-label">Email</label><input class="form-control" id="email" value="${user?.email || ''}" disabled></div>
      <div class="mb-3"><label class="form-label">Descrição</label><textarea class="form-control" id="desc" placeholder="Sobre você..."></textarea></div>
      <div class="mb-3"><label class="form-label">Foto</label><input class="form-control" id="foto" placeholder="URL da foto"></div>
      <button type="submit" class="btn btn-info">Salvar</button>
    </form>
  `;

  document.getElementById('profileForm').onsubmit = e => {
    e.preventDefault();
    alert('Perfil salvo localmente. Integração futura com Supabase.');
  };
}
