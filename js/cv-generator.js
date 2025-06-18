export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt"></i> Gerador de Currículo</h2>
    <form id="cvForm" class="bg-dark p-4 rounded border border-secondary">
      <h5 class="text-info">Dados Pessoais</h5>
      <div class="mb-3"><label class="form-label">Nome completo*</label><input type="text" class="form-control" id="nome" required></div>
      <div class="mb-3"><label class="form-label">Email*</label><input type="email" class="form-control" id="email" required></div>
      <div class="mb-3"><label class="form-label">Telefone*</label><input type="text" class="form-control" id="telefone" required></div>

      <h5 class="text-info mt-4">Área e Objetivo Profissional*</h5>
      <div class="mb-3">
        <textarea class="form-control" id="objetivo" rows="3" required></textarea>
        <small class="text-muted">Exemplo: “Desejo iniciar minha carreira em uma empresa onde eu possa crescer e aprender continuamente.”</small>
      </div>

      <h5 class="text-info mt-4">Formação Acadêmica*</h5>
      <div class="mb-3"><textarea class="form-control" id="formacao" rows="3" required></textarea></div>

      <h5 class="text-info mt-4">Experiência Profissional (opcional)</h5>
      <div class="mb-3"><textarea class="form-control" id="experiencia" rows="3"></textarea></div>

      <h5 class="text-info mt-4">Cursos e Qualificações (opcional)</h5>
      <div class="mb-3"><textarea class="form-control" id="cursos" rows="3"></textarea></div>

      <h5 class="text-info mt-4">Informações Complementares (opcional)</h5>
      <div class="mb-3"><textarea class="form-control" id="extras" rows="3"></textarea></div>

      <button type="submit" class="btn btn-primary w-100 mt-3">Gerar Currículo</button>
    </form>
  `;

  document.getElementById('cvForm').onsubmit = async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      objetivo: document.getElementById('objetivo').value.trim() || "Busco minha primeira oportunidade no mercado, com foco em crescimento profissional e desenvolvimento de novas habilidades.",
      formacao: document.getElementById('formacao').value.trim(),
      experiencia: document.getElementById('experiencia').value.trim(),
      cursos: document.getElementById('cursos').value.trim(),
      extras: document.getElementById('extras').value.trim(),
    };

    const obrigatorios = ['nome', 'email', 'telefone', 'objetivo', 'formacao'];
    for (const campo of obrigatorios) {
      if (!dados[campo]) return alert("Por favor, preencha todos os campos obrigatórios.");
    }

    const res = await fetch('https://social-assistance-backend.onrender.com/cv/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
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
}
