import { supabase } from "./supabaseClient.js";

export default async function () {
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) {
    document.getElementById("main-content").innerHTML = `<p class="text-yellow-500">Você precisa estar logado para acessar o perfil.</p>`;
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    document.getElementById("main-content").innerHTML = `<p class="text-red-500">Erro ao carregar perfil.</p>`;
    return;
  }

  const avatar = profile.avatar_url 
    ? `<img src="${profile.avatar_url}" alt="Avatar" class="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-700 object-cover">`
    : `<div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-white">?</div>`;

  document.getElementById("main-content").innerHTML = `
    <div class="max-w-xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6">Perfil</h2>
      ${avatar}
      <form id="profileForm" class="space-y-4">
        <input type="text" id="name" placeholder="Nome completo" value="${profile.name || ''}"
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400" />
        <input type="file" id="avatar" accept="image/*"
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 text-gray-300 file:bg-violet-600 file:text-white file:rounded file:px-4 file:py-2" />
        <textarea id="desc" placeholder="Sobre você (opcional)"
          class="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400">${profile.description || ""}</textarea>
        <button type="submit"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded transition-all duration-300">Salvar alterações</button>
      </form>
    </div>
  `;

  document.getElementById("profileForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const file = document.getElementById("avatar").files[0];
    let avatar_url = profile.avatar_url;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (!uploadError) {
        const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
        avatar_url = data.publicUrl;
      } else {
        alert("Erro ao enviar imagem.");
        return;
      }
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ name, description: desc, avatar_url })
      .eq("id", user.id);

    if (updateError) {
      alert("Erro ao atualizar perfil.");
    } else {
      alert("Perfil atualizado!");
      location.reload();
    }
  };
}
