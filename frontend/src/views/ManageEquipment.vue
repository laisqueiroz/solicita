<template>
  <title>Gerenciar Equipamentos</title>
  <HeaderAdmin />
  <div class="container">

    <!--CABEÇALHO DA PÁGINA-->
    <section class="header-table">
      <button class="btn-no-filling-primary" @click="toBackPage">&#8592;</button>
      <h2>Gerenciar Equipamentos</h2>
      <button class="btn-primary" @click="isModalOpen = true">&plus; Equipamento</button>
    </section>

    <!--LISTA DE EQUIPAMENTOS, SETORES E VAGAS-->
    <section class="list-table">
      <!--LISTA DE EQUIPAMENTOS-->
      <div v-for="(equipment, index) in equipments" :key="index">
        <div class="card-equipment">
          <div class="info-equipment">
            <h3>{{ equipment.name }}</h3>
            <p v-if="!(editionEquipment && idEquipment === equipment.id)">{{ equipment.address }}</p>
            <span v-else>
              <input 
              type="text" 
              id="address" 
              v-model="NewEquipment.address" 
              style="
              height: 20px; 
              width: 600px; 
              margin-top: 15px;
              padding: 5px; 
              border: 2px solid #003366; 
              border-radius: 5px;"
              required />
              <button class="btn-no-filling-remove" type="button" @click="editionEquipment = false">
                Cancelar
              </button>
            </span>
          </div>

          <div class="actions-buttons">
            <!--BOTÃO DE EDIÇÃO-->
            <button v-if="!(editionEquipment && idEquipment === equipment.id)" class="btn-primary" type="button" @click="startEdition(equipment)">
              <i class="fa-solid fa-pen"></i>
            </button>
            <!--BOTÃO DE SALVAR-->
            <button v-else 
            class="btn-primary" 
            type="button" 
            @click="toUpdateEquipment(equipment.id, NewEquipment.address)">
              <i class="fa fa-check"></i>
            </button>
            <button class="btn-no-filling-sec" type="button" @click="toggleViewEquipment(equipment.id); editionMode = null">
              <i v-if="viewEquipment !== equipment.id" class="fa fa-eye"></i>
              <i v-else class="fa fa-eye-slash"></i>
            </button>
            <!--BOTÃO DE EXCLUIR-->
            <button class="btn-no-filling-remove" type="button" @click="excludeEquipemnt(equipment.id, equipment.name)">
              <i class="fas fa-trash"></i>
            </button>
          </div>

        </div>

        <!--SETORES E VAGAS-->
        <div v-if="viewEquipment === equipment.id" class="expand-equipment">
          <div class="section-department">

            <!--LISTA DE SETORES DO EQUIPAMENTO SELECIONADO-->
            <div v-for="(department) in equipment.Departments" :key="department.id" :class="['list-department', { 'editing': selectedDepartmentId === department.id && editionMode === 'department' }]">
              <h4>{{ department.nameDepartment }}</h4>

              <div class="actions-buttons">
                <!--BOTÃO DE EDITAR-->
                <button 
                class="btn-primary" 
                type="button" 
                @click="editionDepartment(department, 'department', department.id)">
                <i v-if="viewDepartment !== department.id" class="fa fa-eye"></i>
                <i v-else class="fa fa-eye-slash"></i>
                </button> 
  
                <!--BOTÃO DE EXCLUIR-->
                <button 
                @click="excludeDepartment(department.id)"
                class="btn-no-filling-remove" 
                type="button"
                >
                <i class="fas fa-trash"></i>
                </button>
              </div>

            </div>

            <!--ADICIONAR NOVO SETOR-->
            <form 
            @submit.prevent="addDepartment(equipment.id)" 
            v-if="addMode === 'NewDepartment'" 
            style=" 
            display: flex; 
            flex-direction: column; 
            align-items: flex-start; "
            class="forms">

              <label>Nome do Setor:</label>
              <input type="text" v-model="NewDepartment.nameDepartment" style= "width: 100%;" required />
              <span class="buttons-modal">
                <button class="btn-primary">Salvar</button>
                <button class="btn-no-filling-remove" @click="addMode = null">Cancelar</button>
              </span>
            </form>

            <div style="align-self: flex-end;">
              <button 
              type="button" 
              class="btn-no-filling-sec" 
              @click="addMode = 'NewDepartment'" 
              :disabled="addMode === 'NewDepartment'">
              Adicionar Setor
            </button>
            </div>
          </div>
          
          <!--LISTA DE TURNOS E VAGAS DO SETOR SELECIONADO-->
          <div v-if="editionMode === 'department'" class="section-rotation">
            <h4 style="align-self: center;">Gerenciar Setor: {{ currentDepartment?.nameDepartment }}</h4>
            <div v-if="currentDepartment !== null" v-for="(rotation, rotationIndex) in currentDepartment.Rotations" :key="rotationIndex" class="list-rotations">
              <label :for="'shift'">Turno:</label>
              <select :id="'shift'" v-model="rotation.shift" style="height: 30px; padding: 6px 8px; border: 2px solid #003366; border-radius: 5px;" required>
                <option disabled value="">Selecione o turno</option>
                <option value="MATUTINO">MATUTINO</option>
                <option value="VESPERTINO">VESPERTINO</option>
                <option value="NOTURNO">NOTURNO</option>
              </select>
  
              <label :for="'vacant'">Vagas:</label>
              <input type="number" :id="'vacant'" v-model.number="rotation.vacant" style="width: 40px;" required />
  
              <button type="button" class="btn-no-filling-remove"  @click="excludeRotation(rotation.id)"><i class="fas fa-trash"></i></button>

            </div>

            <!--ADICIONAR NOVO TURNO E VAGA-->
            <form @submit.prevent="addRotation" v-if="addMode === 'NewRotation'" class="forms">
              <div class="form-add">
                <label :for="'shift'">Turno:</label>
                <select 
                :id="'shift'" 
                v-model="NewRotation.shift" 
                style="height: 30px; padding: 6px 8px; border: 2px solid #003366; border-radius: 5px;" 
                required>
                  <option disabled value="">Selecione o turno</option>
                  <option value="MATUTINO">MATUTINO</option>
                  <option value="VESPERTINO">VESPERTINO</option>
                  <option value="NOTURNO">NOTURNO</option>
                </select>
    
                <label :for="'vacant'">Vagas:</label>
                <input 
                type="number" 
                :id="'vacant'" 
                v-model.number="NewRotation.vacant" 
                style="width: 40px;" 
                required />
              </div>

              <div class="buttons-modal">
                <button class="btn-primary">Salvar</button>
                <button class="btn-no-filling-remove" @click="addMode = null">Cancelar</button>
              </div>
            </form>

            <div style="align-self: flex-end;">
              <button 
              type="button" 
              class="btn-no-filling-sec" 
              @click="addMode = 'NewRotation'" 
              :disabled="addMode === 'NewRotation'">
              Adicionar Vaga
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>


    <!--MODAL: ADICIONAR NOVO EQUIPAMENTO-->
    <section v-if="isModalOpen" class="overlay-modal" @click.self="isModalOpen = false">
      <div class="modal">
        <h3>Novo Equipamento</h3>
        <form @submit.prevent="addEquipment" class="form-modal">

          <label for="name">Nome do Equipamento:</label>
          <input type="text" id="name" v-model="NewEquipment.name" required />

          <label for="address">Endereço:</label>
          <input type="text" id="address" v-model="NewEquipment.address" required />
          
          <div class="buttons-modal">
            <button class="btn-no-filling-remove" @click="isModalOpen = false">Fechar</button>
            <button class="btn-primary">Adicionar</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { ref, onMounted, reactive, computed } from 'vue';
