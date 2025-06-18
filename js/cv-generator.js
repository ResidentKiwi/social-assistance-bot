export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt"></i> Gerador de Currículo</h2>
    <form id="cvForm" class="bg-dark p-4 rounded border border-secondary">
      <h5 class="text-info">📌 Dados Pessoais</h5>
      <div class="mb-3"><input type="text" class="form-control" id="nome" placeholder="Ex: João da Silva" required></div>
      <div class="mb-3"><input type="email" class="form-control" id="email" placeholder="Ex: joao@email.com" required></div>
      <div class="mb-3"><input type="text" class="form-control" id="telefone" placeholder="Ex: (11) 91234-5678" required></div>

      <h5 class="text-info mt-4">🎯 Objetivo Profissional</h5>
      <div class="mb-3">
        <textarea class="form-control" id="objetivo" rows="3" placeholder="Ex: Ingressar na área administrativa com foco em crescimento e aprendizado." required></textarea>
      </div>

      <h5 class="text-info mt-4">🎓 Formação Acadêmica</h5>
      <div class="mb-3">
        <textarea class="form-control" id="formacao" rows="3" placeholder="Ex: Ensino Médio completo – Escola Estadual ABC – 2022" required></textarea>
      </div>

      <h5 class="text-info mt-4">💼 Experiência Profissional (opcional)</h5>
      <div class="mb-3">
        <textarea class="form-control" id="experiencia" rows="3" placeholder="Ex: Auxiliar administrativo – Empresa XYZ – jan/2021 a dez/2022"></textarea>
      </div>

      <h5 class="text-info mt-4">📚 Cursos e Qualificações (opcional)</h5>
      <div class="mb-3">
        <textarea class="form-control" id="cursos" rows="3" placeholder="Ex: Curso de Excel Básico – SENAI – 2023"></textarea>
      </div>

      <h5 class="text-info mt-4">➕ Informações Complementares (opcional)</h5>
      <div class="mb-3">
        <textarea class="form-control" id="extras" rows="3" placeholder="Ex: Trabalho voluntário, habilidades em equipe, disponibilidade para viagens..."></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100 mt-3">
        <i class="fas fa-download me-2"></i> Gerar Currículo em PDF
      </button>
    </form>
  `;

  document.getElementById('cvForm').onsubmit = async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      objetivo: document.getElementById('objetivo').value.trim() || "Busco minha primeira oportunidade no mercado com foco em aprendizado e desenvolvimento.",
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
