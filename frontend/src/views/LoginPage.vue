<template> 
    <HeaderHome />
    <div class="container">
        <div class="illustration">
            <img src="../assets/image 9 (Traced).png" alt="Ilustração">
        </div>
        <div class="login-box">
            <h1>Acesse o Sistema</h1>
            <p>Utilize suas credenciais cadastradas para acessar o sistema.</p>
            <label for="email">E-mail / CPF</label>
            <input type="email" id="email" placeholder="Digite seu e-mail ou CPF" />
            <label for="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" />
            <div class="forgot-password">
                Esqueceu a senha? <a href="#">Solicitar recuperação</a>
            </div>
            <br>
            <button class="btn-primary">Entrar</button>
        </div>
    </div>
</template>

<script setup>
import HeaderHome from "../components/HeaderHome.vue"

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
            background: #ffffff;
            color: #000;
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
            gap:  
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
            background-color: #001f3f;
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
</style>