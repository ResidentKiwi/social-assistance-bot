export default function () {
  document.getElementById("main-content").innerHTML = `
    <section class="text-center my-5">
      <h1 class="mb-3">
        <i class="fas fa-hands-helping text-purple"></i> Portal de Apoio Social
      </h1>
      <p class="lead text-muted">Ferramentas gratuitas para te orientar na educação, no trabalho e no acesso a direitos.</p>
      <div class="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <button class="main-btn-outline px-4 py-2" onclick="navigate('cv-generator')">
          <i class="fas fa-file-alt me-2"></i> Currículo
        </button>
        <button class="main-btn-outline px-4 py-2" onclick="navigate('benefit-checker')">
          <i class="fas fa-hand-holding-heart me-2"></i> Benefícios
        </button>
        <button class="main-btn-outline px-4 py-2" onclick="navigate('vestibular-guide')">
          <i class="fas fa-graduation-cap me-2"></i> Vestibular
        </button>
        <button class="main-btn-outline px-4 py-2" onclick="navigate('profile')">
          <i class="fas fa-user me-2"></i> Perfil
        </button>
      </div>
    </section>
  `;
}
