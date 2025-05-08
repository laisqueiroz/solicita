<template>
    <title>Portal Solicita</title>
    <HeaderComponent />
    <main class="container">
      <div class="galery">
      </div>
      <div class="content">
          <h1>Facilitando<br> a prática, <br> ampliando o <br> aprendizado</h1>
          <p>Um sistema inovador projetado para simplificar o processo de solicitação de práticas de ensino. Destinado a coordenadores e instituições de ensino, o sistema facilita a gestão dos pedidos, permitindo o acompanhamento de status e aprovações, promovendo uma experiência mais eficiente e organizada.</p>
      </div>
    </main>
    <FooterComponent />
</template>

<script setup>
import HeaderComponent from '../components/HeaderHome.vue';
import FooterComponent from '../components/FooterIllustration.vue';

</script>

<style scoped>
#app {
max-width: min-content;
margin: 0px;
padding: 0px;
}
main {
display: flex;
justify-content: space-between;
align-items: center;
padding: 5% 10%;
height: auto;
}
.container {
display: grid;
grid-template-columns: repeat(5, 20%);
grid-template-rows: 25% 25% 25% 25%;
}
.content {
grid-column-start: 4;
grid-column-end: 6;
grid-row-start: 2;
grid-row-end: 4;
}
.content h1 {
text-align: left;
font-size: 30px;
color: #f7981d;
line-height: 1.2;
font-weight: bold;
}
.content p {
color: #fff;
text-align: left;
font-size: 14px;
margin-top: 20px;
line-height: 1.6;
padding-right: 100px;
}
</style>