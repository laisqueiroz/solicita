<template>
  <title>Solicitações de Acesso</title>
  <HeaderAdmin />
  <div class="table">
    <section class="header-table">
      <button class="btn-no-filling-primary" @click="toBackPage">&#8592;</button>
      <h2>Gerenciar Solicitações de Acesso</h2>
      <div></div>
    </section>
      
    <section class="data-list">
      <section class="filters">
        <label for="filter">Filtrar por status:</label>
        <select id="filter" v-model="selectedFilter">
          <option value="ALL">Todos</option>
          <option value="ATIVO">Ativos</option>
          <option value="INATIVO">Inativos</option>
        </select>
      </section>

      <TableComponent 
      :columns="columns"
      :data="filteredUsers"
      :showDefaultActions="true"
      >
      <template #details="{ row }">
        <p><strong>Email:</strong> {{ row.email }}</p>
        <p><strong>CPF:</strong> {{ row.cpf }}</p>
        <p><strong>Nascimento:</strong> {{ row.dateBirth }}</p>
        <p><strong>Papel:</strong> {{ row.role }}</p>
        <p>
          <strong>Arquivo de Termo:</strong>
          <span v-if="row.agreementFile">
            <a :href="`https://portal-solicita.onrender.com/uploads/${row.agreementFile}`" target="_blank">
              {{ row.agreementFile }}
            </a>
          </span>
          <span v-else>Não enviado</span>
        </p>
        <p v-if="row.justification != null"><strong>Justificativa:</strong> {{ row.justification || 'Não enviado' }}</p>
        
        <div class="actions-buttons" v-if="row.active === 'FALSE'">
          <button class="btn-remove" @click="showingJustificationFor = row.id">Negar Solicitação</button>
          <button class="btn-primary" @click="approveAccess(row)">Liberar Acesso</button>
        </div>

        <div class="action" v-if="showingJustificationFor != null">
          <div class="justification-box">
            <label for="">Justificativa:</label>
            <input
              v-model="justificationInputs"
              placeholder="Digite a justificativa"
              class="input-justification"
            />
          </div>

          <div class="actions-buttons">
            <button @click="showingJustificationFor = null">Cancelar</button>
            <button class="btn-remove" @click="rejectAccess(row)">Confirmar Rejeição</button>
          </div>
        </div>
      </template>
      </TableComponent>
    </section>
    
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import TableComponent from "../components/TableComponent.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
import { fetchUsers, updateUser } from "../services/api";

const users = ref([]);
const selectedFilter = ref("ALL");
const justificationInputs = ref('');
const showingJustificationFor = ref(null);

const columns = ref([
  { label: "Nome", field: "name" },
  { label: "Instituição", field: (row) => row.Institution?.name || "Não informado" },
  { label: "Cargo", field: "position" },
  { label: "Status", field: (row) => (row.active === true || row.active === "TRUE" ? "ATIVO" : "INATIVO") }
]);


const approveAccess = async (user) => {
  if(user.active === 'TRUE') return;
  if (!confirm(`Tem certeza que deseja liberar o Usuário: ${user.name}?`)) return;
  try {
    user.active = 'TRUE';
    await updateUser(user.id, user);
    alert(`Usuário liberado com sucesso!`);
    users.value = await fetchUsers();
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao liberar usuário.');
  }
};

const rejectAccess = async (user) => {
  if(user.active === 'TRUE') return;
  if (!confirm(`Tem certeza que deseja rejeitar o acesso do Usuário: ${user.name}?`)) return;
  try {
    user.justification = justificationInputs;
    showingJustificationFor = null;
    user.active = 'FALSE';

    // Ideal é deletar o usuário. Mas no momento iremos apenas manter INATIVO.
    
    alert(`Acesso do usuário recusado com sucesso!`);
    users.value = await fetchUsers();
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao liberar usuário.');
  }
};

onMounted(async () => {
  users.value = await fetchUsers();
});

const filteredUsers = computed(() => {
  if (selectedFilter.value === "ATIVO") {
    return users.value.filter(u =>  u.active === "TRUE");
  } else if (selectedFilter.value === "INATIVO") {
    return users.value.filter(u => u.active === "FALSE");
  }
  return users.value; 
});

</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  width: 800px;
  justify-content: flex-end;
}

.filters > label {
  font-weight: bold;
}

.filters > select {
  width: auto;
  padding: 8px;
  border: 1px solid #003366;
  border-radius: 5px;
}

.actions-buttons {
  display: flex;
}

.action {
  width: 90%;
}

.action input {
  width: auto;
  padding: 8px;
  border: 1px solid #003366;
  border-radius: 5px;
}

.action label {
  font-weight: bold;
}

.justification-box {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}


.header-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
}

.data-list {
  width: 800px;
  padding: 20px;
  border-collapse: collapse;
  margin-top: 10px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

</style>
