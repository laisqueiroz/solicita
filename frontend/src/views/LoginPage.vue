<template> 
    <div class="container">
        <HeaderHome />
        <div class="illustration">
            <img src="../assets/image 9 (Traced).png" alt="Ilustração">
        </div>
        <form class="login-box">
            <h1>Acesse o Sistema</h1>
            <p>Utilize suas credenciais cadastradas para acessar o sistema.</p>
            <label for="email">E-mail / CPF</label>
            <input type="email" id="email" placeholder="Digite seu e-mail ou CPF" required />
            <label for="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" required />
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderHome from "../components/HeaderHome.vue"

const showModal = ref(false);
const recoveryEmail = ref('');

const handleSubmit = () => {
    alert(`Uma mensagem foi enviada para o seu e-mail (${recoveryEmail.value}) com instruções para redefinição de senha. Por favor, verifique sua caixa de entrada.`);
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
    background-color: #ffffff;
    color: #000000;
    padding: 40px;
    padding-top: 60px;
    padding-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 350px;
    height: 390px;
    text-align: center;
    position: relative;
    left: 140px;
    gap: 10px; 
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

.login-box button {
    padding: 6px 10px;
    background-color: #002855;
    color: white;
    margin: 0 auto;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}

.login-box button:hover {
    background-color: #52606d;
}

.forgot-password {
    font-size: 10px;
    text-align: right;
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

/* Estilo para o botão */
.modal-content .btn-primary {
    text-align: left;
    padding: 6px 10px;
    background-color: #002855;
    color: white;
    margin: 0 auto;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease; /* Adiciona a transição para a animação */
}

/* Estilo para o efeito de animação ao passar o mouse */
.modal-content .btn-primary:hover {
    background-color: #52606d; /* Cor de fundo ao passar o mouse */
}


.modal-content form {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza os itens no modal */
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
