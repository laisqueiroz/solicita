<template>
  <title>Solicitações de Práticas</title>
  <HeaderAdmin/>
  <div class="table">
    <h1>Solicitações de Práticas</h1>
    <TableComponent :columns="columns" :data="data" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TableComponent from "../components/TableComponent.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";

const columns = ref([
  { label: "Código", field: "code" },
  { label: "Tipo de Solicitação", field: "modality" },
  { label: "Unidade", field: "equipmentId" },
  { label: "Instituição", field: "institutionId" },
  { label: "Status", field: "status" },
]);

const data = ref([]);

onMounted(async () => {
  //const response = await fetch("http://localhost:3000/");
  //data.value = await response.json();
  data.value = [
    {
      "code": "REQ-2024001",
      "modality": "Estágio Supervisionado",
      "equipmentId": "UBS Centro",
      "institutionId": "Universidade Federal do Ceará",
      "status": "Aprovado",
    },
    {
      "code": "REQ-2024002",
      "modality": "Visita Técnica",
      "equipmentId": "Hospital Municipal",
      "institutionId": "Universidade Estadual do Ceará",
      "status": "Em análise",
    },
    {
      "code": "REQ-2024003",
      "modality": "Aula Prática",
      "equipmentId": "Laboratório de Análises Clínicas",
      "institutionId": "Centro Universitário Estácio",
      "status": "Recusado",
    },
    {
      "code": "REQ-2024004",
      "modality": "Extensão Comunitária",
      "equipmentId": "Posto de Saúde São José",
      "institutionId": "Universidade de Fortaleza",
      "status": "Aprovado",
    },
    {
      "code": "REQ-2024005",
      "modality": "Estágio Curricular",
      "equipmentId": "Hospital Infantil",
      "institutionId": "Faculdade Maurício de Nassau",
      "status": "Em análise",
    }
  ]
});
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>