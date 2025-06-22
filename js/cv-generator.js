// cv-generator.js
export default function () {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold text-purple-200 mb-6 flex items-center gap-2">
        <i class="fas fa-file-alt text-purple-500"></i> Escolha o Modelo de Currículo
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h3 class="text-xl font-medium text-white mb-2">Modelo Clássico</h3>
          <p class="text-gray-400 text-center mb-4">Layout tradicional e organizado.</p>
          <button class="px-6 py-2 bg-transparent border-2 border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white transition"
                  onclick="selectModel('modelo1')">
            Selecionar
          </button>
        </div>
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h3 class="text-xl font-medium text-white mb-2">Modelo Moderno</h3>
          <p class="text-gray-400 text-center mb-4">Visual clean com separadores elegantes.</p>
          <button class="px-6 py-2 bg-transparent border-2 border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white transition"
                  onclick="selectModel('modelo2')">
            Selecionar
          </button>
        </div>
      </div>
    </div>
  `;
}

window.selectModel = async function (modelo) {
  try {
    const mod = await import(`./cv-models/${modelo}.js`);
    if (mod.default) {
      mod.default(modelo);
    } else {
      alert("Modelo não encontrado.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar formulário do modelo.");
  }
};
