<template>
    <title>Solicitações</title>
    <HeaderAdmin/>
    <div class="container">
        <div class="cards">
            <CardComponents @Click="goToNewEquipment"
                title="Novo Equipamento"
                description="Adicione um novo equipamento com quantidade de vagas disponíveis para solicitação de práticas de ensino."
            />
            <CardComponents @click="goToViewEquipment"
                title="Gerenciar Equipamentos"
                description="Edite e gerencie os equipamentos cadastrados, aumente a quantidade vagas ou turnos."
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

    const goToNewEquipment = () => {
        router.push("/new-equipment-admin")
    };

    const goToViewEquipment = () => {
        router.push("/view-equipment-admin")
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
