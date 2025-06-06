<template>
  <div class="container">
    <HeaderIE />
    <form class="tabela">
      <div class="nav">
        <div class="tag-status"></div>
        <button class="ver-mais-btn" type="button">
          Ver menos <span class="arrow">▲</span>
        </button>
      </div>
      <section>
        <h2>Informações Básicas</h2>
        <div class="informations">
          <p>Curso: </p>
          <p>Período: </p>
          <p>Disciplina: </p>
          <p>Semestre: </p>
          <p>Modalidade: </p>
        </div>
      </section>
      <section>
        <h2>Horários e Dias</h2>
        <div class="informations">
          <p>Horário: </p>
          <p>Dias: </p>
        </div>
      </section>
      <section>
        <h2>Unidade de Saúde</h2>
        <div class="informations">
          <p>Nome: </p>
          <p>Número do Registro do Conselho: </p>
          <p>Código de Identificação: </p>
        </div>
      </section>
      <section>
        <h2>Preceptor</h2>
        <p>Nome: </p>
      </section>
      <section>
        <h2>Relação de Aluno</h2>
        <ul>
          <li v-for="aluno in dados.alunos" :key="aluno.id"> </li>
        </ul>
      </section>
      <div class="divider"></div>
      <div class="buttons">
        <button class="button edit" type="button">Editar Solicitação</button>
        <button class="button delete" type="button">Excluir Solicitação</button>
      </div>
      <section>
        <h2>Status</h2>
        <p>{{ dados.status }}</p>
      </section>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import HeaderIE from '../components/HeaderIE.vue';
  
  const dados = ref({
    curso: '',
    periodo: '',
    disciplina: '',
    semestre: '',
    modalidade: '',
    horario: '',
    dias: '',
    unidade: { nome: '', registro: '', codigo: '' },
    preceptor: '',
    alunos: [],
    status: ''
  });
</script>

<style scoped>
  .container {
    width: 80%;
    margin: 20px auto;
  }
  .tabela {
    width: 800px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
  }
  .divider {
    border-bottom: 2px solid black;
  }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    margin-bottom: 10px;
  }
  .tag-status {
    width: 56px;
    height: 12px;
    background-color: red;
    border-radius: 25px 25px;
  }
  .ver-mais-btn {
    background: none;
    border: none;
    color: orange;
    font-size: 14px;
    cursor: pointer;
    padding: 10px;
  }
  section {
    padding: 10px 0;
    flex-direction: row;
    text-align: left;
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid black;
    padding-bottom: 5px;
  }
  p {
    font-size: 14px;
    margin: 5px 0;
  }
  .informations {
    display: flex;
    flex-direction: row;
    text-align: left;
    gap: 16px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  .buttons {
    text-align: center;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  .button {
    padding: 8px 15px;
    border: none;
    color: white;
    cursor: pointer;
    margin: 5px;
    border-radius: 5px;
  }
  .edit {
    background-color: #0d3b6d;
  }
  .delete {
    background-color: #c20000;
  }
  .delete:hover {
    background-color: #720303;
  }
  .edit:hover {
    background-color: #082647;
  }
</style>
