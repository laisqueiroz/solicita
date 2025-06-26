<template>
  <title>Gerenciar Equipamentos</title>
  <HeaderAdmin />
  <div class="container">

    <!--CABEÇALHO DA TABELA-->
    <section class="header-table">
      <button class="btn-no-filling-primary">&#8592;</button>
      <h2>Gerenciar Equipamentos</h2>
      <button class="btn-primary" @click="openModal">&plus; Equipamento</button>
    </section>

    <!--TABELA-->
    <section class="list-table">
      <div v-for="(equipment, index) in equipments" :key="index" class="card-equipment">
        <div class="info-equipment">
          <h3>{{ equipment.name }}</h3>
            <p>{{ equipment.address }}</p>
        </div>
        <div class="actions-buttons">
          <button class="btn-primary" type="button" @click="openModal('editionEquipment', equipment.id)">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-no-filling-remove" type="button">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </section>

    <!--MODAL-->
    <section v-if="isModalOpen" class="overlay-modal" @click.self="closeModal">
      <div class="modal">
        <h3>{{ editionMode ? "Editar Equipamento" : "Adicionar Equipamento" }}</h3>
        <form @submit.prevent="editionMode ? saveEdition() : addEquipment()">

          <label for="name">Nome do Equipamento:</label>
          <input type="text" id="name" v-model="currentEquipment.name" :disabled="editionMode" required />

          <label for="address">Endereço:</label>
          <input type="text" id="address" v-model="currentEquipment.address" required />

          <div v-for="(department, departmentIndex) in currentEquipment.Departments" :key="departmentIndex" class="section-department">
            <label :for="'nameDepartment' + departmentIndex">Nome do Setor:</label>
            <input type="text" :id="'nameDepartment' + departmentIndex" v-model="department.nameDepartment" required />

            <div v-for="(rotation, rotationIndex) in department.Rotations" :key="rotationIndex" class="section-rotation">
                <label :for="'shift' + departmentIndex + '-' + rotationIndex">Turno:</label>
                <input type="text" :id="'shift' + departmentIndex + '-' + rotationIndex" v-model="rotation.shift" required />

                <label :for="'vacant' + departmentIndex + '-' + rotationIndex">Vagas:</label>
                <input type="number" :id="'vacant' + departmentIndex + '-' + rotationIndex" v-model.number="rotation.vacant" required />

              <button type="button" class="btn-no-filling-remove"><i class="fas fa-trash"></i></button>
            </div>

            <div>
              <button type="button" class="btn-primary">Adicionar Turno</button>
  
              <button type="button" class="btn-no-filling-remove">Remover Setor</button>
            </div>

          </div>

          <div>
            <button type="button" class="btn-primary" >Adicionar Setor</button>
          </div>
          
          <div class="buttons-modal">
            <button class="btn-remove" @click="closeModal">Fechar</button>
            <button class="btn-primary">{{ editionMode ? "Salvar" : "Adicionar" }}</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { ref, onMounted, reactive } from 'vue';
import { fetchEquipments } from "../services/api";

const equipments = ref([]);
const isModalOpen = ref(false);
const editionMode = ref(false);
const indexEquipmen = ref(null);


const currentEquipment = reactive({
  name: '',
  Departments: [{
    nameDepartment: '',
    Rotations: [{
      shift: '',
      vacant: 0
    }]
  }],
});


onMounted(async () => {
  const data = await fetchEquipments();
  equipments.value = data;
});

const openModal = (mode, index = null) => {
  if (mode === 'editionEquipment' && index !== null) {
    editionMode.value = true;
    indexEquipmen.value = index;

    const equipmentSelect = equipments.value.find(e => e.id === index);

    if (equipmentSelect) {
      Object.assign(currentEquipment, {
        name: equipmentSelect.name,
        address: equipmentSelect.address,
        Departments: equipmentSelect.Departments.map(dep => ({
          nameDepartment: dep.nameDepartment,
          Rotations: dep.Rotations.map(rot => ({
            shift: rot.shift,
            vacant: rot.vacant
          }))
        }))
      });
    }
  } else {
    editionMode.value = false;
    Object.assign(currentEquipment, {
      name: '',
      address: '',
      Departments: [{
        nameDepartment: '',
        Rotations: [{
          shift: '',
          vacant: 0
        }]
      }]
    });
  }
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
}

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

.modal > form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}

.modal label {
  text-align: left;
  font-weight: bold;
}

.modal input {
  width: auto;
  padding: 8px;
  border: 1px solid #003366;
  border-radius: 5px;
}

.section-department {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 5px;
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
  justify-content: space-around;
  margin-top: 15px;
}


</style>