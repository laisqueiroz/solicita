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
          <input type="text" id="curso" v-model="form.course" required>
        </div>
        <div class="group">
          <label for="disciplina">Disciplina <span class="required">*</span></label>
          <input type="text" id="disciplina" v-model="form.subject" required>
        </div>
      </div>
      
      <div class="form-group">
        <div class="group">
           <label for="semestre">Semestre Letivo <span class="required">*</span></label>
           <input type="text" id="semestre" v-model="form.period" placeholder="Ex: 2025.1" required>
        </div>
         <div class="group">
            <label for="modalidade">Modalidade da Ação <span class="required">*</span></label>
            <select id="modalidade" v-model="form.modality" required>
              <option value="" disabled>--Selecione--</option>
              <option value="ESTÁGIO">ESTÁGIO</option>
              <option value="VISITA TÉCNICA">VISITA TÉCNICA</option>
              <option value="AULA PRÁTICA">AULA PRÁTICA</option>
              <option value="AÇÃO DE EXTENSÃO">AÇÃO DE EXTENSÃO</option>
            </select>
            
        </div>
      </div>

      <label class="section-label">Informações da Ação de Ensino</label>
      <div class="form-group">
        <div class="group">
          <label for="unidade-saude">Unidade de Saúde <span class="required">*</span></label>
          <select id="unidade-saude" v-model="form.equipmentId" required>
            <option value="" disabled>Selecione a Unidade</option>
            <option v-for="unidade in equipments" :key="unidade.id" :value="unidade.id">
              {{ unidade.name }}
            </option>
          </select>
        </div>
        <div class="group">
          <label for="setor">Setor da Unidade <span class="required">*</span></label>
          <select 
            id="setor" 
            v-model="form.departmentId" 
            :disabled="!form.equipmentId"
          >
            <option value="" disabled>
              {{ form.equipmentId ? 'Selecione o Setor' : 'Selecione uma unidade primeiro' }}
            </option>
            <option v-for="departamento in setoresDisponiveis" :key="departamento.id" :value="departamento.id">
              {{ departamento.nameDepartment }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="form-group" v-if="form.modality === 'ESTÁGIO'">
        <div class="group">
          <label for="data-inicio">Data de Início <span class="required">*</span></label>
          <input 
            type="date" 
            id="data-inicio" 
            v-model="datesForm.dataInicio" 
            :min="dateMinimum"
            required
          >
        </div>
        <div class="group">
          <label for="data-fim">Data de Término (opcional)</label>
          <input 
            type="date" 
            id="data-fim" 
            v-model="datesForm.dataFim" 
            :min="datesForm.dataInicio" 
            :disabled="!datesForm.dataInicio"
          >
        </div>
      </div>

      <div class="form-group" v-else-if="form.modality">
        <div class="group">
          <label for="data-unica">Data da Atividade <span class="required">*</span></label>
          <input 
            type="date" 
            id="data-unica" 
            v-model="datesForm.dataUnica"
            :min="dateMinimum"
            required
          >
        </div>
        <div class="group"></div> 
      </div>

      <div class="form-group">
        <div class="group-select" v-if="form.modality === 'ESTÁGIO'">
          <label>Dias da semana <span class="required">*</span></label>
          <div class="checkbox-group">
            <div v-for="dia in weekdaysOptions" :key="dia.value" class="checkbox-item">
              <input type="checkbox" :id="'dia-' + dia.value" :value="dia.value" v-model="datesForm.diasSemana">
              <label :for="'dia-' + dia.value">{{ dia.text }}</label>
            </div>
            <span v-if="datesCalculate.length > 0" class="helper-text-dark">
              Total de dias de atividade calculados: {{ datesCalculate.length }}.
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
          <input type="text" id="nome-preceptor" v-model="form.preceptorName" required>
        </div>
         <div class="group">
          <label for="area-atuacao">Área de Atuação do Preceptor</label>
          <input type="text" id="area-atuacao" v-model="form.rolePreceptor" placeholder="Ex: Enfermagem, Fisioterapia...">
        </div>
      </div>
      <div class="form-group">
         <div class="group">
            <label for="registro-conselho">Número de registro do Conselho</label>
            <input type="text" id="registro-conselho" v-model="form.councilRegistration">
         </div>
         <div class="group"></div> </div>
      

      <label class="section-label">Relação de Alunos</label>
      <div class="form-group">
        <div class="group-list">
          <div class="aluno-header">
            <label>Adicionar Alunos <span class="required">*</span></label>
            <span v-if="form.modality === 'ESTÁGIO'" class="helper-text">
              <span v-if="form.rotationId">
                Limite de {{ vagasDoTurnoSelecionado }} vagas. ({{ form.relation.length }} / {{ vagasDoTurnoSelecionado }})
              </span>
              <span v-else>
                Selecione um turno para ver o limite de vagas.
              </span>
            </span>
          </div>

          <div v-for="(relation, index) in form.relation" :key="index" class="aluno-group">
            <input type="text" v-model="relation.name" placeholder="Nome Completo do Aluno" required>
            <input type="text" v-model="relation.cpf" placeholder="CPF do Aluno" required>
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
import { fetchEquipments, createSolicitation } from '../services/api';

const router = useRouter();

const weekdaysOptions = [
  { text: 'Dom', value: 'domingo' },
  { text: 'Seg', value: 'segunda' },
  { text: 'Ter', value: 'terca' },
  { text: 'Qua', value: 'quarta' },
  { text: 'Qui', value: 'quinta' },
  { text: 'Sex', value: 'sexta' },
  { text: 'Sáb', value: 'sabado' },
];

const form = reactive({
  course: '',
  subject: '',
  period: '',
  modality: '',
  equipmentId: '',
  departmentId: '',
  date: [],
  rotationId: '',
  preceptorName: '',
  rolePreceptor: '',
  councilRegistration: '',
  relation: [{ name: '', cpf: '' }]
});

const datesForm = reactive({
  dataInicio: '',
  dataFim: '',
  dataUnica: '',
  diasSemana: []
});

const dateMinimum = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 15);
  return today.toISOString().split('T')[0];
});