import { 
  fetchEquipments, createEquipment, deleteEquipment, updateEquipment, 
  createDepartment, deleteDepartment,
  createRotation, deleteRotation } from "../services/api";
import { useRouter } from 'vue-router';

const equipments = ref([]);
const isModalOpen = ref(false);
const editionMode = ref('');
const idEquipment = ref(null);
const viewEquipment = ref(null);
const viewDepartment = ref(null);
const addMode = ref('');
const router = useRouter();
const editionEquipment = ref(false);
const selectedDepartmentId = ref(null);


const startEdition = (equipment) => {
  editionEquipment.value = true;
  idEquipment.value = equipment.id;
  NewEquipment.address = equipment.address;
};



const showAlert = (msn) => {
  alert(msn);
};

const toBackPage = () => {
  router.push('/admin-management');
};

const NewEquipment = reactive({
  name: '',
  address: ''
});

const NewDepartment = reactive({
  nameDepartment:  '',
  equipmentId: 0
})

const NewRotation = reactive({
  departmentId: 0,
  shift: '',
  vacant: 0
})

/* FUNÇÕES RELACIONADAS A EQUIPAMENTOS */
const addEquipment = async () => {
  const isConfirm = confirm(`Confirme o nome do Equipamento público: "${NewEquipment.name}", após a criação não será possível editar.`);
  if (!isConfirm) return;
  try {
    await createEquipment(NewEquipment.name, NewEquipment.address);
    isModalOpen.value = false;

    equipments.value = await fetchEquipments();

    NewEquipment.name = '';
    NewEquipment.address = '';

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar equipamento.');
    }
  }
}

const excludeEquipemnt = async (id, name) => {
  const isConfirm = confirm(`Tem certeza que deseja excluir o equipamento "${name}"?`);
  if (!isConfirm) return;
  try {
    await deleteEquipment(id);
    equipments.value = await fetchEquipments(); 
    alert(`Equipamento "${name}" excluído com sucesso!`); 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar equipamento.');
    }
  }
}

