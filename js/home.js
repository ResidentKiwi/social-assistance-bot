function getLogoImage() {
  return `
    <img src="./assets/corelance-logo.svg" alt="Logo CoreLance" class="w-20 sm:w-24 md:w-28 h-auto mx-auto mb-2" />
  `;
}

function getServiceButtons() {
  return `
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
      <button class="bg-primary hover:bg-purple-700 text-white py-3 px-4 rounded shadow transition flex items-center justify-center gap-2 text-sm sm:text-base" onclick="navigate('cv-generator')">
        <i class="fas fa-file-alt"></i> Currículo
      </button>
      <button class="bg-primary hover:bg-purple-700 text-white py-3 px-4 rounded shadow transition flex items-center justify-center gap-2 text-sm sm:text-base" onclick="navigate('benefit-checker')">
        <i class="fas fa-hand-holding-heart"></i> Benefícios
      </button>
      <button class="bg-primary hover:bg-purple-700 text-white py-3 px-4 rounded shadow transition flex items-center justify-center gap-2 text-sm sm:text-base" onclick="navigate('vestibular-guide')">
        <i class="fas fa-graduation-cap"></i> Vestibular
      </button>
      <button class="bg-primary hover:bg-purple-700 text-white py-3 px-4 rounded shadow transition flex items-center justify-center gap-2 text-sm sm:text-base" onclick="navigate('profile')">
        <i class="fas fa-user"></i> Perfil
      </button>
    </div>
  `;
}

export default function () {
  document.getElementById("main-content").innerHTML = `
    <section class="flex flex-col items-center text-center py-10 px-4 space-y-6">
      ${getLogoImage()}
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
        Bem-vindo ao portal de apoio da <span class="text-primary">CoreLance</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-400 max-w-2xl">
        Ferramentas intuitivas e gratuitas para apoiar sua carreira, educação e acesso a direitos.
      </p>
      ${getServiceButtons()}
    </section>
  `;
}
