<template>
    <div class="header">
        <div class="logo">
            <img id="imagem" src="../assets/logo amarela.png" width="100">
        </div>
        <nav class="navigation">
            <button id="HomePage" class="btn-no-filling" @click="goToPrincipalPage">Página de Gestão</button>
            <button id="AcessSolicitation" class="btn-no-filling-sec" @click="goToViewSolicitations">Visualizar Solicitações</button>
            <button id="SingIn" class="btn-secondary" @click="goToNewSolicitation">Nova Solicitação</button>
        </nav>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPrincipalPage = () => {
    router.push("/gestao-ie")
};

const goToViewSolicitations = () => {
    router.push("/view-all-solicitations")
};

const goToNewSolicitation = () => {
    router.push("/new-solicitation")
};
</script>

<style scoped>


</style>
  