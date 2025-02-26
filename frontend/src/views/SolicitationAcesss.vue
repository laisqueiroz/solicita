<template>
    <title>Solicitações de Práticas</title>
    <HeaderAdmin/>
    <div class="table">
      <h1>Solicitações de Práticas</h1>
      <TableComponent :columns="columns" :data="data" @verMais="abrirModal"/>
    </div>
    <div v-if="modalAberto" class="modal-overlay">
    <div class="modal">
      <button @click="fecharModal" class="close">&times;</button>
      <h2>Detalhes da Solicitação</h2>
      <p><strong>Nome:</strong> {{ solicitacaoSelecionada.name }}</p>
      <p><strong>CPF:</strong> {{ solicitacaoSelecionada.cpf }}</p>
      <p><strong>Cargo/Função:</strong> {{ solicitacaoSelecionada.position }}</p>
      <p><strong>Instituição:</strong> {{ solicitacaoSelecionada.institutionId }}</p>
      <p><strong>Status:</strong> {{ solicitacaoSelecionada.status }}</p>
      <div class="modal-actions">
        <button @click="liberarAcesso" class="approve">Liberar Acesso</button>
        <button @click="negarAcesso" class="negate">Negar Acesso</button>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
      import { ref, onMounted } from "vue";
      import TableComponent from "../components/TableComponent.vue";
      import HeaderAdmin from "../components/HeaderAdmin.vue";
      const columns = ref([
        { label: "Nome", field: "name" },
        { label: "CPF", field: "cpf" },
        { label: "Cargo/Função", field: "position" },
        { label: "Instituição", field: "institutionId" },
        { label: "Status", field: "status" },
      ]);
      const data = ref([]);
      const modalAberto = ref(false);
      const solicitacaoSelecionada = ref({});
      onMounted(async () => {
        //const response = await fetch("http://localhost:3000/");
        //data.value = await response.json();
        data.value = [
        {
            "name": "Carlos Eduardo Lima",
            "cpf": "123-456-789.00",
            "position": "Professor Titular",
            "institutionId": "Universidade Estadual do Rio de Janeiro",
            "status": "Em análise"
        },
        {
            "name": "Mariana Souza Ferreira",
            "cpf": "987-654-321.11",
            "position": "Coordenadora de Estágio",
            "institutionId": "Universidade de São Paulo",
            "status": "Em análise"
        },
        {
            "name": "Rafael Mendes Oliveira",
            "cpf": "456-789-123.22",
            "position": "Diretor Acadêmico",
            "institutionId": "Universidade Federal de Minas Gerais",
            "status": "Em análise"
        },
        {
            "name": "Fernanda Costa Andrade",
            "cpf": "789-123-456.33",
            "position": "Coordenadora de Curso",
            "institutionId": "Universidade Federal do Rio Grande do Sul",
            "status": "Em análise"
        },
        {
            "name": "Luciano Pereira Santos",
            "cpf": "321-654-987.44",
            "position": "Professor Adjunto",
            "institutionId": "Universidade Federal do Ceará",
            "status": "Em análise"
        }
        ]
    });
      const abrirModal = (solicitacao) => {
      solicitacaoSelecionada.value = solicitacao;
      modalAberto.value = true;
    };
    const fecharModal = () => {
      modalAberto.value = false;
    };
    const liberarAcesso = () => {
      alert(`Acesso liberado para ${solicitacaoSelecionada.value.name}`);
      fecharModal();
    };
    const negarAcesso = () => {
      alert(`Acesso negado para ${solicitacaoSelecionada.value.name}`);
      fecharModal();
    };
  </script>
  
  <style scoped>
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      position: relative;
      width: 400px;
    }
    .modal-actions {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .modal-actions button {
      padding: 10px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      flex: 1;
      text-align: center;
    }
    button.approve {
      background: green;
      color: white;
    }
    button.negate {
      background: red;
      color: white;
    }
    button.close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: black;
    }
  </style>
