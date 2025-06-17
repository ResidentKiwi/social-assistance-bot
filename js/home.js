export default function() {
  document.getElementById("main-content").innerHTML = `
    <div class="text-center my-5">
      <h1>Portal de Apoio Social</h1>
      <p class="lead">Aqui você encontra ferramentas gratuitas para construir seu currículo, checar benefícios sociais e se preparar para vestibulares.</p>
      <div class="mt-4">
        <button class="btn btn-primary mx-2" onclick="navigate('cv-generator')"><i class="fas fa-file-alt"></i> Gerar Currículo</button>
        <button class="btn btn-success mx-2" onclick="navigate('benefit-checker')"><i class="fas fa-hand-holding-heart"></i> Benefícios</button>
      </div>
    </div>
  `;
}
