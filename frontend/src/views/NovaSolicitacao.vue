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
          <label>Dias da semana <span class="required">*</span></label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="Segunda-feira" v-model="form.diasSemana"> Segunda-feira</label>
            <label><input type="checkbox" value="Terça-feira" v-model="form.diasSemana"> Terça-feira</label>
            <label><input type="checkbox" value="Quarta-feira" v-model="form.diasSemana"> Quarta-feira</label>
            <label><input type="checkbox" value="Quinta-feira" v-model="form.diasSemana"> Quinta-feira</label>
            <label><input type="checkbox" value="Sexta-feira" v-model="form.diasSemana"> Sexta-feira</label>
          </div>
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
          <select id="modalidade" v-model="form.modalidade" required>
            <option value="">--Selecione--</option>
            <option value="estagio">Estágio</option>
            <option value="visita_tecnica">Visita técnica</option>
            <option value="aula_pratica">Aula prática</option>
            <option value="acao_extensao">Ação de extensão</option>
          </select>
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
          <label for="registro-conselho">Número de registro do Conselho <span class="required">*</span></label>
          <input type="text" id="registro-conselho" v-model="form.registroConselho" required>
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
  <div v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import HeaderIE from '../components/HeaderIE.vue';

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
  registroConselho: '',
  relacaoAluno: 'max-6'
});

const feedbackMessage = ref('');
  
  const submitForm = () => {
    try {
      console.log('Formulário enviado:', form);
      feedbackMessage.value = 'Solicitação enviada com sucesso!';
    } catch (error) {
      feedbackMessage.value = 'Ocorreu um erro ao enviar a solicitação. Tente novamente.';
    }
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
  color: black;
}

label {
  display: block;
  margin-bottom: 2px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.feedback-message {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #ffffff;
  }

.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
}

.checkbox-group label {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.checkbox-group input {
  margin-right: 5px;
}

.required {
  color: #f7981d;
}

button {
  padding: 10px;
  background-color: #0e2e4a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin: 20px auto 0;
  display: block;
}

button:hover {
  background-color: #081a2a;
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
