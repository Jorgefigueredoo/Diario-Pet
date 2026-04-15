const API_URL = "https://diario-pet.onrender.com/api/diario/diarios";

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

// ===== Produtos =====
const PRODUTO_API_URL = "https://diario-pet.onrender.com/api/produto/produtos";

const produtoForm = document.getElementById("produto-form");
const produtoIdInput = document.getElementById("produto-id");
const produtoNomeInput = document.getElementById("produto-nome");
const produtoPrecoInput = document.getElementById("produto-preco");
const produtoDescricaoInput = document.getElementById("produto-descricao");
const produtoFormTitle = document.getElementById("produto-form-title");
const produtoSubmitBtn = document.getElementById("produto-submit-btn");
const produtoCancelBtn = document.getElementById("produto-cancel-btn");
const produtosList = document.getElementById("produtos-list");
const produtoStatus = document.getElementById("produto-status");

function setProdutoStatus(msg, isError = false) {
  produtoStatus.textContent = msg;
  produtoStatus.classList.toggle("error", isError);
}

async function loadProdutos() {
  setProdutoStatus("Carregando...");
  try {
    const res = await fetch(PRODUTO_API_URL);
    if (!res.ok) throw new Error();
    const produtos = await res.json();
    renderProdutos(produtos);
    setProdutoStatus(produtos.length ? `${produtos.length} produto(s)` : "");
  } catch {
    setProdutoStatus("Falha ao carregar produtos.", true);
  }
}

function renderProdutos(produtos) {
  produtosList.innerHTML = "";
  if (!produtos.length) {
    produtosList.innerHTML = '<li class="empty">Nenhum produto cadastrado.</li>';
    return;
  }
  for (const p of produtos) {
    const li = document.createElement("li");
    li.className = "diario-item";
    li.innerHTML = `
      <h3></h3>
      <p class="preco"></p>
      <p class="desc"></p>
      <div class="item-actions">
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
      </div>
    `;
    li.querySelector("h3").textContent = p.nome || "(sem nome)";
    li.querySelector(".preco").textContent =
      typeof p.preco === "number" ? `R$ ${p.preco.toFixed(2)}` : "";
    li.querySelector(".desc").textContent = p.descricao || "";
    li.querySelector(".btn-edit").addEventListener("click", () => startEditProduto(p));
    li.querySelector(".btn-delete").addEventListener("click", () => removeProduto(p._id));
    produtosList.appendChild(li);
  }
}

function startEditProduto(p) {
  produtoIdInput.value = p._id;
  produtoNomeInput.value = p.nome || "";
  produtoPrecoInput.value = p.preco ?? "";
  produtoDescricaoInput.value = p.descricao || "";
  produtoFormTitle.textContent = "Editar produto";
  produtoSubmitBtn.textContent = "Atualizar";
  produtoCancelBtn.hidden = false;
  produtoForm.scrollIntoView({ behavior: "smooth" });
}

function resetProdutoForm() {
  produtoForm.reset();
  produtoIdInput.value = "";
  produtoFormTitle.textContent = "Novo produto";
  produtoSubmitBtn.textContent = "Salvar";
  produtoCancelBtn.hidden = true;
}

async function removeProduto(id) {
  if (!confirm("Excluir este produto?")) return;
  try {
    const res = await fetch(`${PRODUTO_API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await loadProdutos();
  } catch {
    setProdutoStatus("Erro ao excluir.", true);
  }
}

produtoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    nome: produtoNomeInput.value.trim(),
    preco: parseFloat(produtoPrecoInput.value),
    descricao: produtoDescricaoInput.value.trim(),
  };
  const id = produtoIdInput.value;
  try {
    const res = await fetch(id ? `${PRODUTO_API_URL}/${id}` : PRODUTO_API_URL, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error();
    resetProdutoForm();
    await loadProdutos();
  } catch {
    setProdutoStatus("Erro ao salvar.", true);
  }
});

produtoCancelBtn.addEventListener("click", resetProdutoForm);

loadProdutos();
