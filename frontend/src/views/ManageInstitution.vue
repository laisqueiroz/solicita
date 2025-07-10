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
            <p>
              <span :class="institution.status === 'ATIVO' ? 'status-ativo' : 'status-suspenso'">
                {{ institution.status }}
              </span>
            </p>
          </div>
          <div class="card-actions">
            <button class="btn-primary" type="button" @click="openModal('editar', index)"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-no-filling-remove" type="button" @click="excludeInstitution(institution.id, institution.name)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </form>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
      <div class="modal">
        <h3>{{ editionMode ? "Editar Instituição" : "Nova Instituição" }}</h3>

        <form @submit.prevent="editionMode ? saveEdition() : addInstitution()">

          <label for="nome">Nome:</label>
          <input type="text" v-model="CurrentInstitution.name" required />

          <label for="cnpj">CNPJ:</label>
          <input type="text" v-model="CurrentInstitution.cnpj" v-maska="'##.###.###/####-##'" required />
          
          <label>Endereço:</label>
          <input type="text" v-model="CurrentInstitution.address" />

          <div class="form-row">
            <div class="form-group">
              <label>Email:</label>
              <input type="email" v-model="CurrentInstitution.email" required />
            </div>
            <div class="form-group">
              <label>Telefone:</label>
              <input type="text" v-model="CurrentInstitution.phone" v-maska="'(##) #####-####'" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Data de Registro:</label>
              <input type="date" v-model="CurrentInstitution.dateRegister" required />
            </div>
            <div class="form-group">
              <label>Validade (anos):</label>
              <input type="number" min="1" v-model="CurrentInstitution.validityPeriod" required />
            </div>
          </div>

          <div class="modal-buttons">
            <button class="btn-no-filling-remove" type="button" @click="isModalOpen = false">Fechar</button>
            <button class="btn-primary">{{ editionMode ? "Salvar" : "Adicionar" }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { fetchInstitutions, createInstitution, deleteInstitution, updateInstitution } from "../services/api";
import { useRouter } from 'vue-router';
import { vMaska } from "maska/vue"

const router = useRouter();
const isModalOpen = ref(false);
const editionMode = ref(false);
const indexEdition = ref(null);
const institutions = ref([]);

const CurrentInstitution = ref({
  name: '',
  cnpj: '',
  email: '',
  address: '',
  phone: '',
  dateRegister: '',
  validityPeriod: 1
});

onMounted(async () => {
  institutions.value = await fetchInstitutions();
});

const openModal = (modo, index = null) => {
  if (modo === 'editar' && index !== null) {
    editionMode.value = true;
    indexEdition.value = index;
    CurrentInstitution.value = { ...institutions.value[index] };
  } else {
    editionMode.value = false;
    CurrentInstitution.value = { 
      name: '',
      cnpj: '',
      email: '',
      address: '',
      phone: '',
      dateRegister: '',
      validityPeriod: 1 
    };
  }
  isModalOpen.value = true;
};

const addInstitution = async () => {
  if (!CurrentInstitution.value.name || 
      !CurrentInstitution.value.cnpj || 
      !CurrentInstitution.value.email || 
      !CurrentInstitution.value.dateRegister ||
      !CurrentInstitution.value.validityPeriod ) return;
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

const saveEdition = async () => {
  if (indexEdition === null) return;
  const isConfirm = confirm(`Tem certeza que deseja editar a instituição: "${CurrentInstitution.value.name}"?`);
  if (!isConfirm) return;
  try {
    await updateInstitution(CurrentInstitution.value.id, CurrentInstitution.value);
    isModalOpen.value = false;
    institutions.value = await fetchInstitutions();
  } catch (error) {
    alert(error.response?.data?.error || 'Erro ao atualizar instituição.');
  }
};

const excludeInstitution = async (id, name) => {
  const isConfirm = confirm(`Tem certeza que deseja excluir a instituição: "${name}"?`);
  if (!isConfirm) return;
  try {
    await deleteInstitution(id);

    institutions.value = await fetchInstitutions();
    alert(`Instituição de Ensino: "${name}" excluída com sucesso!`); 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar equipamento.');
    }
  }
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
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  width: 600px;
  max-width: 90%;
  text-align: center;
}

.modal form {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  text-align: left;
}

.modal label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
}

.modal input,
.modal select {
  width: auto;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
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
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.list-institution {
  width: auto;
  max-width: 700px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
    display: flex;
    gap: 20px;
    text-align: left;
}

.form-group {
    flex: 1;
    margin-bottom: 15px;
    margin-right: 20px;
    text-align: left;
}
.form-group > input {
  width: 100%;
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

.status-ativo {
  color: #00C217;
  font-weight: bold;
  font-size: small;
}

.status-suspenso {
  color: #C20000;
  font-weight: bold;
  font-size: small;
}
</style>