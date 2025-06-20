export default function () {
  document.getElementById("main-content").innerHTML = `
    <section class="hero text-center py-5">
      <h1><i class="fas fa-hands-helping text-highlight"></i> Portal de Apoio Social</h1>
      <p class="subtext">Ferramentas gratuitas para te orientar na educação, no trabalho e no acesso a direitos.</p>
      <div class="btn-group btn-group-lg mt-4">
        <button class="btn btn-ghost" onclick="navigate('cv-generator')"><i class="fas fa-file-alt me-2"></i> Currículo</button>
        <button class="btn btn-ghost" onclick="navigate('benefit-checker')"><i class="fas fa-hand-holding-heart me-2"></i> Benefícios</button>
        <button class="btn btn-ghost" onclick="navigate('vestibular-guide')"><i class="fas fa-graduation-cap me-2"></i> Vestibular</button>
        <button class="btn btn-ghost" onclick="navigate('profile')"><i class="fas fa-user me-2"></i> Perfil</button>
      </div>
    </section>`;
}
