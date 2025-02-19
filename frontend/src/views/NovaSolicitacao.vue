<template>
    <title>Nova Solicitação</title>
    <HeaderIE />
    
    <div class="form-container">
      <h1>Solicitação de Estágio</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <div>
            <label for="curso">Curso <span class="required">*</span></label>
            <input type="text" id="curso" v-model="form.curso" required>
          </div>
          <div>
            <label for="periodo">Período <span class="required">*</span></label>
            <input type="text" id="periodo" v-model="form.periodo" required>
          </div>
        </div>
  
        <div class="form-group">
          <div>
            <label for="disciplina">Disciplina <span class="required">*</span></label>
            <input type="text" id="disciplina" v-model="form.disciplina" required>
          </div>
          <div>
            <label for="dias-da-semana">Dias da semana <span class="required">*</span></label>
            <select id="dias-da-semana" v-model="form.diasSemana" required>
              <option value="">--Selecione--</option>
              <option value="segunda">Segunda-feira</option>
              <option value="terca">Terça-feira</option>
              <option value="quarta">Quarta-feira</option>
              <option value="quinta">Quinta-feira</option>
              <option value="sexta">Sexta-feira</option>
            </select>
          </div>
        </div>
  
        <div class="form-group">
          <div>
            <label for="semestre">Semestre <span class="required">*</span></label>
            <input type="text" id="semestre" v-model="form.semestre" required>
          </div>
          <div>
            <label for="horarios">Horários <span class="required">*</span></label>
            <select id="horarios" v-model="form.horarios" required>
              <option value="">--Selecione--</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
            </select>
          </div>
        </div>
  
        <div class="form-group">
          <div>
            <label for="modalidade">Modalidade <span class="required">*</span></label>
            <input type="text" id="modalidade" v-model="form.modalidade" required>
          </div>
          <div>
            <label for="nome-preceptor">Nome do preceptor <span class="required">*</span></label>
            <input type="text" id="nome-preceptor" v-model="form.nomePreceptor" required>
          </div>
        </div>
  
        <div class="form-group">
          <div>
            <label for="unidade-saude">Unidade de saúde <span class="required">*</span></label>
            <input type="text" id="unidade-saude" v-model="form.unidadeSaude" required>
          </div>
          <div>
            <label for="registro-concelho">Número de registro do Conselho <span class="required">*</span></label>
            <input type="text" id="registro-concelho" v-model="form.registroConcelho" required>
          </div>
        </div>
  
        <div class="form-group">
          <div>
            <label for="relacao-aluno">Relação de aluno <span class="required">*</span></label>
            <select id="relacao-aluno" v-model="form.relacaoAluno" required>
              <option value="max-6">Max. 6</option>
            </select>
          </div>
        </div>
  
        <button type="submit">Enviar nova solicitação</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import HeaderIE from '../components/HeaderIE.vue';
  
  const form = reactive({
    curso: '',
    periodo: '',
    disciplina: '',
    diasSemana: '',
    semestre: '',
    horarios: '',
    modalidade: '',
    nomePreceptor: '',
    unidadeSaude: '',
    registroConcelho: '',
    relacaoAluno: 'max-6'
  });
  
  const submitForm = () => {
    console.log('Formulário enviado:', form);
  };
  </script>
  
  <style scoped>
  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
  }
  
  h1 {
    text-align: center;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .required {
    color:  #f7981d
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color:#0e2e4a;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button:hover {
    background-color:#081a2a;;
  }
  
  .form-group {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .form-group div {
    flex: 1;
    min-width: 250px;
  }
  </style>
  