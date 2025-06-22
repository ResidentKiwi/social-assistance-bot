function getLogoImage() {
  return `
    <img src="./assets/corelance-logo.jpg" alt="Logo CoreLance" class="w-48 h-auto mx-auto" />
  `;
}

function getServiceButtons() {
  return `
    <button class="bg-primary hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('cv-generator')">
      <i class="fas fa-file-alt"></i> Currículo
    </button>
    <button class="bg-primary hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('benefit-checker')">
      <i class="fas fa-hand-holding-heart"></i> Benefícios
    </button>
    <button class="bg-primary hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('vestibular-guide')">
      <i class="fas fa-graduation-cap"></i> Vestibular
    </button>
    <button class="bg-primary hover:bg-purple-700 text-white py-3 px-5 rounded shadow-md transition flex items-center justify-center gap-2" onclick="navigate('profile')">
      <i class="fas fa-user"></i> Perfil
    </button>
  `;
}

export default function () {
  document.getElementById("main-content").innerHTML = `
    <section class="flex flex-col items-center text-center py-12 px-6 space-y-8">
      <div>
        ${getLogoImage()}
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-white">
        Bem-vindo ao portal de apoio da <span class="text-primary">CoreLance</span>
      </h1>
      <p class="text-lg text-gray-400 max-w-xl">
        Ferramentas intuitivas e gratuitas para apoiar sua carreira, educação e acesso a direitos.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${getServiceButtons()}
      </div>
    </section>
  `;
}
