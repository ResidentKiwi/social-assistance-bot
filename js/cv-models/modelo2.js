// modelo2.js
export default function (modelo) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-purple-200 mb-6 flex items-center gap-2">
        <i class="fas fa-id-card-alt text-purple-500"></i> Modelo Moderno
      </h2>
      <form id="cvForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- (mesmos campos do modelo1) -->
        <div><label class="block text-gray-300">Nome *</label><input type="text" id="nome" required class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <!-- ...demais campos... -->
        <div class="md:col-span-2"><label class="block text-gray-300">Informações adicionais</label><textarea id="extras" rows="2" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"></textarea></div>
        <div class="md:col-span-2 text-center mt-6">
          <button type="submit" class="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold">
            <i class="fas fa-file-pdf mr-2"></i> Gerar PDF
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("cvForm").onsubmit = (e) => generateCV(e, modelo);
}
