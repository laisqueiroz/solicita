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
          <label for="curso">Nome do Curso <span class="required">*</span></label>
          <input type="text" id="curso" v-model="form.curso" required>
        </div>
        <div class="group">
          <label for="disciplina">Disciplina <span class="required">*</span></label>
          <input type="text" id="disciplina" v-model="form.disciplina" required>
        </div>
      </div>
      
      <div class="form-group">
        <div class="group">
           <label for="semestre">Semestre Letivo <span class="required">*</span></label>
           <input type="text" id="semestre" v-model="form.semestre" placeholder="Ex: 2025.1" required>
        </div>
         <div class="group">
            <label for="modalidade">Modalidade da Ação <span class="required">*</span></label>
            <select id="modalidade" v-model="form.modalidade" required>
              <option value="" disabled>--Selecione--</option>
              <option value="estagio">Estágio</option>
              <option value="visita">Visita técnica</option>
              <option value="aula">Aula prática</option>
              <option value="acao">Ação de extensão</option>
            </select>
            
        </div>
      </div>

      <label class="section-label">Informações da Ação de Ensino</label>
      <div class="form-group">
        <div class="group">
          <label for="unidade-saude">Unidade de Saúde <span class="required">*</span></label>
          <select id="unidade-saude" v-model="form.unidadeSaudeId" required>
            <option value="" disabled>Selecione a Unidade</option>
            <option v-for="unidade in unidadesDeSaude" :key="unidade.id" :value="unidade.id">
              {{ unidade.name }}
            </option>
          </select>
        </div>
        <div class="group">
          <label for="setor">Setor da Unidade <span class="required">*</span></label>
          <select 
            id="setor" 
            v-model="form.departmentId" 
            :disabled="!form.unidadeSaudeId"
          >
            <option value="" disabled>
              {{ form.unidadeSaudeId ? 'Selecione o Setor' : 'Selecione uma unidade primeiro' }}
            </option>
            <option v-for="departamento in setoresDisponiveis" :key="departamento.id" :value="departamento.id">
              {{ departamento.nameDepartment }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="form-group" v-if="form.modalidade === 'estagio'">
        <div class="group">
          <label for="data-inicio">Data de Início <span class="required">*</span></label>
          <input 
            type="date" 
            id="data-inicio" 
            v-model="form.dataInicio" 
            :min="dataMinimaPermitida"
            required
          >
        </div>
        <div class="group">
          <label for="data-fim">Data de Término (opcional)</label>
          <input 
            type="date" 
            id="data-fim" 
            v-model="form.dataFim" 
            :min="form.dataInicio" 
            :disabled="!form.dataInicio"
          >
        </div>
      </div>

      <div class="form-group" v-else-if="form.modalidade">
        <div class="group">
          <label for="data-unica">Data da Atividade <span class="required">*</span></label>
          <input 
            type="date" 
            id="data-unica" 
            v-model="form.dataUnica"
            :min="dataMinimaPermitida"
            required
          >
        </div>
        <div class="group"></div> 
      </div>

      <div class="form-group">
        <div class="group-select" v-if="form.modalidade === 'estagio'">
          <label>Dias da semana <span class="required">*</span></label>
          <div class="checkbox-group">
            <div v-for="dia in diasSemanaOptions" :key="dia.value" class="checkbox-item">
              <input type="checkbox" :id="'dia-' + dia.value" :value="dia.value" v-model="form.diasSemana">
              <label :for="'dia-' + dia.value">{{ dia.text }}</label>
            </div>
            <span v-if="datasCalculadas.length > 0" class="helper-text-dark">
              Total de {{ datasCalculadas.length }} dias de atividade calculados.
            </span>
          </div>
        </div>

        <div class="group">
           <label for="turno">Turno/Horário <span class="required">*</span></label>
            <select id="turno" v-model="form.rotationId" :disabled="!form.departmentId" required>
              <option value="" disabled>
                {{ form.departmentId ? 'Selecione o Turno' : 'Selecione um setor' }}
              </option>
              <option v-for="rotacao in rotacoesDisponiveis" :key="rotacao.id" :value="rotacao.id">
                {{ rotacao.shift }} (Vagas: {{ rotacao.vacant }})
              </option>
            </select>
        </div>
      </div>

      <label class="section-label">Informações do Preceptor</label>
      <div class="form-group">
        <div class="group">
          <label for="nome-preceptor">Nome do preceptor <span class="required">*</span></label>
          <input type="text" id="nome-preceptor" v-model="form.nomePreceptor" required>
        </div>
         <div class="group">
          <label for="area-atuacao">Área de Atuação do Preceptor</label>
          <input type="text" id="area-atuacao" v-model="form.areaAtuacaoPreceptor" placeholder="Ex: Enfermagem, Fisioterapia...">
        </div>
      </div>
      <div class="form-group">
         <div class="group">
            <label for="registro-conselho">Número de registro do Conselho</label>
            <input type="text" id="registro-conselho" v-model="form.registroConselho">
         </div>
         <div class="group"></div> </div>
      

      <label class="section-label">Relação de Alunos</label>
      <div class="form-group">
        <div class="group-list">
          <div class="aluno-header">
            <label>Adicionar Alunos <span class="required">*</span></label>
            <span v-if="form.modalidade === 'estagio'" class="helper-text">
              <span v-if="form.rotationId">
                Limite de {{ vagasDoTurnoSelecionado }} vagas. ({{ form.alunos.length }} / {{ vagasDoTurnoSelecionado }})
              </span>
              <span v-else>
                Selecione um turno para ver o limite de vagas.
              </span>
            </span>
          </div>

          <div v-for="(aluno, index) in form.alunos" :key="index" class="aluno-group">
            <input type="text" v-model="aluno.nome" placeholder="Nome Completo do Aluno" required>
            <input type="text" v-model="aluno.cpf" placeholder="CPF do Aluno" required>
            <button type="button" @click="removerAluno(index)" class="btn-remove" title="Remover Aluno">✖</button>
          </div>
          <button 
            type="button" 
            @click="adicionarAluno" 
            class="btn-secondary" 
            :disabled="isAdicionarAlunoDisabled"
            title="Adicionar novo aluno à lista">
              Adicionar Aluno
          </button>
        </div>
      </div>
      
      <button type="submit" class="btn-primary" >Enviar Solicitação</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import HeaderIE from '../components/HeaderIE.vue';
import { fetchEquipments } from '../services/api';

const router = useRouter();


const diasSemanaOptions = [
  { text: 'Dom', value: 'domingo' },
  { text: 'Seg', value: 'segunda' },
  { text: 'Ter', value: 'terca' },
  { text: 'Qua', value: 'quarta' },
  { text: 'Qui', value: 'quinta' },
  { text: 'Sex', value: 'sexta' },
  { text: 'Sáb', value: 'sábado' },
];

const form = reactive({
  curso: '',
  disciplina: '',
  semestre: '',
  modalidade: '',
  unidadeSaudeId: '',
  departmentId: '',
  dataInicio: '',
  dataFim: '',
  diasSemana: [],
  dataUnica: '',
  rotationId: '',
  nomePreceptor: '',
  areaAtuacaoPreceptor: '',
  registroConselho: '',
  alunos: [{ nome: '', cpf: '' }] 
});

const datasCalculadas = computed(() => {
  return []; // evita erro ao mostrar as datas enquanto não fizer o cálculo real
});

watch(() => form.modalidade, (novaModalidade) => {
  if (novaModalidade === 'estagio') {
    form.dataUnica = '';
  } else {
    form.dataInicio = '';
    form.dataFim = '';
    form.diasSemana = [];
  }
});

const dataMinimaPermitida = computed(() => {
  const hoje = new Date();
  hoje.setDate(hoje.getDate() + 15);
  
  return hoje.toISOString().split('T')[0];
});

watch(() => form.dataInicio, (novaDataInicio) => {
  if (form.dataFim && novaDataInicio > form.dataFim) {
    form.dataFim = '';
  }
});

const unidadesDeSaude = ref([]);


const buscarUnidadesDeSaude = async () => {
  try {
    const response = await fetchEquipments(); 
    unidadesDeSaude.value = response;
  } catch (error) {
    alert('Não foi possível carregar as unidades de saúde.');
    console.error('Erro ao buscar unidades de saúde:', error);
  }
};


const setoresDisponiveis = computed(() => {
  if (!form.unidadeSaudeId) return [];

  const unidadeSelecionada = unidadesDeSaude.value.find(
    unidade => unidade.id === form.unidadeSaudeId
  );

  return unidadeSelecionada ? unidadeSelecionada.Departments : [];
});

watch(() => form.unidadeSaudeId, () => { form.departmentId = ''; });

const rotacoesDisponiveis = computed(() => {
  if (!form.departmentId) return [];
  
  const setorSelecionado = setoresDisponiveis.value.find(
    setor => setor.id === form.departmentId
  );
  return setorSelecionado ? setorSelecionado.Rotations : [];
});

watch(() => form.departmentId, () => { form.rotationId = ''; });

const vagasDoTurnoSelecionado = computed(() => {
  if (!form.rotationId) return 0;
  const rotacaoSelecionada = rotacoesDisponiveis.value.find(rotacao => rotacao.id === form.rotationId);
  return rotacaoSelecionada ? rotacaoSelecionada.vacant : 0;
});


const isAdicionarAlunoDisabled = computed(() => {
  
  if (form.modalidade !== 'estagio') {
    return false; 
  }
  
  
  if (!form.rotationId || vagasDoTurnoSelecionado.value === 0) {
    return true;
  }
  
  
  return form.alunos.length >= vagasDoTurnoSelecionado.value;
});


const adicionarAluno = () => {
  form.alunos.push({ nome: '', cpf: '' });
};

const removerAluno = (index) => {
  if (form.alunos.length > 1) { 
    form.alunos.splice(index, 1);

  } else {
    
    form.alunos[index] = { nome: '', cpf: '' };
    alert('É necessário ter pelo menos um aluno na solicitação. Os dados do aluno foram limpos.');
  }
};


onMounted(() => {
  buscarUnidadesDeSaude(); 
});


const submitForm = () => {
  if (form.modalidade === 'estagio' && form.alunos.length > vagasDoTurnoSelecionado.value) {
    alert(`Erro: O número de alunos (${form.alunos.length}) excede o número de vagas (${vagasDoTurnoSelecionado.value}) para este estágio.`);
    return;
  }
  console.log('Formulário enviado:', form);
  alert("Solicitação enviada com sucesso!");
  router.push('/regular-management');
};

const voltarPagina = () => {
  router.back(); 
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
