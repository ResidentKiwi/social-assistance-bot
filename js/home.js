export default function () {
  document.getElementById("main-content").innerHTML = `
    <div class="flex flex-col items-center text-center py-12 px-6 space-y-8">
      <!-- Logo rotacionando levemente -->
      <div class="w-48 h-auto animate-fade-in">
        ${getLogoSVG()}
      </div>
      <h1 class="text-4xl font-bold text-gray-100">
        Bem-vindo ao <span class="text-primary">CoreLance</span>
      </h1>
      <p class="text-gray-300 max-w-md">
        Ferramentas intuitivas e gratuitas para apoiar sua carreira, educação e acesso a direitos.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${getServiceButtons()}
      </div>
    </div>
  `;
}

// Código separado do logo (para manter organizado)
function getLogoSVG() {
  return `
    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6A1B9A"/>
          <stop offset="100%" stop-color="#AB47BC"/>
        </linearGradient>
      </defs>
      <path d="M10,50 L30,10 L50,50 Z" fill="url(#gradPurple)" />
      <text x="60" y="40" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="bold" fill="url(#gradPurple)">
        CoreLance
      </text>
    </svg>`;
}

// Botões estilizados
function getServiceButtons() {
  const services = [
    { icon: 'fa-file-alt', label: 'Currículo', page: 'cv-generator' },
    { icon: 'fa-hand-holding-heart', label: 'Benefícios', page: 'benefit-checker' },
    { icon: 'fa-graduation-cap', label: 'Vestibular', page: 'vestibular-guide' },
    { icon: 'fa-user', label: 'Perfil', page: 'profile' }
  ];
  return services.map(s =>
    `<button
      class="bg-primary hover:bg-purple-700 text-white py-3 px-5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition"
      onclick="navigate('${s.page}')">
      <i class="fas ${s.icon}"></i> ${s.label}
    </button>`
  ).join('');
}
