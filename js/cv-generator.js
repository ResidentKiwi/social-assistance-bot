export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4"><i class="fas fa-file-alt me-2"></i> Escolha o Modelo de Currículo</h2>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card bg-dark text-light h-100">
          <div class="card-body text-center">
            <h5 class="card-title">Modelo Clássico</h5>
            <p class="card-text">Layout simples, visual tradicional.</p>
            <button class="btn btn-outline-light" onclick="selectModel('modelo1')">Selecionar</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card bg-dark text-light h-100">
          <div class="card-body text-center">
            <h5 class="card-title">Modelo Moderno</h5>
            <p class="card-text">Visual clean com separadores elegantes.</p>
            <button class="btn btn-outline-light" onclick="selectModel('modelo2')">Selecionar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Permite seleção global
window.selectModel = async function (modelo) {
  try {
    const mod = await import(`./cv-models/${modelo}.js`);
    document.getElementById('main-content').innerHTML = '';
    if (mod.default) mod.default();
  } catch (err) {
    alert('Erro ao carregar modelo: ' + modelo);
    console.error(err);
  }
};
