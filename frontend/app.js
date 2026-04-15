const API_URL = "http://localhost:3000/api/diario/diarios";

const form = document.getElementById("diario-form");
const idInput = document.getElementById("diario-id");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const list = document.getElementById("diarios-list");
const status = document.getElementById("status");

function setStatus(msg, isError = false) {
  status.textContent = msg;
  status.classList.toggle("error", isError);
}

async function loadDiarios() {
  setStatus("Carregando...");
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar");
    const diarios = await res.json();
    renderDiarios(diarios);
    setStatus(diarios.length ? `${diarios.length} registro(s)` : "");
  } catch (err) {
    setStatus("Falha ao carregar. Verifique se o backend está rodando.", true);
  }
}

function renderDiarios(diarios) {
  list.innerHTML = "";
  if (!diarios.length) {
    list.innerHTML = '<li class="empty">Nenhum registro ainda.</li>';
    return;
  }
  for (const d of diarios) {
    const li = document.createElement("li");
    li.className = "diario-item";
    li.innerHTML = `
      <h3></h3>
      <p></p>
      <div class="item-actions">
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
      </div>
    `;
    li.querySelector("h3").textContent = d.titulo || "(sem título)";
    li.querySelector("p").textContent = d.descricao || "";
    li.querySelector(".btn-edit").addEventListener("click", () => startEdit(d));
    li.querySelector(".btn-delete").addEventListener("click", () => removeDiario(d._id));
    list.appendChild(li);
  }
}

function startEdit(d) {
  idInput.value = d._id;
  tituloInput.value = d.titulo || "";
  descricaoInput.value = d.descricao || "";
  formTitle.textContent = "Editar registro";
  submitBtn.textContent = "Atualizar";
  cancelBtn.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  form.reset();
  idInput.value = "";
  formTitle.textContent = "Novo registro";
  submitBtn.textContent = "Salvar";
  cancelBtn.hidden = true;
}

async function removeDiario(id) {
  if (!confirm("Excluir este registro?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await loadDiarios();
  } catch {
    setStatus("Erro ao excluir.", true);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    titulo: tituloInput.value.trim(),
    descricao: descricaoInput.value.trim(),
  };
  const id = idInput.value;
  try {
    const res = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error();
    resetForm();
    await loadDiarios();
  } catch {
    setStatus("Erro ao salvar.", true);
  }
});

cancelBtn.addEventListener("click", resetForm);

loadDiarios();
