export default function () {
  document.getElementById('main-content').innerHTML = `
    <h2><i class="fas fa-hand-holding-heart"></i> Verificador de Benefícios</h2>
    <form id="benefitForm">
      <div class="mb-3"><label>Nome</label><input type="text" class="form-control" required></div>
      <div class="mb-3"><label>Idade</label><input type="number" class="form-control" required></div>
      <div class="mb-3"><label>Renda mensal</label><input type="number" class="form-control" required></div>
      <button type="submit" class="btn btn-success">Verificar</button>
    </form>
    <div id="result" class="mt-3"></div>
  `;

  document.getElementById('benefitForm').onsubmit = async function (e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [name, age, income] = [...inputs].map(i => i.value);

    const res = await fetch('https://social-assistance-backend.onrender.com/benefits/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: parseInt(age), income: parseFloat(income) })
    });

    const data = await res.json();
    document.getElementById('result').innerHTML = `
      <h5>Resultados:</h5>
      <ul>${data.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  };
}
