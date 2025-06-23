// js/profile.js
import { supabase } from "./supabaseClient.js";
import { navigate } from "./main.js";

export default async function () {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    document.getElementById("main-content").innerHTML = `
      <p class="text-yellow-400 text-center mt-10">Você precisa estar logado para acessar o perfil.</p>
    `;
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name, description, avatar_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    document.getElementById("main-content").innerHTML = `
      <p class="text-red-500 text-center mt-10">Erro ao carregar perfil.</p>
    `;
    return;
  }

  const avatarHtml = profile.avatar_url && profile.avatar_url.startsWith("http")
    ? `<img src="${profile.avatar_url}" alt="Avatar" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-violet-500 shadow-md">`
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
    let avatar_url = profile.avatar_url;

    if (file) {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });

      if (uploadError) {
        console.error(uploadError);
        alert("Erro ao enviar imagem. Verifique o bucket 'avatars' e as permissões.");
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      avatar_url = data?.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ name, description: desc, avatar_url })
      .eq("id", user.id);

    if (updateError) {
      console.error(updateError);
      alert("Erro ao atualizar perfil.");
    } else {
      alert("Perfil atualizado com sucesso!");
      navigate("profile");
    }
  };
}
