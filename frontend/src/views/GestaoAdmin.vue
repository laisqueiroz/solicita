<template>
    <title>Gestão - Administrador</title>
    <HeaderAdmin />
    <div class="container">
        <div class="cards">
            <CardComponents 
                title="Gerenciar Solicitações"
                description="uashuahsdiuashdhsadjhsaidhsuadnkjsadnkjasdkjasdkjashdkjahskdjhaskdjhsakjdhasjdhkshdkjashkdjhaskdjhaskjdh"
            />
            <CardComponents 
                title="Gerenciar Instituições Credenciadas"
                description="uashuahsdiuashdhsadjhsaidhsuadnkjsadnkjasdkjasdkjashdkjahskdjhaskdjhsakjdhasjdhkshdkjashkdjhaskdjhaskjdh"
            />
            <CardComponents 
                title="Gerenciar Equipamentos"
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