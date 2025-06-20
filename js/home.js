export default function () {
  document.getElementById("main-content").innerHTML = `
    <section class="text-center py-5">
      <h1 class="display-5 fw-bold text-light mb-3">
        <i class="fas fa-hands-helping text-purple me-2"></i> Portal de Apoio Social
      </h1>
      <p class="lead text-muted mb-5">
        Ferramentas gratuitas para sua jornada na educação, trabalho e cidadania.
      </p>
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <button class="main-btn" onclick="navigate('cv-generator')">
          <i class="fas fa-file-alt me-2"></i> Currículo
        </button>
        <button class="main-btn" onclick="navigate('benefit-checker')">
          <i class="fas fa-hand-holding-heart me-2"></i> Benefícios
        </button>
        <button class="main-btn" onclick="navigate('vestibular-guide')">
          <i class="fas fa-graduation-cap me-2"></i> Vestibular
        </button>
        <button class="main-btn" onclick="navigate('profile')">
          <i class="fas fa-user me-2"></i> Perfil
        </button>
      </div>
    </section>
  `;
}
