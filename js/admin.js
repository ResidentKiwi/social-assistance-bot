export default async function () {
  const res = await fetch('https://social-assistance-backend.onrender.com/admin/users', {
    headers: { 'X-User-Email': currentUser.email }
  });

  if (!res.ok) {
    document.getElementById('main-content').innerHTML = `<p class="text-danger">Acesso negado. Esta área é apenas para administradores.</p>`;
    return;
  }

  const data = await res.json();
  const users = data.users;

  let html = `
    <h2><i class="fas fa-toolbox"></i> Painel Administrativo</h2>
    <p class="mb-4">Gerencie os usuários registrados. Você pode promover ou despromover administradores.</p>
    <table class="table table-dark table-bordered">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
  `;

  users.forEach(user => {
    const actionBtn = user.is_admin
      ? `<button class="btn btn-warning btn-sm" onclick="toggleAdmin('${user.email}', false)">Despromover</button>`
      : `<button class="btn btn-success btn-sm" onclick="toggleAdmin('${user.email}', true)">Promover</button>`;

    html += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.is_admin ? '✅' : '❌'}</td>
        <td>${user.email !== currentUser.email ? actionBtn : '<em>(você)</em>'}</td>
      </tr>
    `;
  });

  html += '</tbody></table>';
  document.getElementById('main-content').innerHTML = html;
}

window.toggleAdmin = async function (email, promote) {
  const endpoint = promote ? 'promote' : 'demote';
  const res = await fetch(`https://social-assistance-backend.onrender.com/admin/users/${endpoint}?email=${encodeURIComponent(email)}`, {
    method: 'POST',
    headers: { 'X-User-Email': currentUser.email }
  });

  if (res.ok) {
    navigate('admin'); // recarrega a página
  } else {
    alert('Erro ao atualizar permissões.');
  }
};
