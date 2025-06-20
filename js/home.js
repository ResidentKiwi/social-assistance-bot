export default function () {
  document.getElementById("main-content").innerHTML = `
    <section class="text-center py-12 px-4">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 flex justify-center items-center gap-2">
        <i class="fas fa-hands-helping text-purple-500"></i> Portal de Apoio Social
      </h1>
      <p class="text-lg text-gray-400 max-w-xl mx-auto">
        Ferramentas gratuitas para te orientar na educação, no trabalho e no acesso a direitos.
      </p>

      <div class="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-center">
        <button class="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('cv-generator')">
          <i class="fas fa-file-alt"></i> Currículo
        </button>
        <button class="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('benefit-checker')">
          <i class="fas fa-hand-holding-heart"></i> Benefícios
        </button>
        <button class="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('vestibular-guide')">
          <i class="fas fa-graduation-cap"></i> Vestibular
        </button>
        <button class="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('profile')">
          <i class="fas fa-user"></i> Perfil
        </button>
      </div>
    </section>
  `;
}
