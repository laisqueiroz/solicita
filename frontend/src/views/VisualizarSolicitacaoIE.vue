<template>
    <title>Visualizar solicitações</title>

    <HeaderIE />
    <TableComponent :columns="columns" :data="data" />


</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderIE from '../components/HeaderIE.vue';
import TableComponent from '../components/TableComponent.vue';

const columns = ref([
  { label: "Status", field: "status" },
  { label: "Tipo de Solicitação", field: "modality" },
  { label: "Unidade", field: "equipmentId" },
]);

const data = ref([]);

onMounted(async () => {
  //const response = await fetch("http://localhost:3000/");
  //data.value = await response.json();
  data.value = []
})
</script>

<style scoped></style>