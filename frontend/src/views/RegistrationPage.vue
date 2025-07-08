<template>
    <title>Solicitação de Cadastro</title>
    <HeaderHome />
    <main class="main-container">
        <div class="content">
            <h1>Facilitando<br> a prática, <br> ampliando o <br> aprendizado</h1>
            <p>Um sistema inovador projetado para simplificar o processo de solicitação de práticas de ensino. Destinado
                a coordenadores e instituições de ensino, o sistema facilita a gestão dos pedidos, permitindo o
                acompanhamento de status e aprovações, promovendo uma experiência mais eficiente e organizada.</p>
        </div>
        <div class="form-container">
            <div class="headerForm">
                <h2>Realizar Solicitação de Acesso</h2>
                <p>Preencha todas as informações abaixo para realizar sua solicitação de acesso <br>ao sistema. Em caso
                    de dúvidas <a href="#" class="faq-link"><b>consultar FAQ</b></a> ou entrar em <a href="#"
                        class="faq-link"><b>contato.</b></a></p>
                <br>
                <h5 class="headerData">Dados pessoais</h5>
            </div>
            <form @submit.prevent="submitForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Nome Completo</label>
                        <input type="text" id="name" name="name" v-model="form.name"
                            placeholder="Digite seu nome completo" require>
                    </div>
                    <div class="form-group">
                        <label for="date">Data de nascimento</label>
                        <input type="date" name="date" v-model="form.dateBirth" require>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" v-model="form.email" placeholder="Digite seu email"
                            require>
                    </div>
                    <div class="form-group">
                        <label for="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF" v-model="form.cpf"
                            v-maska="'###.###.###-##'" @blur="validateCPF" require>
                        <span v-if="cpfError" class="error-message">{{ cpfError }}</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="funcao-cargo">Função/cargo</label>
                    <input type="text" id="funcao-cargo" name="funcao-cargo" v-model="form.position"
                        placeholder="Digite a função/cargo que você exerce na Instituição.">
                </div>

                <div class="form-group">
                    <h5 class="headerData">Dados da Instituição de Ensino Credenciada*</h5>
                    <p class="info-credenciamento">*Instituições de Ensino que não estejam com o credenciamento <br>
                        ativo
                        terão as solicitações de acesso negadas.</p>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="CNPJ">CNPJ</label>
                        <input 
                            type="text" 
                            id="CNPJ" 
                            name="CNPJ" 
                            placeholder="Digite o CNPJ da Instituição" 
                            v-model="form.cnpj" 
                            v-maska="'##.###.###/####-##'"
                            @input="fetchInstitution" 
                        required>
                    </div>

                    <div class="form-group">
                        <label for="institution">Nome da Instituição</label>
                        <select id="institution" name="institution" v-model="form.institutionId">
                            <option value="" disabled selected>Selecione a Instituição</option>
                            <option v-for="institution in institutions" :key="institution.id" :value="institution.id">
                                {{ institution.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="agreement">Convênio</label>
                    <div class="agreement-box upload-area" @click="triggerFileInput">
                        <i class="fas fa-upload upload-icon"></i>
                        <p class="upload-text">Clique para enviar o termo de convênio</p>
                        <input type="file" id="agreementFile" ref="fileInput" style="display: none"
                            @change="handleFileUpload">
                    </div>
                </div>

                <h5 class="headerData">Dados de Acesso</h5>

                <div class="form-row">
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha"
                            v-model="form.password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar senha</label>
                        <input type="password" id="confirmPassword" name="confirmPassword"
                            placeholder="Confirme a senha" v-model="form.confirmPassword" @input="equatePassword"
                            required>
                        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn-primary" type="submit">Enviar Solicitação</button>
                </div>
            </form>
        </div>
    </main>
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="showSuccessModal = false">
        <div class="modal-content">
            <h1>Solicitação enviada com sucesso</h1>
            <p>Aguarde avaliação e liberação de acesso feita por um administrador.</p>
            <button @click="showSuccessModal = false" class="btn-primary">Fechar</button>
        </div>
    </div>
    <div v-if="showErrorModal" class="modal-overlay" @click.self="showErrorModal = false">
        <div class="modal-content">
            <h1>Não Foi Possível Concluir o Cadastro</h1>
            <h2>Algo deu errado</h2>
            <p>
                Sua solicitação de acesso não pôde ser concluída neste momento.<br>
                Isso pode ter ocorrido por instabilidade no sistema ou por dados inválidos.
            </p>
            <button @click="showErrorModal = false" class="btn-primary">Fechar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { vMaska } from "maska/vue"
import HeaderHome from '../components/HeaderHome.vue';
import { useRouter } from 'vue-router';
import { fetchInstitutionByCNPJ } from '../services/api';

const router = useRouter();
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const form = ref({
    name: '',
    dateBirth: '',
    email: '',
    cpf: '',
    position: '',
    cnpj: '',
    institutionId: '',
    password: '',
    confirmPassword: ''
});

const cpfError = ref('');
const passwordError = ref('');
const institutions = ref([]);

const validateCPF = () => {
    const cpf = form.value.cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        cpfError.value = 'CPF inválido';
        return false;
    } else {
        cpfError.value = '';
        return true;
    }
};

const equatePassword = () => {
    if (form.value.password !== form.value.confirmPassword) {
        passwordError.value = 'As senhas não coincidem';
        return false;
    }
    passwordError.value = '';
    return true;
}

const fetchInstitution = async () => {
    if (form.value.cnpj.length === 18) {
        try {
            const response = await fetchInstitutionByCNPJ(form.value.cnpj);
            institutions.value = [response];
        } catch (error) {
            alert('Instituição não credenciada. Se acha que é um erro entre em contato.')
            console.error('Erro ao buscar instituição:', error);
        }
    }
};

const submitForm = () => {

    if (validateCPF() && equatePassword()) {
        alert(form.value.institutionName);
        router.push("/");
    }
};

</script>

<style scoped>
.main-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 32px 64px 32px 64px;
    max-width: 1500px;
}

