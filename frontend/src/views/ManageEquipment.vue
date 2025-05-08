<template>
  <div class="container">
    <title>Gerenciar Equipamentos</title>
    <HeaderAdmin />

    <section class="header-tabela">
      <button class="btn-no-filling-primary" @click="voltarPagina">&#8592;</button>
      <h2>Gerenciar Equipamentos</h2>
      <div class="button-container">
        <button class="btn-secondary" type="button" @click="abrirModal('adicionar')">
          &plus; Equipamento
        </button>
      </div>
    </section>

    <form class="tabela">
      <div class="list">
        <div v-for="(equipment, index) in equipments" :key="index" class="equipment-card">
          <div class="card-info">
            <h3>{{ equipment.name }}</h3>
            <div v-for="(rotation, rIndex) in equipment.Rotations" :key="rIndex">
              <p><strong>Turno:</strong> {{ rotation.shift }} <strong>Vagas:</strong> {{ rotation.vacant }}</p>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn-primary" type="button" @click="abrirModal('editar', index)"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-no-filling-remove" type="button" @click="removerEquipment(index)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h3>{{ modoEdicao ? "Editar Equipamento" : "Novo Equipamento" }}</h3>

        <form @submit.prevent="modoEdicao ? salvarEdicao() : adicionarEquipment()">
          <label for="name">Nome do Equipamento:</label>
          <input type="text" id="name" v-model="equipmentAtual.name" :disabled="modoEdicao" required />

          <div v-for="(rotation, index) in equipmentAtual.Rotations" :key="index">
            <label :for="'shift' + index">Turno:</label>
            <input type="text" :id="'shift' + index" v-model="rotation.shift" required />

            <label :for="'vacant' + index">Vagas:</label>
            <input type="number" :id="'vacant' + index" v-model="rotation.vacant" required />
          </div>

          <button type="button" @click="adicionarTurno">Adicionar Turno</button>

          <div class="modal-buttons">
            <button class="btn-primary" type="submit">{{ modoEdicao ? "Salvar" : "Adicionar" }}</button>
            <button class="btn-no-filling-remove" type="button" @click="fecharModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderAdmin from '../components/HeaderAdmin.vue';
import { fetchEquipments, createEquipment } from "../services/api";
import { useRouter } from 'vue-router';

const router = useRouter();
const isModalOpen = ref(false);
const modoEdicao = ref(false);
const indexEdicao = ref(null);
const equipments = ref([]);

const equipmentAtual = ref({
  name: '',
  Rotations: [{ shift: '', vacant: 0 }]
});

onMounted(async () => {
  const data = await fetchEquipments();
  equipments.value = data;
});

const abrirModal = (modo, index = null) => {
  if (modo === 'editar' && index !== null) {
    modoEdicao.value = true;
    indexEdicao.value = index;
    equipmentAtual.value = { ...equipments.value[index], Rotations: [...equipments.value[index].Rotations] };
  } else {
    modoEdicao.value = false;
    equipmentAtual.value = { name: '', Rotations: [{ shift: '', vacant: 0 }] };
  }
  isModalOpen.value = true;
};

const fecharModal = () => {
  isModalOpen.value = false;
};

const adicionarTurno = () => {
  equipmentAtual.value.Rotations.push({ shift: '', vacant: 0 });
};

const adicionarEquipment = async () => {
  await createEquipment(equipmentAtual.value);
  fetchEquipments();
  fecharModal();
};

const salvarEdicao = async () => {
  if (indexEdicao.value !== null) {
    await updateEquipment(equipments.value[indexEdicao.value].id, equipmentAtual.value);
    equipments.value[indexEdicao.value] = { ...equipmentAtual.value };
  }
  fecharModal();
};

const removerEquipment = async (index) => {
  const equipmentId = equipments.value[index].id;
  await deleteEquipment(equipmentId);
  equipments.value.splice(index, 1);
};

const voltarPagina = () => {
  router.push('/gestao-admin');
};
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

.tabela {
  width: 700px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* === Título e Botão de Adicionar === */
.header-tabela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.header-tabela h2 {
  font-size: 24px;
  font-weight: bold;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}

.modal label {
  font-weight: bold;
  text-align: left;
  display: block;
}

.modal input,
.modal select {
  width: auto;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.modal div input {
    display: flex;
    width: 95%;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.list {
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.equipment-card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-info h3 {
  margin: 0;
  font-size: 18px;
  text-align: left;
}

.card-info p {
  margin: 5px 0;
  font-size: 14px;
  text-align: left;
}

.card-actions {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.valido {
  color: green;
  font-weight: bold;
}

.vencido {
  color: red;
  font-weight: bold;
}
</style>