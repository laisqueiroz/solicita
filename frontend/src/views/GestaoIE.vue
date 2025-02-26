<template>
    <title>Gestão - IE</title>
    <HeaderIE />
    <div class="container">
        <div class="cards">
            <CardComponents @click="goToNewSolicitation"
                title="Nova Solicitação"
                description="Registre uma nova solicitação de prática de ensino informando os detalhes necessários."
            />
            <CardComponents @click="goToViewSolicitations"
                title="Visualizar Solicitações"
                description="Registre uma nova solicitação de prática de ensino informando os detalhes necessários."
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
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    
    const goToNewSolicitation = () => {
        router.push("/new-solicitation")
};

const goToViewSolicitations =() => {
    router.push("/view-all-solicitations")
}

</script>

<style scoped>
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
