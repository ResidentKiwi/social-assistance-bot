function getLogoSVG() {
  return `
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#a066ff"/>
        <stop offset="50%" stop-color="#8a00ff"/>
        <stop offset="100%" stop-color="#4e00a8"/>
      </linearGradient>
    </defs>
    <path
      d="M65 30C90 25 125 30 145 55C160 75 165 105 145 125C135 135 125 130 115 115C110 135 100 155 80 160C60 165 40 150 35 130C25 100 35 45 65 30Z"
      fill="url(#purpleGradient)"
    />
    <path d="M125 65C122 58 132 50 138 53C144 57 135 66 125 65Z" fill="white" />
    <path d="M80 160C90 140 105 105 120 85C125 80 130 78 135 78C120 100 105 135 100 150C95 160 90 163 80 160Z" fill="white" />
  </svg>
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
      <div class="w-48 h-auto">
        ${getLogoSVG()}
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
