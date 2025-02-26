<template>
    <title>Solicitações</title>
    <HeaderAdmin/>
    <div class="container">
        <div class="cards">
            <CardComponents @Click="goToNewInstitution"
                title="Nova Instituição"
                description="Adicione novas Instituições de Ensino parceiras e credenciadas, somente com cadastro ativos é possível realizar novas solicitações."
            />
            <CardComponents @click="goToViewInstitutions"
                title="Gerenciar Instituições"
                description="Gerencie instituições parceiras e credenciadas, libere o rejeite acesso, data de vencimento do convênio, entre outras funções."
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
    
    const goToNewInstitution = () => {
        router.push("/new-institution-admin")
    };
    
    const goToViewInstitutions = () => {
        router.push("/view-institutions-admin")
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
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
