export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt me-2"></i> Gerador de Currículo</h2>
    <form id="cvForm" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nome completo *</label>
        <input type="text" class="form-control" id="nome" required placeholder="João da Silva" />
      </div>
      <div class="col-md-6">
        <label class="form-label">E-mail *</label>
        <input type="email" class="form-control" id="email" required placeholder="joao@email.com" />
      </div>
      <div class="col-md-6">
        <label class="form-label">Telefone *</label>
        <input type="tel" class="form-control" id="telefone" required placeholder="(99) 99999-9999" />
      </div>
      <div class="col-md-6">
        <label class="form-label">Cidade / UF</label>
        <input type="text" class="form-control" id="cidade" placeholder="Recife / PE" />
      </div>
      <div class="col-md-6">
        <label class="form-label">Data de nascimento</label>
        <input type="date" class="form-control" id="nascimento" />
      </div>
      <div class="col-md-6">
        <label class="form-label">LinkedIn (opcional)</label>
        <input type="url" class="form-control" id="linkedin" placeholder="https://linkedin.com/in/seunome" />
      </div>
      <div class="col-12">
        <label class="form-label">Objetivo Profissional *</label>
        <textarea class="form-control" id="objetivo" rows="2" required placeholder="Atuar na área de atendimento e crescer profissionalmente..."></textarea>
      </div>
      <div class="col-12">
        <label class="form-label">Formação Acadêmica *</label>
        <select class="form-select" id="formacao" required>
          <option selected disabled value="">Selecione</option>
          <option>Ensino Fundamental Incompleto</option>
          <option>Ensino Fundamental Completo</option>
          <option>Ensino Médio Incompleto</option>
          <option>Ensino Médio Completo</option>
          <option>Ensino Superior Incompleto</option>
          <option>Ensino Superior Completo</option>
        </select>
      </div>
      <div class="col-12">
        <label class="form-label">Experiência Profissional</label>
        <textarea class="form-control" id="experiencia" rows="3" placeholder="Cargo, empresa, período, atividades desenvolvidas..."></textarea>
      </div>
      <div class="col-12">
        <label class="form-label">Cursos e Qualificações</label>
        <textarea class="form-control" id="cursos" rows="3" placeholder="Curso de informática básica, Curso técnico em..."></textarea>
      </div>
      <div class="col-12">
        <label class="form-label">Informações Adicionais</label>
        <textarea class="form-control" id="extras" rows="2" placeholder="Disponibilidade para viagens, CNH, voluntariados..."></textarea>
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-primary mt-3">
          <i class="fas fa-download me-2"></i> Gerar Currículo
        </button>
      </div>
    </form>
  `;

  document.getElementById('cvForm').onsubmit = async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      cidade: document.getElementById("cidade").value,
      nascimento: document.getElementById("nascimento").value,
      linkedin: document.getElementById("linkedin").value,
      objetivo: document.getElementById("objetivo").value,
      formacao: document.getElementById("formacao").value,
      experiencia: document.getElementById("experiencia").value,
      cursos: document.getElementById("cursos").value,
      extras: document.getElementById("extras").value
    };

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
