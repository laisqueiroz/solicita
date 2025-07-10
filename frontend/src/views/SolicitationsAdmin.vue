<template>
    <title>Solicitações</title>
    <HeaderAdmin/>
    <div class="container">
        <div class="cards">
            <CardComponents @Click="goToViewSolicitations"
                title="Solicitações de Práticas"
                description="Gerencie e acompanhe os pedidos de práticas de ensino, garantindo um fluxo organizado e eficiente."
            />
            <CardComponents @Click="goToSolicitationsAcess"
                title="Solicitações de Acesso"
                description="Controle e revise as solicitações de acesso, assegurando conformidade com os requisitos institucionais."
            />
        </div>
        <div class="illustration">
        <img src="../assets/linear-art-gestao.png" alt="Ilustração de gestão">
        </div>
    </div>
</template>

<script setup>
import CardComponents from '../components/CardComponents.vue';
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goToViewSolicitations = () => {
    router.push("/solicitations-admin-view-solicitations")
};
const goToSolicitationsAcess = () => {
    router.push("/solicitations-acess-admin")
}
</script>

<style scoped>
.container {
    padding-top: 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.illustration {
    display: flex;
    justify-content: center;
    align-items: center;
}

.illustration img {
    max-width: 70%;
    height: auto;
}
</style>
