<template>
  <title>Solicitações de Práticas</title>
  <HeaderIE />
  <div class="table">
    <h1>Solicitações de Práticas</h1>
    <TableComponent :columns="columns" :data="data" @verMais="abrirModal"/>
  </div>

  <div v-if="modalAberto" class="modal-overlay">
    <div class="modal">
      <button @click="fecharModal" class="close">&times;</button>
      <h2>Detalhes da Solicitação</h2>
      <p><strong>Código:</strong> {{ solicitacaoSelecionada.code }}</p>
      <p><strong>Curso:</strong> {{ solicitacaoSelecionada.course }}</p>
      <p><strong>Disciplina:</strong> {{ solicitacaoSelecionada.subject }}</p>
      <p><strong>Semestre:</strong> {{ solicitacaoSelecionada.period }}</p>
      <p><strong>Tipo de Solicitação:</strong> {{ solicitacaoSelecionada.modality }}</p>
      <p><strong>Turno da Solicitação:</strong> {{ solicitacaoSelecionada.shift }}</p>
      <p><strong>Unidade/Equipamento:</strong> {{ solicitacaoSelecionada.Equipment.name }}</p>
      <p><strong>Instituição Solicitante:</strong> {{ solicitacaoSelecionada.Institution.name }}</p>
      <p><strong>Nome do Preceptor:</strong> {{ solicitacaoSelecionada.preceptorName }}</p>
      <p><strong>N° Registro no Conselho:</strong> {{ solicitacaoSelecionada.councilRegistration }}</p>
      <p><strong>Status:</strong> {{ solicitacaoSelecionada.status }}</p>
      <div class="modal-actions">
        <button @click="denySolicitation" class="btn-remove">Cancelar Solicitação</button>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TableComponent from "../components/TableComponent.vue";
import HeaderIE from "../components/HeaderIE.vue";
import { getAllSolicitations, updateSolicitationId } from "../services/api";

const columns = ref([
  { label: "Código", field: "code" },
  { label: "Tipo de Solicitação", field: "modality" },
  { label: "Unidade", field: (row) => row.Equipment?.name || "N/A"},
  { label: "Instituição", field: (row) => row.Institution?.name || "N/A" },
  { label: "Status", field: "status" },
]);

const data = ref([]);

const modalAberto = ref(false);
const solicitacaoSelecionada = ref({});

onMounted(async () => {
  data.value = await getAllSolicitations();
});

const abrirModal = (solicitacao) => {
  solicitacaoSelecionada.value = solicitacao;
  modalAberto.value = true;
};

const fecharModal = () => {
  modalAberto.value = false;
};


const denySolicitation = async () => {
  await updateSolicitationId(solicitacaoSelecionada.value.id, { status: "Cancelada"});
  alert(`Solicitação Cancelada com Sucesso ${solicitacaoSelecionada.value.code}`);
  data.value = await getAllSolicitations();
  fecharModal();
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