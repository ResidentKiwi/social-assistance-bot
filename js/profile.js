import { supabase } from "./supabaseClient.js";

export default async function () {
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) {
    document.getElementById("main-content").innerHTML = `<p class="text-warning">Você precisa estar logado para acessar o perfil.</p>`;
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    document.getElementById("main-content").innerHTML = `<p class="text-danger">Erro ao carregar perfil.</p>`;
    return;
  }

  document.getElementById("main-content").innerHTML = `
    <h2><i class="fas fa-user"></i> Perfil</h2>
    <form id="profileForm">
      <div class="mb-3">
        <label>Nome completo</label>
        <input type="text" class="form-control" id="name" value="${profile.name || ''}" />
      </div>
      <div class="mb-3">
        <label>Nome de usuário</label>
        <input type="text" class="form-control" value="${profile.username}" disabled />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" value="${user.email}" disabled />
      </div>
      <div class="mb-3">
        <label>Descrição (opcional)</label>
        <textarea class="form-control" id="desc" placeholder="Sobre você...">${profile.description || ""}</textarea>
      </div>
      <button type="submit" class="btn btn-primary">Salvar alterações</button>
    </form>
  `;

  document.getElementById("profileForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;

    const { error } = await supabase
      .from("profiles")
      .update({ name, description: desc })
      .eq("id", user.id);

    if (error) {
      alert("Erro ao atualizar perfil.");
    } else {
      alert("Perfil atualizado com sucesso!");
    }
  };
}
