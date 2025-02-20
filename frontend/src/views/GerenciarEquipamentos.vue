<template>
  <HeaderAdmin />

  <div class="table-container">
    <h1 class="title">Equipamentos</h1>
    <div class="table-header">
      <button class="add-button" @click="state.showModal = true">Adicionar Equipamento</button>
    </div>
    <!-- Tabela -->
    <TableComponent :columns="state.columns" :data="state.data" />
  </div>

  <!-- Modal -->
  <div v-if="state.showModal" class="modal-overlay">
    <div class="modal">
      <h2>Adicionar Equipamento</h2>

      <label>Nome:</label>
      <input v-model="state.newEquipment.name" type="text" placeholder="Nome do equipamento">

      <div v-for="(turno, index) in state.newEquipment.turnos" :key="index" class="turno-group">
        <label>Turno:</label>
        <select v-model="turno.shift">
          <option>Manhã</option>
          <option>Tarde</option>
          <option>Noite</option>
        </select>
        
        <label>Vagas:</label>
        <input v-model="turno.total" type="number" placeholder="Quantidade de vagas">
      </div>

      <button class="add-turno" @click="addTurno">+ Adicionar outro turno</button>

      <div class="modal-buttons">
        <button class="add-button" @click="addEquipment">Adicionar Equipamento</button>
        <button class="cancel-button" @click="state.showModal = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import TableComponent from "../components/TableComponent.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";

const state = reactive({
  showModal: false,
  columns: [
    { label: "Nome", field: "name" },
    { label: "Turno", field: "shift" },
    { label: "Total de vagas", field: "total" }
  ],
  data: [],
  newEquipment: {
    name: "",
    turnos: [{ shift: "Manhã", total: "" }]
  }
});

const addTurno = () => {
  state.newEquipment.turnos.push({ shift: "Manhã", total: "" });
};

const addEquipment = () => {
  state.newEquipment.turnos.forEach(turno => {
    state.data.push({
      name: state.newEquipment.name,
      shift: turno.shift,
      total: turno.total
    });
  });

  // Fecha o modal e reseta o formulário
  state.showModal = false;
  state.newEquipment = { name: "", turnos: [{ shift: "Manhã", total: "" }] };
};

onMounted(() => {
  state.data = [
    { name: "Equipamento A", shift: "Manhã", total: "20" },
    { name: "Equipamento B", shift: "Tarde", total: "15" },
    { name: "Equipamento C", shift: "Noite", total: "10" }
  ];
});
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 10px;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 600px;
}

.add-button {
  background-color: #f39c12;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 0px;
}

.add-button:hover {
  background-color: #e67e22;
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
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal h2 {
  margin-bottom: 10px;
}

.modal label {
  width: 100%;
  text-align: left;
  margin-top: 10px;
}

.modal input, .modal select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.turno-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.add-turno {
  background-color: #3498db;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.add-turno:hover {
  background-color: #2980b9;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style>