const datesCalculate = computed(() => {
  if (
    form.modality !== 'ESTÁGIO' ||
    !datesForm.dataInicio ||
    !datesForm.dataFim ||
    datesForm.diasSemana.length === 0
  ) return [];

  const diasSemanaMap = {
    domingo: 0,
    segunda: 1,
    terca: 2,
    quarta: 3,
    quinta: 4,
    sexta: 5,
    sabado: 6
  };

  const inicio = new Date(datesForm.dataInicio);
  const fim = new Date(datesForm.dataFim);
  const result = [];

  for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    const nameDay = Object.keys(diasSemanaMap).find(k => diasSemanaMap[k] === day);
    if (datesForm.diasSemana.includes(nameDay)) {
      result.push(new Date(d).toISOString().split('T')[0]);
    }
  }

  return result;
});

watch(
  [() => form.modality, () => datesCalculate.value, () => datesForm.dataUnica],
  () => {
    if (form.modality === 'ESTÁGIO') {
      form.date = [...datesCalculate.value];
    } else if (datesForm.dataUnica) {
      form.date = [datesForm.dataUnica];
    } else {
      form.date = [];
    }
  },
);

watch(() => form.modality, (novaModalidade) => {
  if (novaModalidade === 'ESTÁGIO') {
    datesForm.dataUnica = '';
  } else {
    datesForm.dataInicio = '';
    datesForm.dataFim = '';
    datesForm.diasSemana = [];
    form.date = [];
  }
});

watch(() => datesForm.dataInicio, (novaDataInicio) => {
  if (datesForm.dataFim && novaDataInicio > datesForm.dataFim) {
    datesForm.dataFim = '';
  }
});

const equipments = ref([]);

const fetchAllEquipments = async () => {
  try {
    const response = await fetchEquipments(); 
    equipments.value = response;
  } catch (error) {
    alert('Não foi possível carregar as unidades de saúde.');
    console.error('Erro ao buscar unidades de saúde:', error);
  }
};

const setoresDisponiveis = computed(() => {
  if (!form.equipmentId) return [];
  const unidadeSelecionada = equipments.value.find(
    unidade => unidade.id === form.equipmentId
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
  if (form.modality !== 'ESTÁGIO') return false;
  if (!form.rotationId || vagasDoTurnoSelecionado.value === 0) return true;
  return form.relation.length >= vagasDoTurnoSelecionado.value;
});

const adicionarAluno = () => {
  form.relation.push({ name: '', cpf: '' });
};

const removerAluno = (index) => {
  if (form.relation.length > 1) { 
    form.relation.splice(index, 1);
  } else {
    form.relation[index] = { name: '', cpf: '' };
    alert('É necessário ter pelo menos um aluno na solicitação. Os dados do aluno foram limpos.');
  }
};

const submitForm = async () => {
  if (form.modality === 'ESTÁGIO' && form.relation.length > vagasDoTurnoSelecionado.value) {
    alert(`Erro: O número de alunos (${form.relation.length}) excede o número de vagas (${vagasDoTurnoSelecionado.value}) para este estágio.`);
    return;
  }
  try {
    await createSolicitation(form);
  
    alert("Solicitação enviada com sucesso!");
    router.push('/regular-management');
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao enviar a solicitação.');
  }
};

const voltarPagina = () => {
  router.back(); 
};

onMounted(() => {
  fetchAllEquipments(); 
});
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
