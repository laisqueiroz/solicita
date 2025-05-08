<template>
  <title>Solicitações de Práticas</title>
  <HeaderAdmin/>
  <div class="table">
    <h1>Solicitações de Práticas</h1>
    <TableComponent 
      :columns="columns" 
      :data="data" 
      @verMais="toggleExpand" 
      @aprovar="aprovedSolicitation"
      @negar="denySolicitation"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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

const data = ref([]);

onMounted(async () => {
  const solicitations = await getAllSolicitations();
  data.value = solicitations.map(solicitation => ({
    ...solicitation,
    expandida: false
  }));
});

const toggleExpand = (index) => {
  data.value[index].expandida = !data.value[index].expandida;
};

const aprovedSolicitation = async () => {
  await updateSolicitationId(solicitacaoSelecionada.value.id, { status: "Deferido"});
  alert(`Solicitação aprovada com sucesso: ${solicitacaoSelecionada.value.code}`);
  data.value = await getAllSolicitations();
};

const denySolicitation = async () => {
  await updateSolicitationId(solicitacaoSelecionada.value.id, { status: "Indeferido"});
  alert(`Solicitação aprovada com sucesso: ${solicitacaoSelecionada.value.code}`);
  data.value = await getAllSolicitations();
};
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 400px;
}

.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-actions button {
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  flex: 1;
  text-align: center;
}

button.approve {
  background: green;
  color: white;
}

button.negate {
  background: red;
  color: white;
}

button.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: black;
}
</style>