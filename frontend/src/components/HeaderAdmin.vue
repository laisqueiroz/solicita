<template>
    <div class="header">
        <div class="logo">
            <img id="imagem" src="../assets/logo amarela.png" width="100">
        </div>
        <nav class="navigation">
            <button id="HomePage" class="btn-no-filling-sec" @click="goToPrincipalPage">Página de Gestão</button>
            <button id="Contacts" class="btn-no-filling" href="#">Solicitações</button>
            <button id="AcessSolicitation" class="btn-no-filling" href="#">Equipamentos</button>
            <button id="SingIn" class="btn-no-filling">Instituições</button>
        </nav>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPrincipalPage = () => {
    router.push("/gestao-admin")
};

defineOptions({
name: "HeaderComponent"
});
</script>

<style scoped>


</style>
  