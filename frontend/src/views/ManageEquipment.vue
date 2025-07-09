<template>
  <title>Gerenciar Equipamentos</title>
  <HeaderAdmin />
  <div class="container">

    <!--CABEÇALHO DA PÁGINA-->
    <section class="header-table">
      <button class="btn-no-filling-primary">←</button>
      <h2>Gerenciar Equipamentos</h2>
      <button class="btn-primary" @click="isModalOpen = true">&plus; Equipamento</button>
    </section>

    <!--LISTA DE EQUIPAMENTOS, SETORES E VAGAS-->
    <section class="list-table">
      <div v-for="(equipment, index) in equipments" :key="index">
        <div class="card-equipment">
          <div class="info-equipment">
            <h3>{{ equipment.name }}</h3>
            <p>{{ equipment.address }}</p>
          </div>

          <div class="actions-buttons">
            <button class="btn-primary" type="button" @click="idEquipment = (idEquipment === equipment.id ? null : equipment.id)">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn-no-filling-remove" type="button" @click="excludeEquipemnt(equipment.id, equipment.name)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div v-if="idEquipment === equipment.id" class="expand-equipment">
          <div class="section-department">
            <div v-for="(departmentItem) in equipment.Departments" :key="departmentItem.id" class="list-department">
              <h4>{{ departmentItem.nameDepartment }}</h4>

              <div class="actions-buttons">
                <button class="btn-primary" type="button" @click="editionDepartment(departmentItem, 'department')">
                  <i class="fa-solid fa-pen"></i>
                </button>

                <button @click="excludeDepartment(departmentItem.id)" class="btn-no-filling-remove" type="button">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <form @submit.prevent="addDepartment(equipment.id)" v-if="addMode === 'NewDepartment'" style="display: flex; flex-direction: column; align-items: flex-start;">
              <label>Nome do Setor:</label>
              <input type="text" v-model="NewDepartment.nameDepartment" style="width: 100%;" required />
              <span class="buttons-modal">
                <button class="btn-primary">Salvar</button>
                <button class="btn-no-filling-remove" @click="addMode = null">Cancelar</button>
              </span>
            </form>

            <div style="align-self: flex-end;">
              <button type="button" class="btn-no-filling-sec" @click="addMode = 'NewDepartment'" :disabled="addMode === 'NewDepartment'">
                Adicionar Setor
              </button>
            </div>
          </div>

          <div v-if="editionMode === 'department'" class="section-rotation">
            <h4 style="align-self: center;">Gerenciar Setor: {{ department.nameDepartment }}</h4>
            <div v-if="department !== null" v-for="(rotation, rotationIndex) in department.Rotations" :key="rotationIndex" class="list-rotations">
              <label :for="'shift'">Turno:</label>
              <select :id="'shift'" v-model="rotation.shift" @change="markRotationAsEdited(rotationIndex)" style="height: 30px; padding: 6px 8px; border: 2px solid #003366; border-radius: 5px;" required>
                <option disabled value="">Selecione o turno</option>
                <option value="MATUTINO">MATUTINO</option>
                <option value="VESPERTINO">VESPERTINO</option>
                <option value="NOTURNO">NOTURNO</option>
              </select>

              <label :for="'vacant'">Vagas:</label>
              <input type="number" :id="'vacant'" v-model.number="rotation.vacant" @input="markRotationAsEdited(rotationIndex)" style="width: 40px;" required />

              <button type="button" class="btn-no-filling-remove" @click="removeRotation(rotationIndex)">
                <i class="fas fa-trash"></i>
              </button>

              <button v-if="editedRotations.has(rotationIndex)" type="button" class="btn-primary" @click="openConfirmEditModal(rotationIndex)">
                Salvar Alterações
              </button>
            </div>

            <form @submit.prevent="openConfirmRotationModal" v-if="addMode === 'NewRotation'">
              <div class="form-add">
                <label :for="'shift'">Turno:</label>
                <select :id="'shift'" v-model="NewRotation.shift" style="height: 30px; padding: 6px 8px; border: 2px solid #003366; border-radius: 5px;" required>
                  <option disabled value="">Selecione o turno</option>
                  <option value="MATUTINO">MATUTINO</option>
                  <option value="VESPERTINO">VESPERTINO</option>
                  <option value="NOTURNO">NOTURNO</option>
                </select>

                <label :for="'vacant'">Vagas:</label>
                <input type="number" :id="'vacant'" v-model.number="NewRotation.vacant" style="width: 40px;" required />
              </div>

              <div class="buttons-modal">
                <button class="btn-primary">Salvar</button>
                <button class="btn-no-filling-remove" @click="addMode = null">Cancelar</button>
              </div>
            </form>

            <div style="align-self: flex-end;">
              <button type="button" class="btn-no-filling-sec" @click="addMode = 'NewRotation'" :disabled="addMode === 'NewRotation'">
                Adicionar Vaga
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section v-if="isModalOpen" class="overlay-modal" @click.self="isModalOpen = false">
      <div class="modal">
        <h3>Novo Equipamento</h3>
        <form @submit.prevent="addEquipment">
          <label for="name">Nome do Equipamento:</label>
          <input type="text" id="name" v-model="NewEquipment.name" required />

          <label for="address">Endereço:</label>
          <input type="text" id="address" v-model="NewEquipment.address" required />

          <div class="buttons-modal">
            <button type="button" class="btn-no-filling-remove" @click="isModalOpen = false">Fechar</button>
            <button type="submit" class="btn-primary">Adicionar</button>
          </div>
        </form>
      </div>
    </section>

    <!-- MODAL NOVA VAGA -->
    <section v-if="isConfirmRotationModalOpen" class="overlay-modal" @click.self="isConfirmRotationModalOpen = false">
      <div class="modal">
        <h1>Confirme se o turno é {{ pendingRotation.shift }} com {{ pendingRotation.vacant }} vagas</h1>
        <div class="buttons-modal">
          <button class="btn-primary" @click="confirmAddRotation">Confirmar</button>
          <button class="btn-no-filling-remove" @click="cancelAddRotation">Cancelar</button>
        </div>
      </div>
    </section>

    <!-- MODAL DE EDIÇÃO DE VAGA EXISTENTE -->
    <section v-if="confirmEditModalVisible" class="overlay-modal" @click.self="cancelEditRotation">
      <div class="modal">
        <h1 style="color: black;">Confirmação</h1>
        <p style="color: black;">
          Gostaria de atualizar o período para <strong>{{ tempRotationData.shift }}</strong>
          e vagas para <strong>{{ tempRotationData.vacant }}</strong>?
        </p>
        <div class="buttons-modal">
          <button class="btn-primary" @click="confirmEditRotation">Confirmar</button>
          <button class="btn-no-filling-remove" @click="cancelEditRotation">Cancelar</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { ref, onMounted, reactive } from 'vue';
