<template> 
    <title>Solicita - Login</title>
    <HeaderHome />
    <div class="container">
        <HeaderHome />
        <div class="illustration">
            <img src="../assets/image 9 (Traced).png" alt="Ilustração">
        </div>
        <form class="login-box">
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
                Esqueceu a senha? <a href="#" @click.prevent="showModal = true">Solicitar recuperação</a>
            </div>
            <br>
            <button type="button" class="btn-primary" @click="login">Entrar</button>
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

const login = async () => {
    try {
        const data = await loginUser(cpf.value, password.value);
        console.log('Login bem-sucedido:', data);
        const { token, role } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
            router.push("/gestao-admin");
        } else {
            router.push("/gestao-ie");
        }

    } catch (error) {
        errorMessage.value = error
        console.error('Erro no login:', error)
    }
};

const handleSubmit = () => {
    alert(`E-mail de recuperação enviado para: ${recoveryEmail.value}`);
    showModal.value = false;
};
</script>

<style scoped>
h1 {
    color: #000;
}
.container {
    display: flex;
    gap: 200px;
    max-width: 1100px;
    width: 100%;
}


.illustration img {
    max-width: 450px;
    height: auto;
    position: relative;
    left: 140px; 
}

.login-box {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: #000000;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 350px;
    height: 390px;
    position: relative;
    left: 140px;
    gap: 10px; 
    align-items: center;
}

.fields {
    align-self: flex-start;
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
    padding-left: 10px;
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
    font-weight: bold;
    align-self: flex-end;
}

.forgot-password a {
    color: #f7981d;
    text-decoration: none;
}

.forgot-password a:hover {
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

</style>
