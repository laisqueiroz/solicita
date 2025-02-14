<template>
    <div class="container">
      <HeaderIE />
      <div class="tabela">
        <div class="nav">
          <div>🔴</div>
          <button class="ver-mais-btn" @click="toggleVerMais">Ver menos</button>
        </div>
  
        <div class="divider"></div>
  
        <div class="section">
          <div class="section-title">Informações Básicas</div>
          <div class="info-text">
            <p>Curso:</p>
            <p>Período:</p>
            <p>Disciplina:</p>
            <p>Semestre:</p>
            <p>Modalidade:</p>
          </div>
        </div>
  
        <div class="divider"></div>
  
        <div class="section">
          <div class="section-title">Horários e dias</div>
          <div class="info-text">
            <p>Horário:</p>
            <p>Dias:</p>
          </div>
        </div>
  
        <div class="divider"></div>
  
        <div class="section">
          <div class="section-title">Unidade de Saúde</div>
          <div class="info-text">
            <p>Nome:</p>
            <p>Número do Registro do Conselho:</p>
            <p>Código de Identificação:</p>
          </div>
        </div>
  
        <div class="divider"></div>
  
        <div class="section">
          <div class="section-title">Preceptor</div>
          <div class="info-text">
            <p>Nome:</p>
          </div>
        </div>
  
        <div class="divider"></div>
  
        <div class="section">
          <div class="section-title">Relação de aluno</div>
          <div class="info-text">
          </div>
        </div>
  
        <div class="divider"></div>
  
        <div class="buttons">
          <button class="button edit">Editar Solicitação</button>
          <button class="button delete">Excluir Solicitação</button>
        </div>
  
        <div class="divider"></div>
  
        <div class="section">
          <div class="section-title">Status</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import HeaderIE from '../components/HeaderIE.vue';
  
  const verMais = ref(false);
  const toggleVerMais = () => {
    verMais.value = !verMais.value;
  };
  </script>
  
  <style scoped>
  .container {
    width: 80%;
    margin: 20px auto;
  }
  
  .tabela {
    width: 800px;
    height: 700px; 
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    margin-bottom: 10px;
  }
  
  .ver-mais-btn {
    background: none;
    border: none;
    color: orange;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 
  }
  
  
  .section {
    padding: 10px 15px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    border-bottom: 2px solid black;
    width: 98%;
    padding-bottom: 5px;
    margin-left: auto;
  }
  
  .info-text p {
    font-size: 14px;
    margin: 10px;
    display: inline;
    text-align: left;
    
  }
  
  .buttons {
    margin-top: 15px;
    text-align: center;
    width: 10
    
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

  .delet:hover {
    background-color:#720303;
  }

  .edit:hover {
    background-color:#082647;
  }
  

  </style>
  