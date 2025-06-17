document.getElementById('main-content').innerHTML = `
  <h2><i class="fas fa-file-alt"></i> Gerador de Currículo</h2>
  <form id="cvForm">
    <div class="mb-3">
      <label class="form-label">Nome</label>
      <input type="text" class="form-control" id="nome" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" class="form-control" id="email" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Experiência</label>
      <textarea class="form-control" id="experiencia" rows="4"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Gerar Currículo</button>
  </form>
`;

document.getElementById('cvForm').onsubmit = async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const experiencia = document.getElementById('experiencia').value;

  const res = await fetch('https://social-assistance-backend.onrender.com/cv/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nome, email, experience: experiencia })
  });

  if (!res.ok) {
    alert("Erro ao gerar currículo.");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "curriculo.pdf";
  a.click();
};
