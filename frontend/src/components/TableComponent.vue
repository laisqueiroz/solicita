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
        <tbody>
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
                {{ expandedRows.has(index) ? 'Ocultar' : 'Ver mais' }}
                <span class="arrow">{{ expandedRows.has(index) ? '▲' : '▼' }}</span>
              </td>
            </tr>

            <tr v-if="expandedRows.has(index)">
              <td :colspan="columns.length + 1">
                <div class="details">
                  <!-- SLOT PARA DETALHES -->
                  <slot name="details" :row="row" :index="index">
                    <p>Detalhes não definidos.</p>
                  </slot>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
  columns: Array,
  data: Array,
  showDefaultActions: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["verMais", "aprovar", "negar"]);

const expandedRows = ref(new Set());

const toggleExpand = (index) => {
  emit("verMais", index);
  if (expandedRows.value.has(index)) {
    expandedRows.value.delete(index);
  } else {
    expandedRows.value.add(index);
  }
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
  width: 100%;
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
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-left: 2px solid #003366;
  border-right: 2px solid #003366;
  border-bottom: 2px solid #003366;
}
</style>