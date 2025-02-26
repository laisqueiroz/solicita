<template>
    <title>Contatos</title>
    <HeaderComponent />
    <div class="container">
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
        <div class="box">
            <h2 class="title-highlight">CONTATOS</h2>
            <p><strong>Email:</strong> contato@empresa.com</p>
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
            <p><strong>Endereço:</strong> Rua Exemplo, 123 - Centro, Cidade/UF</p>
        </div>
    </div>
    <FooterIllustration />
</template>

<script setup>
    import { ref } from "vue";
    import HeaderComponent from "../components/HeaderHome.vue";
    import FooterIllustration from "../components/FooterIllustration.vue"
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

const activeIndex = ref(null);
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
    .box {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 8px;
        background-color: white;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        width: 400px;
        text-align: left;
    }
    .title-highlight {
        color: #003366;
        border-radius: 6px;
        display: inline-block; 
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .question {
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        background: #fff; 
        border: 1px solid #ddd; 
        border-radius: 6px; 
        transition: background 0.3s ease, color 0.3s ease;
    }
    
    .question:hover {
        background: #003366; 
        color: #fff; 
    
    }
    .answer {
        margin-bottom: 15px;
        font-size: 14px;
        color: #333;
        line-height: 1.4;
    }
</style>
