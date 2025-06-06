<template>
  <div class="container">
    <title>Gerenciar Instituições</title>
    <HeaderAdmin />

    <section class="header-tabela">
      <button class="btn-no-filling-primary" @click="backPage">&#8592;</button>
      <h2>Gerenciar Instituições</h2>
      <div class="button-container">
        <button class="btn-secondary" type="button" @click="abrirModal('adicionar')">
          &plus; Instituição
        </button>
      </div>
    </section>

    <form class="tabela">
      <div class="instituicao-lista">
        <div v-for="(institution, index) in institutions" :key="index" class="instituicao-card">
          <div class="card-info">
            <h3>{{ institution.name }}</h3>
            <p><strong>CNPJ:</strong> {{ institution.cnpj }}</p>
          </div>
          <div class="card-actions">
            <button class="btn-primary" type="button" @click="abrirModal('editar', index)"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-no-filling-remove" type="button" @click="removerInstituicao(index)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </form>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h3>{{ modoEdicao ? "Editar Instituição" : "Nova Instituição" }}</h3>

        <form @submit.prevent="modoEdicao ? salvarEdicao() : adicionarInstituicao()">
          <label for="nome">Nome da Instituição:</label>
          <input type="text" id="nome" v-model="CurrentInstitution.name" required />

          <label for="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" v-model="CurrentInstitution.cnpj" required />

          <div class="modal-buttons">
            <button class="btn-primary" type="submit">{{ modoEdicao ? "Salvar" : "Adicionar" }}</button>
            <button class="btn-no-filling-remove" type="button" @click="fecharModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { fetchInstitutions } from "../services/api";
import { useRouter } from 'vue-router';

const router = useRouter();
const isModalOpen = ref(false);
const modoEdicao = ref(false);
const indexEdicao = ref(null);
const institutions = ref([]);

const CurrentInstitution = ref({
  name: '',
  cnpj: '',
});

onMounted(async () => {
  const data = await fetchInstitutions();
  institutions.value = data;
});

const abrirModal = (modo, index = null) => {
  if (modo === 'editar' && index !== null) {
    modoEdicao.value = true;
    indexEdicao.value = index;
    CurrentInstitution.value = { ...institutions.value[index] };
  } else {
    modoEdicao.value = false;
    CurrentInstitution.value = { name: '', cnpj: '', status: 'Válido' };
  }
  isModalOpen.value = true;
};


const fecharModal = () => {
  isModalOpen.value = false;
};


const adicionarInstituicao = () => {
  if (instituicaoAtual.value.nome && instituicaoAtual.value.cnpj) {
    instituicoes.value.push({ ...instituicaoAtual.value });
    fecharModal();
  }
};

const salvarEdicao = () => {
  if (indexEdicao.value !== null) {
    instituicoes.value[indexEdicao.value] = { ...instituicaoAtual.value };
  }
  fecharModal();
};

const removerInstituicao = (index) => {
  instituicoes.value.splice(index, 1);
};

const backPage = () => {
  router.push('/gestao-admin');
};
</script>

<style scoped>

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
  width: 350px;
  text-align: center;
}

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
  width: auto;
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

.instituicao-lista {
  width: auto;
  max-width: 700px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.instituicao-card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

</style>