import { fetchEquipments, createEquipment, deleteEquipment, createDepartment, deleteDepartment } from "../services/api";

const equipments = ref([]);
const isModalOpen = ref(false);
const editionMode = ref('');
const idEquipment = ref(null);
const department = ref(null);
const addMode = ref('');

const isConfirmRotationModalOpen = ref(false);
const confirmEditModalVisible = ref(false);

const pendingRotation = reactive({ shift: '', vacant: 0 });
const tempRotationData = reactive({ index: null, shift: '', vacant: 0 });

const editedRotations = ref(new Set());

const NewEquipment = reactive({ name: '', address: '' });
const NewDepartment = reactive({ nameDepartment: '', equipmentId: 0 });
const NewRotation = reactive({ departmentId: 0, shift: '', vacant: 0 });

const addEquipment = async () => {
  try {
    await createEquipment(NewEquipment.name, NewEquipment.address);
    isModalOpen.value = false;
    equipments.value = await fetchEquipments();
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao criar equipamento.');
  }
};

const excludeEquipemnt = async (id, name) => {
  if (!confirm(`Tem certeza que deseja excluir o equipamento "${name}"?`)) return;
  try {
    await deleteEquipment(id);
    equipments.value = await fetchEquipments();
    alert(`Equipamento "${name}" excluído com sucesso!`);
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao criar equipamento.');
  }
};

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
    alert(error?.response?.data?.error || 'Erro inesperado ao criar departamento.');
  }
};

