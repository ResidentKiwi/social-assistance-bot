// cv-common.js
export async function generateCV(e, modelo) {
  e.preventDefault();
  const form = e.target;
  const dados = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cv/generate?modelo=${modelo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error("Erro ao gerar PDF");
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `curriculo-${modelo}.pdf`;
    a.click();
  } catch (err) {
    console.error(err);
    alert("Falha ao gerar currículo.");
  }
}
