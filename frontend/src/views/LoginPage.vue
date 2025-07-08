<template> 
    <title>Solicita - Login</title>
    <HeaderHome />
    <div class="container">
        <HeaderHome />
        <div class="content">
          <h1>Facilitando<br> a prática, <br> ampliando o <br> aprendizado</h1>
          <p>Um sistema inovador projetado para simplificar o processo de solicitação de práticas de ensino. Destinado a coordenadores e instituições de ensino, o sistema facilita a gestão dos pedidos, permitindo o acompanhamento de status e aprovações, promovendo uma experiência mais eficiente e organizada.</p>
        </div>
        <form @submit.prevent="login" class="login-box">
            <h1>Acesse o Sistema</h1>
            <p>Utilize suas credenciais cadastradas para acessar o sistema.</p>
            <div class="fields">
                <label for="cpf">CPF</label>
                <input v-model="cpf" type="cpf" id="cpf" placeholder="Digite seu CPF" required />
            </div>
            <div class="fields">
                <label for="password">Senha</label>
                <input v-model="password" type="password" id="password" placeholder="Digite sua senha" required />
            </div>
            <div class="forgot-password">
                Não possui cadastro? <a href="#" @click="goToSingUp">Clique aqui e cadastre-se</a>
            </div>
            <div class="forgot-password">
                Esqueceu a senha? <a href="#" @click.prevent="showModal = true">Solicitar recuperação</a>
            </div>
            <br>
            <button type="submit" class="btn-primary">Entrar</button>
        </form>
        
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showModal = false">&times;</span>
                <h2>Recuperação de Senha</h2>
                <form @submit.prevent="handleSubmit">
                    <label for="recovery-email">E-mail</label>
                    <input type="email" id="recovery-email" v-model="recoveryEmail" placeholder="Digite seu e-mail" required />
                    <button type="submit" class="btn-primary">Enviar</button>
                </form>
            </div>
        </div>

        <div v-if="showErrorModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showErrorModal = false">&times;</span>
                <h2>Erro</h2>
                <p>{{ errorMessage }}</p>
                <button class="btn-primary" @click="showErrorModal = false">Fechar</button>
            </div>
        </div>

    </div>
</template>

<script setup>

import { ref } from "vue";
import { loginUser } from "../services/api.js"
import { useRouter } from "vue-router";
import HeaderHome from "../components/HeaderHome.vue";

const router = useRouter();
const cpf = ref('');
const password = ref();
const showModal = ref(false); 
const recoveryEmail = ref('');
const errorMessage = ref('');
const showErrorModal = ref(false);

const login = async () => {
    try {
        const data = await loginUser(cpf.value, password.value);
        console.log('Login bem-sucedido:', data);
        const { token, role } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
            router.push("/admin-management");
        } else {
            router.push("/regular-management");
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
            showErrorModal.value = true; 
        } else {
            errorMessage.value = "Erro ao tentar fazer login. Tente novamente.";
            showErrorModal.value = true;
        }
        console.error('Erro no login:', error)
    }
};



const handleSubmit = () => {
    alert(`E-mail de recuperação enviado para: ${recoveryEmail.value}`);
    showModal.value = false;
};
const goToSingUp = () => {
    router.push("/register")
};
</script>

<style scoped>
    h1 {
        color: #000;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 1500px;
        width: 100%;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .content {
    max-width: 700px;
    margin-top: 130px;
    margin-left: 100px;
}

    .content h1 {
        margin-top: 50px;
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
    .login-box {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        color: #000000;
        padding: 50px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 350px;
        gap: 10px;
        align-items: center;
    }
    .fields {
        width: 100%;
        height: 30px;
        padding: 5px;
        margin-bottom: 30px;
    }
    .login-box h1 {
        font-size: 28px;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .login-box p {
        font-size: 10px;
        color: #555;
        margin-bottom: 30px;
        margin-top: -10px;  
    }
    .login-box label {
        font-size: 13px;
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: left;
    }
    .login-box input {
        width: 100%;
        height: 30px;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #002855;
        border-radius: 5px;
        font-size: 11px;
    }
    .forgot-password {
        font-size: 15px;
        font-weight: bold;
        align-self: center;
    }
    .forgot-password a {
        color: #f7981d;
        text-decoration: none;
    }
    .forgot-password a:hover {
        text-decoration: underline;
    }
    .cadastro {
        font-size: 15px;
        font-weight: bold;
        align-self: center;
        padding-left: 10px;
    }
    .cadastro a {
        color: #f7981d;
        text-decoration: none;
    }
    .cadastro a:hover {
        text-decoration: underline;
    }
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }
    .modal-content h2 {
        margin-bottom: 30px; /* Adiciona espaço abaixo do título */
    }
    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
    .modal-content form {
        display: flex;
        flex-direction: column;
        align-items: center; 
        width: 100%;
    }
    .modal-content input {
        width: 50%;
        height: 30px;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #002855;
        border-radius: 5px;
        font-size: 11px;
    }
    .modal-content label {
        font-size: 13px;
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        text-align:right; /* centraliza a esquerda */
        padding-right: 200px;
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    /* Layout para telas grandes */
@media (min-width: 900px) {
    .container {
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .login-box {
        margin-top: 120px;
        margin-left: 400px;
    }
}
</style>
