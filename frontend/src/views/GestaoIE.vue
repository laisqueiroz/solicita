<template>
    <title>Gestão - IE</title>
    <HeaderIE />
    <div class="container">
        <div class="cards">
            <CardComponents 
                title="Nova Solicitação"
                description="Registre uma nova solicitação de prática de ensino informando os detalhes necessários."
            />
            <CardComponents 
                title="Visualizar Solicitações"
                description="Acompanhe o status e detalhes das suas solicitações enviadas."
            /> 
        </div>
        <div class="illustration">
            <img src="../assets/Layer_x0020_1 (Traced).png" alt="ilustração IE">
        </div>
    </div>
</template>

<script setup>
import CardComponents from '../components/CardComponents.vue';
import HeaderIE from '../components/HeaderIE.vue';
</script>

<style>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 50px;
    margin-left: 50px;
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