export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt me-2"></i> Modelo Clássico</h2>
    <form id="cvForm" class="row g-3">

      <!-- Dados principais -->
      <div class="col-md-6"><label class="form-label">Nome completo *</label><input type="text" class="form-control" id="nome" required></div>
      <div class="col-md-6"><label class="form-label">E-mail *</label><input type="email" class="form-control" id="email" required></div>
      <div class="col-md-6"><label class="form-label">Telefone *</label><input type="tel" class="form-control" id="telefone" required></div>
      <div class="col-md-6"><label class="form-label">Cidade / UF</label><input type="text" class="form-control" id="cidade"></div>
      <div class="col-md-6"><label class="form-label">Data de nascimento</label><input type="date" class="form-control" id="nascimento"></div>
      <div class="col-md-6"><label class="form-label">Estado civil</label><input type="text" class="form-control" id="estado_civil" placeholder="Solteiro(a), Casado(a)..." /></div>
      <div class="col-md-6"><label class="form-label">LinkedIn (opcional)</label><input type="url" class="form-control" id="linkedin"></div>
      <div class="col-md-6"><label class="form-label">Pretensão salarial</label><input type="text" class="form-control" id="salario" placeholder="Ex: R$ 2.500,00" /></div>
      <div class="col-md-6"><label class="form-label">Possui CNH?</label><select class="form-select" id="cnh"><option value="">Selecione</option><option>Sim</option><option>Não</option></select></div>
      <div class="col-md-6"><label class="form-label">Disponibilidade</label><input type="text" class="form-control" id="disponibilidade" placeholder="Viagens, mudança, horários..." /></div>

      <!-- Objetivo e formação -->
      <div class="col-12"><label class="form-label">Objetivo profissional *</label><textarea class="form-control" id="objetivo" rows="2" required></textarea></div>
      <div class="col-12">
        <label class="form-label">Escolaridade *</label>
        <select class="form-select" id="formacao" required>
          <option value="" disabled selected>Selecione</option>
          <option>Ensino Fundamental Incompleto</option>
          <option>Ensino Fundamental Completo</option>
          <option>Ensino Médio Incompleto</option>
          <option>Ensino Médio Completo</option>
          <option>Ensino Superior Incompleto</option>
          <option>Ensino Superior Completo</option>
        </select>
      </div>

      <!-- Blocos adicionais -->
      <div class="col-12"><label class="form-label">Experiência Profissional</label><textarea class="form-control" id="experiencia" rows="3"></textarea></div>
      <div class="col-12"><label class="form-label">Cursos e Qualificações</label><textarea class="form-control" id="cursos" rows="3"></textarea></div>
      <div class="col-12"><label class="form-label">Informações Adicionais</label><textarea class="form-control" id="extras" rows="2"></textarea></div>

      <div class="col-12 text-end"><button type="submit" class="btn btn-primary mt-3"><i class="fas fa-download me-2"></i> Gerar Currículo</button></div>
    </form>
  `;

  document.getElementById('cvForm').onsubmit = async (e) => {
    e.preventDefault();
    const campos = ['nome','email','telefone','cidade','nascimento','linkedin','salario','cnh','disponibilidade','estado_civil','objetivo','formacao','experiencia','cursos','extras'];
    const dados = {};
    campos.forEach(id => dados[id] = document.getElementById(id)?.value || '');

    const res = await fetch(`https://social-assistance-backend.onrender.com/cv/generate?modelo=modelo1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!res.ok) return alert('Erro ao gerar currículo');
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "curriculo.pdf";
    a.click();
  };
}
