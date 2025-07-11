<template>
  <title>Solicitações de Práticas</title>
  <HeaderAdmin/>
  <div class="table">
    <section class="header-table">
      <button class="btn-no-filling-primary" @click="toBackPage">&#8592;</button>
      <h2>Gerenciar Solicitações de Práticas de Ensino</h2>
      <div></div>
    </section>
    <section class="data-list">
      <section class="filters">
        <label for="filter">Filtrar por status:</label>
        <select id="filter" v-model="selectedFilter">
          <option value="ALL">Todos</option>
          <option value="EM ANDAMENTO">Em Andamento</option>
          <option value="DEFERIDO">Deferidos</option>
          <option value="INDEFERIDO">Indeferidos</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </section>

      <TableComponent 
      :columns="columns"
      :data="filteredSolicitations"
      :showDefaultActions="true"
      >
      <template #details="{ row }">
        <p class="sub-title"><strong>DADOS DA SOLICITAÇÃO</strong></p>
        <p><strong>Código da Solicitação: </strong> {{ row.code }}</p>
        <div class="group">
          <p><strong>Curso:</strong> {{ row.course }}</p>
          <p><strong>Disciplina:</strong> {{ row.subject }}</p>
          <p><strong>Período:</strong> {{ row.period }}</p>
        </div>
        <p class="sub-title"><strong>DADOS DO PRECEPTOR(A)</strong></p>
        <div class="group">
          <p><strong>Preceptora:</strong> {{ row.preceptorName }}</p>
          <p><strong>Registro no Conselho:</strong> {{ row.councilRegistration }}</p>
          <p><strong>Área de Atuação:</strong> {{ row.rolePreceptor || 'N/A' }}</p>
        </div>
        <p class="sub-title"><strong>DADOS DA UNIDADE DE SAÚDE</strong></p>
        <div class="group">
          <p><strong>Nome:</strong> {{ row.Equipment?.name }}</p>
          <p><strong>Setor:</strong> {{ row.Department?.nameDepartment || 'N/A' }}</p>
          <p><strong>Turno:</strong> {{ row.Rotation?.shift || 'N/A' }}</p>
        </div>
        <p class="sub-title"><strong>STATUS DA SOLICITAÇÃO</strong></p>
        <p :class="getStatusClass(row.status)">{{ row.status }}</p>
        <p v-if="row.justification != null"><strong>Justificativa:</strong> {{ row.justification }}</p>
        
        <div class="actions-buttons" v-if="row.status === 'EM ANDAMENTO'">
          <button class="btn-remove" @click="showingJustificationFor = row.id">Negar Solicitação</button>
          <button class="btn-primary" @click="aprovedSolicitation(row)">Liberar Solicitação</button>
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
            <button class="btn-remove" @click="denySolicitation(row)">Confirmar Indeferimento</button>
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
import { getAllSolicitations, updateSolicitationId } from "../services/api";

const columns = ref([
  { label: "Código", field: "code" },
  { label: "Tipo de Solicitação", field: "modality" },
  { label: "Unidade", field: (row) => row.Equipment?.name || "N/A"},
  { label: "Instituição", field: (row) => row.Institution?.name || "N/A" },
  { label: "Status", field: "status" },
]);

const solicitations = ref([]);
const selectedFilter = ref("ALL");
const justificationInputs = ref();
const showingJustificationFor = ref(null);

onMounted(async () => {
  solicitations.value = await getAllSolicitations();
});

const filteredSolicitations = computed(() => {
  if (selectedFilter.value === "EM ANDAMENTO") {
    return solicitations.value.filter(u =>  u.status === "EM ANDAMENTO");
  } if (selectedFilter.value === "DEFERIDO") {
    return solicitations.value.filter(u => u.status === "DEFERIDO");
  } if (selectedFilter.value === "INDEFERIDO") {
    return solicitations.value.filter(u => u.status === "INDEFERIDO");
  } else if (selectedFilter.value === "CANCELADO") {
    return solicitations.value.filter(u => u.status === "CANCELADO");
  }
  return solicitations.value; 
});

const aprovedSolicitation = async (solicitation) => {
  if (!confirm(`Tem certeza que deseja aprovar a solicitação: ${solicitation.code}?`)) return;
  try {
    await updateSolicitationId(solicitation.id, { status: "DEFERIDO"});
    alert(`Solicitação deferida com sucesso!`);
    solicitations.value = await getAllSolicitations();
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao liberar solicitação.');
  }
};

const denySolicitation = async (solicitation) => {
  if (!justificationInputs.value) {
    alert('É obrigatório o preenchimento do campo de justificativa.');
    return;
  }
  if (!confirm(`Tem certeza que deseja rejeitar a solicitação: ${solicitation.code}?`)) return;
  try {
    solicitation.status = 'INDEFERIDO';
    solicitation.justification = justificationInputs;
    await updateSolicitationId(solicitation.id, solicitation);
    alert(`Solicitação indeferida com sucesso!`);
    solicitations.value = await getAllSolicitations();
    showingJustificationFor.value = null;
    justificationInputs.value = '';
  } catch (error) {
    console.log(error)
    alert(error?.response?.data?.error || 'Erro inesperado ao indeferir solicitação.');
  }
};

const getStatusClass = (status) => {
  return {
    "status-approved": status === "DEFERIDO",
    "status-pending": status === "EM ANDAMENTO",
    "status-rejected": status === "INDEFERIDO",
    "status-canceled": status === "CANCELADO"
  };
};

</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.sub-title {
  color: #003366
}

.group {
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  border-bottom: 1px solid #ccc;
}

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  width: 1000px;
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
  width: 1000px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
}

.data-list {
  width: 1000px;
  padding: 20px;
  border-collapse: collapse;
  margin-top: 10px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.status-approved {
  color: #00C217;
  font-weight: bold;
}

.status-pending {
  color: #F39A24;
  font-weight: bold;
}

.status-rejected {
  color: #C20000;
  font-weight: bold;
}

.status-canceled {
  color: #b3b3b3;
  font-weight: bold;
}
</style>