const toUpdateEquipment = async (id, address) => {
  const isConfirm = confirm(`Tem certeza que deseja atualizar o endereço para: "${address}"?`);
  if (!isConfirm) {
    editionEquipment.value = false;
    idEquipment.value = null;
    return
  }
  try {
    await updateEquipment(id, {address});
    editionEquipment.value = false;
    idEquipment.value = null;
    equipments.value = await fetchEquipments(); 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Exibe a mensagem do backend
    } else {
      alert('Erro inesperado ao criar equipamento.');
    }
  }
}

/* FUNÇÕES RELACIONADAS A SETOR/DEPARTAMENTO */
const addDepartment = async (id) => {
  if (id !== idEquipment.value) return;
  NewDepartment.equipmentId = id;
  try {
    await createDepartment(NewDepartment);
    equipments.value = await fetchEquipments();

    addMode.value = null;
    NewDepartment.nameDepartment = '';
    NewDepartment.equipmentId = null;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar departamento.');
    }
  }
}

const editionDepartment = (array, value, id) => {
  selectedDepartmentId.value = id;
  editionMode.value = value;
  viewDepartment.value = id;
}

const currentDepartment = computed(() => {
  if (!viewEquipment.value || !selectedDepartmentId.value) return null;

  const equipment = equipments.value.find(eq => eq.id === viewEquipment.value);
  if (!equipment) return null;

  return equipment.Departments.find(dep => dep.id === selectedDepartmentId.value) || null;
});

const toggleViewEquipment = (id) => {
  viewEquipment.value = viewEquipment.value === id ? null : id;
};

const excludeDepartment = async (id) => {
  const confirmacao = confirm("Tem certeza que deseja excluir este setor?");
  if (!confirmacao) return;

  try {
    await deleteDepartment(id);
    alert('Setor excluído com sucesso!');
    equipments.value = await fetchEquipments();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar departamento.');
    }
  }
}

/* FUNÇÕES RELACIONADAS A TURNOS E VAGAS */

const addRotation = async () => {
  try {
    if (!currentDepartment.value?.id) {
      alert('Erro: setor inválido.');
      return;
    }

    NewRotation.departmentId = currentDepartment.value.id; 

    await createRotation(NewRotation); 

    alert('Turno e Vagas criados com sucesso!');
    equipments.value = await fetchEquipments(); 

    NewRotation.shift = '';
    NewRotation.vacant = 0;
    NewRotation.departmentId = 0;

    addMode.value = null; 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
    } else {
      alert('Erro inesperado ao criar departamento.');
    }
  }
}

const excludeRotation = async (rotationId) => {
  const confirmDelete = confirm('Tem certeza que deseja excluir este turno/vaga?');
  if (!confirmDelete) return;

  try {
    await deleteRotation(rotationId);
    alert('Turno/Vaga excluído com sucesso!');

    equipments.value = await fetchEquipments();

  } catch (error) {
    console.log(error);
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    } else {
      alert('Erro inesperado ao excluir turno/vaga.');
    }
  }
};

onMounted(async () => {
  const data = await fetchEquipments();
  equipments.value = data;
});

</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  padding-top: 80px;
}

.header-table {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  border-radius: 12px;
  padding: 5px 20px;
}

.list-table {
  background-color: #fff;
  width: 70%;
  margin-top: 10px;
  border-radius: 10px;
  padding: 20px;
}

.card-equipment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.info-equipment {
  text-align: left;
}

.actions-buttons {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.overlay-modal {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 700px;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
}

.section-rotation {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  height: 40px;
  column-gap: 10px;
}

.buttons-modal {
  display: flex;
  justify-content: space-between;
}

.expand-equipment {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-left: 2px solid #003366;
  border-right: 2px solid #003366;
  border-bottom: 2px solid #003366;
}

.section-department {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 5px;
  margin-left: 20px;
  width: 45%;
  padding-top: 20px;
}

.section-rotation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 45%;
  height: auto;
  padding: 10px 20px;
}

.list-rotations {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-rotations > label {
  font-weight: bold;
}

.list-rotations > input {
  height: 20px;
  padding: 5px;
  border: 2px solid #003366;
  border-radius: 5px;
}

.list-department {
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.forms {
  width: 90%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.forms > input {
  width: 90%;
  padding: 8px;
  border: 2px solid #003366;
  border-radius: 5px;
}

.form-add {
  font-weight: bold;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  column-gap: 10px;
}

.form-add > input {
  width: auto;
  padding: 8px;
  border: 2px solid #003366;
  border-radius: 5px;
}

.form-modal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}

.form-modal > label {
  text-align: left;
  font-weight: bold;
}

.form-modal > input {
  width: auto;
  padding: 8px;
  border: 1px solid #003366;
  border-radius: 5px;
}

.editing {
  background-color: #ECEFF1;
}
</style>