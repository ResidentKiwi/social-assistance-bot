export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt"></i> Currículo Profissional</h2>
    <form id="cvForm" class="bg-dark p-4 rounded border border-secondary">
      <label class="form-label mt-2">Nome*</label>
      <input type="text" class="form-control mb-3" id="nome" placeholder="João da Silva" required>

      <label class="form-label">Email*</label>
      <input type="email" class="form-control mb-3" id="email" placeholder="exemplo@email.com" required>

      <label class="form-label">Telefone*</label>
      <input type="text" class="form-control mb-3" id="telefone" placeholder="(99) 99999-9999" required>

      <label class="form-label">Escolaridade*</label>
      <select class="form-select mb-3" id="formacao" required>
        <option value="" disabled selected>Selecione...</option>
        <option>Ensino Fundamental Incompleto</option>
        <option>Ensino Fundamental Completo</option>
        <option>Ensino Médio Incompleto</option>
        <option>Ensino Médio Completo</option>
        <option>Superior Incompleto</option>
        <option>Superior Completo</option>
        <option>Pós-graduação / Especialização</option>
      </select>

      <label class="form-label">Objetivo*</label>
      <input type="text" class="form-control mb-3" id="objetivo" placeholder="Ex: Atuar na área administrativa" required>

      <label class="form-label">Experiência (opcional)</label>
      <textarea class="form-control mb-3" id="experiencia" rows="2" placeholder="Empresa, cargo, período..."></textarea>

      <label class="form-label">Cursos (opcional)</label>
      <textarea class="form-control mb-3" id="cursos" rows="2" placeholder="Curso, instituição, ano..."></textarea>

      <label class="form-label">Informações adicionais (opcional)</label>
      <textarea class="form-control mb-3" id="extras" rows="2" placeholder="Idiomas, voluntariado, disponibilidade..."></textarea>

      <button type="submit" class="btn btn-primary w-100 mt-2"><i class="fas fa-file-download me-2"></i> Baixar Currículo em PDF</button>
    </form>
  `;

  document.getElementById('cvForm').onsubmit = async (e) => {
    e.preventDefault();
    const dados = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      objetivo: document.getElementById('objetivo').value.trim(),
      formacao: document.getElementById('formacao').value,
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
