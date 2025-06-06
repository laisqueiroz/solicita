<template>
    <div class="table-container">
    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.field">{{ col.label }}</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <template v-for="(row, index) in data" :key="index">
          <tr>
            <td 
              v-for="col in columns" 
              :key="col.field" 
              :class="col.field === 'status' ? getStatusClass(row[col.field]) : ''"
            >
              {{ typeof col.field === 'function' ? col.field(row) : row[col.field] }}
            </td>
            <td class="action-cell" @click="toggleExpand(index)">
              Ver mais <span class="arrow">▼</span>
            </td>
          </tr>
          
          <tr v-if="row.expandida">
            <td :colspan="columns.length + 1">
              <div class="details">
                <p><strong>Código:</strong> {{ row.code }}</p>
                <p><strong>Curso:</strong> {{ row.course }}</p>
                <p><strong>Disciplina:</strong> {{ row.subject }}</p>
                <p><strong>Semestre:</strong> {{ row.period }}</p>
                <p><strong>Tipo de Solicitação:</strong> {{ row.modality }}</p>
                <p><strong>Turno da Solicitação:</strong> {{ row.shift }}</p>
                <p><strong>Unidade/Equipamento:</strong> {{ row.Equipment.name }}</p>
                <p><strong>Instituição Solicitante:</strong> {{ row.Institution.name }}</p>
                <p><strong>Nome do Preceptor:</strong> {{ row.preceptorName }}</p>
                <p><strong>N° Registro no Conselho:</strong> {{ row.councilRegistration }}</p>
                <p><strong>Status:</strong> {{ row.status }}</p>
                <div class="actions">
                  <button @click="emit('aprovar', row)">Aprovar Solicitação</button>
                  <button @click="emit('negar', row)">Negar Solicitação</button>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  columns: Array, 
  data: Array, 
});

const emit = defineEmits(["verMais", "aprovar", "negar"]);

const toggleExpand = (index) => {
  emit('verMais', index); 
};

const getStatusClass = (status) => {
  return {
    "status-approved": status === "Deferido",
    "status-pending": status === "Em análise",
    "status-rejected": status === "Indeferido"
  };
};
</script>

<style>
.table-container {
  display: flex;
  justify-content: center;
  align-items: top;
}

.table-wrapper {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 90%;
  max-width: 1200px; 
  overflow-x: auto; 
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; 
}

.custom-table th,
.custom-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  min-width: 120px; 
}

.custom-table th {
  font-size: 1em;
  font-weight: bold;
  color: black;
  white-space: nowrap; 
}

.status-text {
  color: #FFA500;
  font-weight: bold;
}

.action-cell {
  font-size: 0.8em;
  color: #FFA500;
  font-weight: bold;
  cursor: pointer;
  text-align: left;
}

.action-cell .arrow {
  margin-left: 8px;
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-pending {
  color: orange;
  font-weight: bold;
}

.status-rejected {
  color: red;
  font-weight: bold;
}

.details {
  padding: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
}

.actions {
  margin-top: 10px;
}

.actions button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:first-child {
  background-color: green;
  color: white;
}

.actions button:last-child {
  background-color: red;
  color: white;
}
</style>