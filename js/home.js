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

function getLogoSVG() {
  return `
    <svg width="100%" height="100%" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6A1B9A"/>
          <stop offset="100%" stop-color="#AB47BC"/>
        </linearGradient>
      </defs>
      <path d="M10 50 L30 15 C35 10,45 10,50 15 L70 50 Z" fill="url(#gradPurple)" />
      <text x="80" y="38" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="bold" fill="url(#gradPurple)">
        CoreLance
      </text>
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
