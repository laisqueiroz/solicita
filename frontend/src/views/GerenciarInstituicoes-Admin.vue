<template>
  <div class="container">
    <title>Gerenciar Instituições</title>
    <HeaderAdmin />

    <!-- Título e Botão de Adicionar Separados (acima dos cards) -->
    <section class="header-tabela">
      <h2>Gerenciar Instituições</h2>
      <div class="button-container">
        <button class="button" type="button" @click="abrirModal('adicionar')">
          Adicionar Instituição
        </button>
      </div>
    </section>

    <!-- Lista de Instituições -->
    <form class="tabela">
      <div class="instituicao-lista">
        <div v-for="(instituicao, index) in instituicoes" :key="index" class="instituicao-card">
          <div class="card-info">
            <h3>{{ instituicao.nome }}</h3>
            <p><strong>CNPJ:</strong> {{ instituicao.cnpj }}</p>
            <p class="status"
              :class="{ valido: instituicao.status === 'Válido', vencido: instituicao.status === 'Vencido' }">
              <strong>Status:</strong> {{ instituicao.status }}
            </p>
          </div>
          <div class="card-actions">
            <button class="edit-btn" type="button" @click="abrirModal('editar', index)">Editar</button>
            <button class="delete-btn" type="button" @click="removerInstituicao(index)">Excluir</button>
          </div>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h3>{{ modoEdicao ? "Editar Instituição" : "Nova Instituição" }}</h3>

        <!-- Formulário dentro do modal -->
        <form @submit.prevent="modoEdicao ? salvarEdicao() : adicionarInstituicao()">
          <label for="nome">Nome da Instituição:</label>
          <input type="text" id="nome" v-model="instituicaoAtual.nome" required />

          <label for="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" v-model="instituicaoAtual.cnpj" required />

          <label for="status">Status:</label>
          <div class="status-radios">
            <label>
              <input type="radio" v-model="instituicaoAtual.status" value="Válido" />
              Válido
            </label>
            <label>
              <input type="radio" v-model="instituicaoAtual.status" value="Vencido" />
              Vencido
            </label>
          </div>

          <div class="modal-buttons">
            <button class="button" type="submit">{{ modoEdicao ? "Salvar" : "Adicionar" }}</button>
            <button class="button close-btn" type="button" @click="fecharModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderAdmin from '../components/HeaderAdmin.vue';

const isModalOpen = ref(false);
const modoEdicao = ref(false);
const indexEdicao = ref(null);
const instituicoes = ref([]);

// Estrutura para armazenar a instituição atual
const instituicaoAtual = ref({
  nome: '',
  cnpj: '',
  status: 'Válido',
});

// Função para abrir o modal (para adicionar ou editar)
const abrirModal = (modo, index = null) => {
  if (modo === 'editar' && index !== null) {
    modoEdicao.value = true;
    indexEdicao.value = index;
    instituicaoAtual.value = { ...instituicoes.value[index] };
  } else {
    modoEdicao.value = false;
    instituicaoAtual.value = { nome: '', cnpj: '', status: 'Válido' };
  }
  isModalOpen.value = true;
};

// Função para fechar o modal
const fecharModal = () => {
  isModalOpen.value = false;
};

// Adicionar nova instituição
const adicionarInstituicao = () => {
  if (instituicaoAtual.value.nome && instituicaoAtual.value.cnpj) {
    instituicoes.value.push({ ...instituicaoAtual.value });
    fecharModal();
  }
};

// Salvar edição da instituição
const salvarEdicao = () => {
  if (indexEdicao.value !== null) {
    instituicoes.value[indexEdicao.value] = { ...instituicaoAtual.value };
  }
  fecharModal();
};

// Remover instituição
const removerInstituicao = (index) => {
  instituicoes.value.splice(index, 1);
};
</script>

<style scoped>
/* === Layout Principal === */
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  padding-top: 80px;
}

.tabela {
  width: 700px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* === Título e Botão de Adicionar === */
.header-tabela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  
}

.header-tabela h2 {
  font-size: 24px;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

/* === Botão para abrir modal === */
.button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  background-color: #f7981d;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.button:hover {
  background-color: #d17d12;
}

/* === Modal === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

/* === Formulário no Modal === */
.modal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal label {
  font-weight: bold;
  text-align: left;
  display: block;
}

.modal input,
.modal select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.status-radios {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.status-radios label {
  display: flex;
  font-size: 14px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.close-btn {
  background-color: #c20000;
}

.close-btn:hover {
  background-color: #720303;
}

.instituicao-lista {
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* === Card de Instituição === */
.instituicao-card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* === Informações do Card === */
.card-info h3 {
  margin: 0;
  font-size: 18px;
  text-align: left;
}

.card-info p {
  margin: 5px 0;
  font-size: 14px;
  text-align: left;
}

.card-actions {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.valido {
  color: green;
  font-weight: bold;
}

.vencido {
  color: red;
  font-weight: bold;
}

/* === Botões de Ações === */
.edit-btn,
.delete-btn {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  margin-left: 5px;
}

.delete-btn:hover {
  background-color: #a71d2a;
}
</style>
