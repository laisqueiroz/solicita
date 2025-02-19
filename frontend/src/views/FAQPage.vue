<template>
    <title>Contatos</title>
    <HeaderComponent />
    <div class="container">
        
        <!-- Quadro da esquerda -->
        <div class="box">
            <h2 class="title-highlight">PERGUNTAS FREQUENTES</h2>

            <div v-for="(item, index) in faqList" :key="index">
                <p class="question" @click="toggleQuestion(index)">
                    <strong>{{ item.pergunta }}</strong>
                </p>
                <p v-show="activeIndex === index" class="answer">
                    {{ item.resposta }}
                </p>
            </div>
        </div>

        <!-- Quadro da direita -->
        <div class="box">
            <h2 class="title-highlight">CONTATOS</h2>
            <p><strong>Email:</strong> contato@empresa.com</p>
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
            <p><strong>Endereço:</strong> Rua Exemplo, 123 - Centro, Cidade/UF</p>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderComponent from "../components/HeaderHome.vue";

// Lista de perguntas e respostas
const faqList = ref([
    {
        pergunta: "O QUE É O PORTAL SOLICITA?",
        resposta: "O Portal Solicita é um sistema que permite às instituições de ensino solicitarem práticas de ensino nas unidades de saúde vinculadas à Secretaria de Saúde. Ele facilita o acompanhamento das solicitações e a comunicação entre as instituições e a secretaria."
    },
    {
        pergunta: "QUEM PODE SOLICITAR ACESSO AO PORTAL?",
        resposta: "Somente instituições de ensino credenciadas na prefeitura podem ter acesso ao portal. Após o credenciamento, o administrador do sistema adicionará a instituição e os usuários responsáveis poderão se cadastrar."
    },
    {
        pergunta: "O QUE SIGNIFICA CADA STATUS DE SOLICITAÇÃO?",
        resposta: "Aguardando Análise: A solicitação foi enviada e está sendo avaliada pela Secretaria de Saúde. Deferida: A solicitação foi aprovada e o estágio pode ser realizado. Indeferida: A solicitação foi recusada. Veja os motivos no sistema e, se possível, ajuste e reenvie. Cancelada: O próprio usuário cancelou a solicitação antes da análise."
    },
    {
        pergunta: "O QUE FAZER CASO MINHA SOLICITAÇÃO SEJA NEGADA?",
        resposta: "Se sua solicitação for indeferida, o sistema informará o motivo. Você pode entrar em contato com a Secretaria de Saúde para mais esclarecimentos ou refazer a solicitação corrigindo as pendências indicadas."
    },
    {
        pergunta: "POSSO CANCELAR UMA SOLICITAÇÃO?",
        resposta: "Sim, somente no caso de solicitações indeferidas o cancelamento não pode ocorrer. Caso sua solicitações tenha sido aprovada, porém não será realizada e/ou cumprida você pode cancelar, lembrando que o ato do cancelamento acarreta na perca da solicitação de forma definitiva."
    }
]);

// Estado para controlar qual pergunta está ativa
const activeIndex = ref(null);

// Alternar a exibição da resposta ao clicar
const toggleQuestion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
    width: 100%;
    margin: 0 auto;
}

/* Estilo dos quadros */
.box {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: left;
}

/* Destaca os títulos com fundo laranja */
.title-highlight {
    color: #003366; /* Texto branco */
    border-radius: 6px;
    display: inline-block; /* Mantém o tamanho do texto */
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
}

/* Estiliza as perguntas */
.question {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background: #fff; /* Fundo branco */
    border: 1px solid #ddd; /* Borda cinza */
    border-radius: 6px; /* Cantos arredondados */
    transition: background 0.3s ease, color 0.3s ease;
}

.question:hover {
    background: #003366; /* Cinza mais escuro no hover */
    color: #fff; /* Azul ao passar o mouse */

}

/* Estiliza as respostas */
.answer {
    margin-bottom: 15px;
    font-size: 14px;
    color: #333;
    line-height: 1.4;
}
</style>
