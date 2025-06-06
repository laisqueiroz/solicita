<template>
    <title>Gestão - Administrador</title>
    <HeaderAdmin />
    <div class="container">
        <div class="cards">
            <CardComponents @Click="goToSolicitations"
                title="Gerenciar Solicitações"
                description="Gerencie e acompanhe as solicitações de práticas de ensino e solicitações de acesso ao sistema de forma centralizada e eficiente."
            />
            <CardComponents @Click="goToInstitutions"
                title="Gerenciar Instituições Credenciadas"
                description="Administre as instituições credenciadas e mantenha o controle sobre os estabelecimentos parceiros."
            />
            <CardComponents @Click="goToEquipment"
                title="Gerenciar Equipamentos"
                description="Supervisione e organize os equipamentos disponíveis para as práticas de ensino."
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

const goToSolicitations = () => {
    router.push("/solicitations-admin")
};
const goToEquipment = () => {
    router.push("/manage-equipment")
};
const goToInstitutions = () => {
    router.push("/manage-institution")
};
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
