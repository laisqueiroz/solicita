<template>
    <div class="header">
        <div class="logo">
            <img id="imagem" src="../assets/logo amarela.png" width="100">
        </div>
        <nav class="navigation">
            <button id="HomePage" class="btn-no-filling" @click="goToPrincipalPage">Página de Gestão</button>
            <button id="Contacts" class="btn-no-filling" @click="goToSolicitationPage">Solicitações</button>
            <button id="AcessSolicitation" class="btn-no-filling" @click="goToEquipmentPage">Equipamentos</button>
            <button id="SingIn" class="btn-no-filling" @click="goToInstitutionPage">Instituições</button>
        </nav>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPrincipalPage = () => {
    router.push("/admin-management")
};

const goToSolicitationPage = () => {
    router.push("/solicitations-admin")
};

const goToEquipmentPage = () => {
    router.push("/manage-equipment")
}

const goToInstitutionPage = () => {
    router.push("/manage-institution")
}
</script>

<style scoped>


</style>
  