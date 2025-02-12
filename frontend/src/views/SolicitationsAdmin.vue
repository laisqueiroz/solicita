<template>
    <title>Solicitações</title>
    <HeaderAdmin/>
    <div class="container">
        <div class="cards">
            <CardComponents @Click="goToViewSolicitations"
                title="Solicitações de Práticas"
                description="uashuahsdiuashdhsadjhsaidhsuadnkjsadnkjasdkjasdkjashdkjahskdjhaskdjhsakjdhasjdhkshdkjashkdjhaskdjhaskjdh"
            />
            <CardComponents 
                title="Solicitações de Acesso"
                description="uashuahsdiuashdhsadjhsaidhsuadnkjsadnkjasdkjasdkjashdkjahskdjhaskdjhsakjdhasjdhkshdkjashkdjhaskdjhaskjdh"
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
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
img {
    width: 350px;
}
.illustration {
    align-items: center;
}
</style>