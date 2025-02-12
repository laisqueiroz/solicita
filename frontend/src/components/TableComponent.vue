<template>
    <div class="table-container">
    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.field">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="col in columns" :key="col.field">
              <span v-if="col.field === 'status'" class="status-text">
                {{ row[col.field] }}
              </span>
              <span v-else>
                {{ row[col.field] }}
              </span>
            </td>
            <td class="action-cell">Ver mais <span class="arrow">▼</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  columns: Array, 
  data: Array, 
});
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
  font-size: 14px;
  font-weight: bold;
  color: black;
  white-space: nowrap; 
}

.status-text {
  color: #FFA500;
  font-weight: bold;
}

.action-cell {
  color: #FFA500;
  font-weight: bold;
  cursor: pointer;
  text-align: left;
}

.action-cell .arrow {
  margin-left: 8px;
}
</style>