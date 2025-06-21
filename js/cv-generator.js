// cv-generator.js

export default function () {
  document.getElementById("main-content").innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt me-2"></i> Escolha o Modelo de Currículo</h2>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card bg-dark text-light h-100 border-purple">
          <div class="card-body text-center">
            <h5 class="card-title">Modelo Clássico</h5>
            <p class="card-text">Layout tradicional e organizado.</p>
            <button class="btn btn-outline-purple mt-3" onclick="selectModel('modelo1')">Selecionar</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card bg-dark text-light h-100 border-purple">
          <div class="card-body text-center">
            <h5 class="card-title">Modelo Moderno</h5>
            <p class="card-text">Visual clean com separadores elegantes.</p>
            <button class="btn btn-outline-purple mt-3" onclick="selectModel('modelo2')">Selecionar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.selectModel = async function (modelo) {
  try {
    const mod = await import(`./cv-models/${modelo}.js`);
    document.getElementById("main-content").innerHTML = "";
    if (mod.default) {
      mod.default(buildForm, modelo);
    } else {
      alert("Modelo não encontrado.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar formulário do modelo.");
  }
};

/**
 * Constrói formulário passo-a-passo para geração de CV
 */
function buildForm(modelo) {
  document.getElementById("main-content").innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt me-2"></i> Preencha seu Currículo</h2>
    <form id="cvForm" class="row g-3">
      <div class="col-md-6"><label>Nome completo*</label><input required name="nome" class="form-control" /></div>
      <div class="col-md-6"><label>Email*</label><input type="email" required name="email" class="form-control" /></div>
      <div class="col-md-6"><label>Telefone*</label><input required name="telefone" class="form-control" placeholder="(DDD) 9xxxx-xxxx" /></div>
      <div class="col-md-6"><label>Cidade</label><input name="cidade" class="form-control" /></div>
      <div class="col-md-4"><label>Nascimento</label><input type="date" name="nascimento" class="form-control" /></div>
      <div class="col-md-4"><label>Estado civil</label><select name="estado_civil" class="form-control">
        <option value="">--</option><option>Solteiro(a)</option><option>Casado(a)</option><option>Outro</option>
      </select></div>
      <div class="col-md-4"><label>LinkedIn</label><input name="linkedin" class="form-control" placeholder="https://..." /></div>
      <div class="col-12"><label>Objetivo profissional*</label><textarea name="objetivo" required rows="2" class="form-control"></textarea></div>
      <div class="col-12"><label>Formação acadêmica*</label><textarea name="formacao" required rows="2" class="form-control"></textarea></div>
      <div class="col-12"><label>Experiência profissional</label><textarea name="experiencia" rows="3" class="form-control"></textarea></div>
      <div class="col-12"><label>Cursos e Qualificações</label><textarea name="cursos" rows="2" class="form-control"></textarea></div>
      <div class="col-md-6"><label>Pretensão salarial</label><input name="salario" class="form-control" placeholder="R$ ..." /></div>
      <div class="col-md-6"><label>CNH</label><select name="cnh" class="form-control">
        <option value="">--</option><option>A</option><option>B</option><option>AB</option>
      </select></div>
      <div class="col-12"><label>Informações adicionais</label><textarea name="extras" rows="2" class="form-control"></textarea></div>
      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-purple px-5">Gerar PDF</button>
      </div>
    </form>
  `;

  document.getElementById("cvForm").onsubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch(`https://seusite.com/cv/generate?modelo=${modelo}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao gerar PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `curriculo-${modelo}.pdf`;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Falha ao gerar currículo.");
    }
  };
}
