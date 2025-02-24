<template>
  <div class="header">
      <div class="logo">
          <img id="imagem" src="../assets/logo amarela.png" width="100">
      </div>
      <nav class="navigation">
          <button id="HomePage" class="btn-no-filling" @click="goToHome">Página Inicial</button>
          <button id="Contacts" class="btn-no-filling" @click="goToContacts">Contatos</button>
          <button id="AcessSolicitation" class="btn-no-filling-sec" @click="goToSingUp">Solicitar Acesso</button>
          <button id="SingIn" class="btn-secondary" @click="goToLogin">Entrar</button>
      </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
    router.push("/login")
};
const goToHome = () => {
    router.push("/")
};
const goToSingUp = () => {
    router.push("/cadastro")
};
const goToContacts = () => {
    router.push("/contatos")
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>