.content {
    max-width: 700px;
    margin-top: 10px;
    margin-left: 100px;
}


.content h1 {
    margin-top: 10px;
    text-align: left;
    font-size: 35px;
    color: #f7981d;
    line-height: 1.2;
    font-weight: bold;
}

.content p {
    color: #fff;
    text-align: left;
    font-size: 18px;
    margin-top: 20px;
    line-height: 1.6;
    padding-right: 100px;
}

.form-container {
    background-color: #ffffff;
    color: #000000;
    padding: 40px;
    padding-top: 20px;
    border-radius: 10px;
    width: 1200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.headerForm h2 {
    font-size: 28px;
    text-align: center;
}

.headerForm p {
    font-size: 11px;
    text-align: center;
    margin-top: -20px;
}

.faq-link {
    color: #f7981d;
}

.headerData {
    color: #0e2e4a;
    text-align: left;
    margin-top: 10px;
}

.info-credenciamento {
    font-size: 12px;
    text-align: left;
    font-family: Inter, sans-serif;
    margin-top: -20px;
}

.form-row {
    display: flex;
    gap: 20px;
    text-align: left;
}

.form-group {
    flex: 1;
    margin-bottom: 15px;
    margin-right: 20px;
    text-align: left;
}

.form-group label {
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;

}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group input[type="date"] {
    flex: 1;
}

.form-group input:focus,
.form-group select:focus {
    border: 2px solid #0e2e4a;
    outline: none;
}

.form-group button {
    display: block;
    margin: 0 auto;
    margin-top: 15px;
    font-weight: bold;
}

.form-group input[type="date"] {
    width: 150px;
}

.faq-link {
    color: #f7981d;
    text-decoration: none;
}

.faq-link:hover {
    text-decoration: underline;
}

.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.agreement-box.upload-area {
    background-color: #f9f9f9;
    border: 2px dashed #ccc;
    border-radius: 5px;
    padding: 40px;
    min-height: 10px;
    max-height: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s ease;
    text-align: center;
}

.upload-icon {
    font-size: 24px;
    color: #999;
}

.upload-text {
    font-size: 13px;
    color: #666;
    font-style: italic;
}

.agreement-box.upload-area:hover {
    border-color: #f7981d;
    background-color: #fffef8;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.modal-content h1 {
    color: #000000;
    margin-bottom: 20px;
}

.modal-content p {
    font-size: 16px;
    margin-bottom: 30px;
    color: #333;
}

.modal-content .btn-primary {
    padding: 10px 25px;
    font-weight: bold;
    cursor: pointer;
    margin: 0 auto;
}

@media (min-width: 900px) {
    .container {
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .form-container {

        margin-left: 50px;
    }
}
</style>
