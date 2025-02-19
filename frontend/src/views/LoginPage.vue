<template> 
    <title>Solicita - Login</title>
    <HeaderHome />
    <div class="container">
        <div class="illustration">
            <img src="../assets/image 9 (Traced).png" alt="Ilustração">
        </div>
        <div class="login-box">
            <h1>Acesse o Sistema</h1>
            <p>Utilize suas credenciais cadastradas para acessar o sistema.</p>
            <div id="divlogin">
                <label for="email">E-mail / CPF</label>
                <input v-model="cpf" type="email" id="email" required placeholder="Digite seu e-mail ou CPF" />
            </div>
            <div id="divlogin">
                <label for="password">Senha</label>
                <input v-model="password" type="password" id="password" required placeholder="Digite sua senha" />
            </div>
            <div class="forgot-password">
                Esqueceu a senha? <a href="#">Solicitar recuperação</a>
            </div>
            <br>
            <div id="erroMessage">
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
            <button class="btn-primary" @click="login">Entrar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { loginUser } from "../services/api.js"
import { useRouter } from "vue-router";
import HeaderHome from "../components/HeaderHome.vue";

const router = useRouter();
const cpf = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
    errorMessage.value = '' 

    if (!cpf.value || !password.value) {
        errorMessage.value = 'Preencha todos os campos!'
        return
    }
    try {
        const data = await loginUser(cpf.value, password.value)
        console.log('Login bem-sucedido:', data)
        const { token, role } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
            router.push("/gestao-admin");
        } else {
            router.push("/gestao-ie");
        }
        // Aqui você pode armazenar o token e redirecionar para outra página, se necessário
    } catch (error) {
        errorMessage.value = error
        console.error('Erro no login:', error)
    }
}

</script>

<style scoped>
h1 {
    color: #000;
}

#erroMessage p {
    color: #C20000;
    font-size: 0.8em;
}
        .container {
            display: flex;
            justify-content: space-around;
            gap: 200px;
            width: 90%;
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
            background: #ffffff;
            color: #000;
            padding: 40px;
            padding-top: 60px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            width: 350px;
            height: 390px;
            left: 140px; 
            align-items: center;
        }

        .login-box h1 {
            text-align: center;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .login-box p {
            text-align: center;
            font-size: 10px;
            color: #555;
            margin-bottom: 30px;
            margin-top: -10px;  
        }

        .login-box label {
            text-align: left;
            font-size: 13px;
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            text-align: left;
            padding-left: 10px;
        }

        .login-box button:hover {
            background-color: #f7981d;
            color: #ffffff;
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
        .login-box #divlogin {
            width: 100%;
            padding: 5px;
        }

        .forgot-password {
            align-self: flex-end;
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
</style>