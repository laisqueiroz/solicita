<template>
  <div class="container">
    <title>Gerenciar Instituições</title>
    <HeaderAdmin />

    <section class="header-table">
      <button class="btn-no-filling-primary" @click="toBackPage">&#8592;</button>
      <h2>Gerenciar Instituições</h2>
      <div class="button-container">
        <button class="btn-secondary" type="button" @click="openModal('adicionar')">
          &plus; Instituição
        </button>
      </div>
    </section>

    <form class="table">
      <div class="list-institution">
        <div v-for="(institution, index) in institutions" :key="index" class="card-institution">
          <div class="card-info">
            <h3>{{ institution.name }}</h3>
            <p><strong>CNPJ:</strong> {{ institution.cnpj }}</p>
          </div>
          <div class="card-actions">
            <button class="btn-primary" type="button" @click="openModal('editar', index)"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-no-filling-remove" type="button" @click="excludeInstitution(index)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </form>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>{{ editionMode ? "Editar Instituição" : "Nova Instituição" }}</h3>

        <form @submit.prevent="editionMode ? saveEdition() : addInstitution()">
          <label for="nome">Nome da Instituição:</label>
          <input type="text" id="nome" v-model="CurrentInstitution.name" required />

          <label for="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" v-model="CurrentInstitution.cnpj" v-maska="'##.###.###/####-##'" required />

          <div class="modal-buttons">
            <button class="btn-primary">{{ editionMode ? "Salvar" : "Adicionar" }}</button>
            <button class="btn-no-filling-remove" type="button" @click="closeModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { fetchInstitutions, createInstitution, deleteInstitution } from "../services/api";
import { useRouter } from 'vue-router';
import { vMaska } from "maska/vue"

const router = useRouter();
const isModalOpen = ref(false);
const editionMode = ref(false);
const indexEdicao = ref(null);
const institutions = ref([]);

const CurrentInstitution = ref({
  name: '',
  cnpj: '',
});

onMounted(async () => {
  institutions.value = await fetchInstitutions();
});

const openModal = (modo, index = null) => {
  if (modo === 'editar' && index !== null) {
    editionMode.value = true;
    indexEdicao.value = index;
    CurrentInstitution.value = { ...institutions.value[index] };
  } else {
    editionMode.value = false;
    CurrentInstitution.value = { name: '', cnpj: '' };
  }
  isModalOpen.value = true;
};


const closeModal = () => {
  isModalOpen.value = false;
};


const addInstitution = async () => {
  if (!CurrentInstitution.value.name || !CurrentInstitution.value.cnpj) return;
  try {
    await createInstitution(CurrentInstitution.value);
    isModalOpen.value = false;

    institutions.value = await fetchInstitutions();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar equipamento.');
    }
  }
};

const saveEdition = () => {
  if (indexEdicao.value !== null) {
    institutions.value[indexEdicao.value] = { ...CurrentInstitution.value };
  }
  closeModal();
};

const excludeInstitution = (index) => {
  institutions.value.splice(index, 1);
};

const toBackPage = () => {
  router.push('/admin-management');
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

.table {
  width: 700px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header-table {
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

.header-table h2 {
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

.list-institution {
  width: auto;
  max-width: 700px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-institution {
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