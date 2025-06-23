import { navigate } from "./main.js";

export default async function () {
  const token = localStorage.getItem("access_token");
  if (!token) {
    document.getElementById("main-content").innerHTML = `
      <p class="text-yellow-400 text-center mt-10">Você precisa estar logado para acessar o perfil.</p>
    `;
    return;
  }

  const res = await fetch("https://social-assistance-backend.onrender.com/profile/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    document.getElementById("main-content").innerHTML = `<p class="text-red-500 text-center mt-10">Erro ao carregar perfil.</p>`;
    return;
  }

  const profile = await res.json();
  const avatarHtml = profile.has_avatar
    ? `<img src="https://social-assistance-backend.onrender.com/profile/avatar" alt="Avatar" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-violet-500 shadow-md">`
    : `<div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-200">?</div>`;

  document.getElementById("main-content").innerHTML = `
    <div class="max-w-lg mx-auto bg-gray-900 text-white p-6 mt-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Perfil</h2>
      ${avatarHtml}
      <form id="profileForm" class="space-y-4">
        <input
          type="text"
          id="name"
          placeholder="Nome completo"
          value="${profile.name || ''}"
          required
          class="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-violet-500 focus:outline-none"
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          class="w-full file:bg-violet-600 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-lg file:border-none"
        />
        <textarea
          id="desc"
          placeholder="Sobre você (opcional)"
          rows="4"
          class="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-violet-500 focus:outline-none"
        >${profile.description || ""}</textarea>
        <button
          type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 transition py-3 rounded-lg font-medium"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  `;

  document.getElementById("profileForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const file = document.getElementById("avatar").files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    if (file) formData.append("avatar", file);

    const res = await fetch("https://social-assistance-backend.onrender.com/profile/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) {
      alert("Erro ao atualizar perfil.");
    } else {
      alert("Perfil atualizado com sucesso!");
      navigate("profile");
    }
  };
}