const editionDepartment = (dept, mode) => {
  department.value = dept;
  editionMode.value = mode;
};

const excludeDepartment = async (id) => {
  if (!confirm("Tem certeza que deseja excluir este setor?")) return;
  try {
    await deleteDepartment(id);
    alert('Setor excluído com sucesso!');
    equipments.value = await fetchEquipments();
  } catch (error) {
    alert(error?.response?.data?.error || 'Erro inesperado ao criar departamento.');
  }
};

const removeRotation = (index) => {
  if (!department.value?.Rotations) return;
  department.value.Rotations.splice(index, 1);
};

function openConfirmRotationModal() {
  if (!NewRotation.shift || NewRotation.vacant <= 0) {
    alert("Selecione turno e defina número válido de vagas.");
    return;
  }
  pendingRotation.shift = NewRotation.shift;
  pendingRotation.vacant = NewRotation.vacant;
  isConfirmRotationModalOpen.value = true;
}

function confirmAddRotation() {
  if (!department.value?.Rotations) {
    alert("Nenhum departamento selecionado para adicionar o turno.");
    isConfirmRotationModalOpen.value = false;
    return;
  }
  department.value.Rotations.push({ shift: pendingRotation.shift, vacant: pendingRotation.vacant });
  NewRotation.shift = '';
  NewRotation.vacant = 0;
  isConfirmRotationModalOpen.value = false;
  addMode.value = null;
}

function cancelAddRotation() {
  isConfirmRotationModalOpen.value = false;
}

function markRotationAsEdited(index) {
  editedRotations.value.add(index);
}

function openConfirmEditModal(index) {
  const rot = department.value.Rotations[index];
  tempRotationData.index = index;
  tempRotationData.shift = rot.shift;
  tempRotationData.vacant = rot.vacant;
  confirmEditModalVisible.value = true;
}

function confirmEditRotation() {
  confirmEditModalVisible.value = false;
  editedRotations.value.delete(tempRotationData.index);
  tempRotationData.index = null;
  tempRotationData.shift = '';
  tempRotationData.vacant = 0;
}

function cancelEditRotation() {
  confirmEditModalVisible.value = false;
}

onMounted(async () => {
  equipments.value = await fetchEquipments();
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
  position: relative;
}

.modal>form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0 auto;
}

.modal label {
  width: 90%;
  max-width: 400px;
  font-weight: bold;
  text-align: left;
}

.modal input {
  width: 90%;
  max-width: 400px;
  padding: 8px;
  border: 1px solid #003366;
  border-radius: 5px;
}
.modal h1 {
  color: #000000;
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
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.expand-equipment {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-left: 2px solid #e7e7e7;
  border-right: 2px solid #e7e7e7;
  border-bottom: 2px solid #e7e7e7;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.section-department {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 5px;
  margin-left: 20px;
  width: 45%;
}

.section-rotation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 45%;
  height: 100%;
  padding-right: 20px;
}

.list-rotations {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-rotations>label {
  font-weight: bold;
}

.list-rotations>input {
  height: 20px;
  padding: 5px;
  border: 2px solid #003366;
  border-radius: 5px;
}

.list-department {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

form {
  width: 90%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

form>input {
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

.form-add>input {
  width: auto;
  padding: 8px;
  border: 2px solid #003366;
  border-radius: 5px;
}
</style>