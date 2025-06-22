// modelo1.js
export default function (modelo) {
  document.getElementById("main-content").innerHTML = `
    <div class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-purple-200 mb-6 flex items-center gap-2">
        <i class="fas fa-file-alt text-purple-500"></i> Modelo Clássico
      </h2>
      <form id="cvForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label class="block text-gray-300">Nome completo *</label><input type="text" id="nome" required class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">E‑mail *</label><input type="email" id="email" required class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">Telefone *</label><input type="tel" id="telefone" required placeholder="(DDD) 9xxxx‑xxxx" class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">Cidade / UF</label><input type="text" id="cidade" class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">Nascimento</label><input type="date" id="nascimento" class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">Estado civil</label><select id="estado_civil" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"><option value="">--</option><option>Solteiro(a)</option><option>Casado(a)</option><option>Outro</option></select></div>
        <div><label class="block text-gray-300">LinkedIn</label><input type="url" id="linkedin" placeholder="https://..." class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">Escolaridade *</label><select id="formacao" required class="mt-1 w-full p-3 bg-gray-700 rounded text-white"><option value="" disabled selected>Selecione</option><option>Ensino Médio Completo</option><option>Ensino Superior Completo</option></select></div>
        <div><label class="block text-gray-300">Pretensão salarial</label><input type="text" id="salario" placeholder="Ex: R$ 2.500,00" class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div><label class="block text-gray-300">Possui CNH?</label><select id="cnh" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"><option value="">Selecione</option><option>A</option><option>B</option><option>AB</option></select></div>
        <div><label class="block text-gray-300">Disponibilidade</label><input type="text" id="disponibilidade" placeholder="Viagens, horários..." class="mt-1 w-full p-3 bg-gray-700 rounded text-white" /></div>
        <div class="md:col-span-2"><label class="block text-gray-300">Objetivo profissional *</label><textarea id="objetivo" required rows="2" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"></textarea></div>
        <div class="md:col-span-2"><label class="block text-gray-300">Experiência Profissional</label><textarea id="experiencia" rows="3" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"></textarea></div>
        <div class="md:col-span-2"><label class="block text-gray-300">Cursos e Qualificações</label><textarea id="cursos" rows="2" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"></textarea></div>
        <div class="md:col-span-2"><label class="block text-gray-300">Informações adicionais</label><textarea id="extras" rows="2" class="mt-1 w-full p-3 bg-gray-700 rounded text-white"></textarea></div>
        <div class="md:col-span-2 text-center mt-6">
          <button type="submit" class="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold">Gerar PDF</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("cvForm").onsubmit = (e) => generateCV(e, modelo);
}
