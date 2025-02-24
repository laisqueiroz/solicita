<template>
  <title>Nova Solicitação</title>
  <HeaderIE />
  <div class="container">
    <div class="head-form">
      <button class="btn-no-filling-primary" @click="voltarPagina">&#8592; Voltar</button>
      <h1>Nova Solicitação</h1>
    </div>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <div class="group">
          <label for="curso">Curso <span class="required">*</span></label>
          <input type="text" id="curso" v-model="form.curso" required>
        </div>
        <div class="group">
          <label for="periodo">Período da Disciplina <span class="required">*</span></label>
          <input type="text" id="periodo" v-model="form.periodo" required>
        </div>
      </div>

      <div class="form-group">
        <div class="group">
          <label for="disciplina">Disciplina <span class="required">*</span></label>
          <input type="text" id="disciplina" v-model="form.disciplina" required>
        </div>
        <div class="group">
          <label for="semestre">Semestre Letivo <span class="required">*</span></label>
          <input type="text" id="semestre" v-model="form.semestre" placeholder="2025.1" required>
        </div>
      </div>

      <div class="form-group">
        <div class="group-select">
          <label>Dias da semana <span class="required">*</span></label>
          <div class="checkbox-group">
            <div v-for="(dia, index) in diasSemanaOptions" :key="index" class="checkbox-item">
              <input
                type="checkbox"
                :id="'dia-' + index"
                :value="dia"
                v-model="form.diasSemana"
              >
              <label :for="'dia-' + index">{{ dia }}</label>
            </div>
          </div>
        </div>
        <div class="group">
          <label for="horarios">Horários <span class="required">*</span></label>
          <select id="horarios" v-model="form.horarios" required>
            <option value="">--Selecione--</option>
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <div class="group">
          <label for="modalidade">Modalidade <span class="required">*</span></label>
          <select id="modalidade" v-model="form.modalidade" required>
            <option value="">--Selecione--</option>
            <option value="estagio">Estágio</option>
            <option value="visita">Visita técnica</option>
            <option value="aula">Aula prática</option>
            <option value="acao">Ação de extensão</option>
          </select>
        </div>
        <div class="group">
          <label for="unidade-saude">Unidade de saúde <span class="required">*</span></label>
          <input type="text" id="unidade-saude" v-model="form.unidadeSaude" placeholder="UBS Centro" required>
        </div>
      </div>
      
      <div class="form-group">
        <div class="group">
          <label for="nome-preceptor">Nome do preceptor <span class="required">*</span></label>
          <input type="text" id="nome-preceptor" v-model="form.nomePreceptor" required>
        </div>
        <div class="group">
          <label for="registro-concelho">Número de registro do Conselho</label>
          <input type="text" id="registro-concelho" v-model="form.registroConcelho">
        </div>
      </div>

      <div class="form-group">
        <div class="group-list">
          <label>Relação de Alunos <span class="required">*</span></label>
          <div v-for="(aluno, index) in form.alunos" :key="index" class="aluno-group">
            <input type="text" v-model="aluno.nome" placeholder="Nome Completo" required>
            <input type="text" v-model="aluno.cpf" placeholder="CPF" required>
            <button type="button" @click="removerAluno(index)" class="btn-remove">✖</button>
          </div>
          <button type="button" @click="adicionarAluno" class="btn-secondary">Adicionar Aluno</button>
        </div>
      </div>
      
      <button type="submit" class="btn-primary" >Enviar Solicitação</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderIE from '../components/HeaderIE.vue';

const router = useRouter();
const diasSemanaOptions = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
const form = reactive({
  curso: '',
  periodo: '',
  disciplina: '',
  diasSemana: [],
  semestre: '',
  horarios: '',
  modalidade: '',
  nomePreceptor: '',
  unidadeSaude: '',
  registroConcelho: '',
  alunos: []
});

const adicionarAluno = () => {
  form.alunos.push({ nome: '', cpf: '' });
};

const removerAluno = (index) => {
  form.alunos.splice(index, 1);
};

const submitForm = () => {
  alert("Solicitação enviada com sucesso!");
  console.log('Formulário enviado:', form);
  router.push('/gestao-ie');
};

const voltarPagina = () => {
  router.push('/gestao-ie');
};
</script>

<style scoped>
#app {
  display: flex;
  align-items: center;
}
.container {
  width: 600px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  padding: 20px;
  margin-top: 30px;
  margin-left: 25%;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.head-form {
  display: flex;
  align-items: center;
  justify-content: center; 
  position: relative; 
  width: 100%;
  padding: 10px 0;
}

.head-form h1 {
  flex-grow: 1;
  text-align: center;
  margin: 0;
  color: #003366;
}

.head-form button {
  position: absolute;
  left: 0;
}

.form-group {
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
}

.group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.group-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.group-list input {
  width: 90%;
  border: 1px solid #003366;
  padding: 5px;
  height: 20px;
  border-radius: 5px;
}

.group input {
  width: 90%;
  border: 1px solid #003366;
  padding: 5px;
  height: 20px;
  border-radius: 5px;
}

.group select {
  width: 94%;
  border: 1px solid #003366;
  padding: 5px;
  height: 30px; 
  border-radius: 5px;
  background-color: white;
  font-size: 14px;
  color: #333;
  outline: none;
  appearance: none; 
  cursor: pointer;
  padding-right: 30px;
}

.required {
  color: #F39A24;
}

.group-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-item {
  position: relative;
}

.checkbox-item input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.8em;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s, color 0.3s;
}

.checkbox-item label::before {
  content: "";
  width: 18px;
  height: 18px;
  border: 2px solid #003366;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  transition: 0.2s;
  background: white;
}

.checkbox-item input:checked + label {
  background: #003366;
  color: white;
}

.checkbox-item input:checked + label::before {
  background: #003366;
  border-color: transparent;
  content: "✔";
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 18px;
}

.aluno-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

</style>