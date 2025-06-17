export default function () {
  document.getElementById("main-content").innerHTML = `
    <div class="text-center my-5">
      <h1 class="mb-4"><i class="fas fa-hands-helping text-success"></i> Portal de Apoio Social</h1>
      <p class="lead">Ferramentas gratuitas para impulsionar sua jornada:</p>
      <div class="d-flex flex-wrap justify-content-center mt-4 gap-3">
        <button class="btn btn-outline-light" onclick="navigate('cv-generator')">
          <i class="fas fa-file-alt"></i> Currículo
        </button>
        <button class="btn btn-outline-light" onclick="navigate('benefit-checker')">
          <i class="fas fa-hand-holding-heart"></i> Benefícios
        </button>
        <button class="btn btn-outline-light" onclick="navigate('vestibular-guide')">
          <i class="fas fa-graduation-cap"></i> Vestibular
        </button>
        <button class="btn btn-outline-light" onclick="navigate('profile')">
          <i class="fas fa-user"></i> Perfil
        </button>
      </div>
    </div>
  `;
}
