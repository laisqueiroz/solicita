<template>
    <title>Solicitação de Cadastro</title>
    <HeaderHome/>
    <main class="main-container">
        <div class="ilustracao">
            <img id="imagem" src="../assets/image 12 (Traced).png" width="500">
        </div>
        <div class="form-container">
            <div class="form-titulos">
                <h2>Realizar Solicitação de Acesso</h2>
                <p>Preencha todas as informações abaixo para realizar sua solicitação de acesso <br>ao sistema. Em caso
                    de dúvidas <a href="#" class="faq-link"><b>consultar FAQ</b></a> ou entrar em <a href="#" class="faq-link"><b>contato.</b></a></p>
                <br>
                <h5 class="dados-pessoais">Dados pessoais</h5>
            </div>
            <form>
                <div class="form-row">
                    <div class="form-group">
                        <label for="nome">Nome Completo</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo">
                    </div>
                    <div class="form-group">
                        <label for="date">Data de nascimento</label>
                        <input type="date" name="date">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu email">
                    </div>
                    <div class="form-group">
                        <label for="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF">
                    </div>
                </div>

                <div class="form-group">
                    <label for="funcao-cargo">Função/cargo</label>
                    <input type="text" id="funcao-cargo" name="funcao-cargo"
                        placeholder="Digite a função/cargo que você exerce na Instituição.">
                </div>

                <div class="form-group">
                    <h5 class="dados-instituicao">Dados da Instituição de Ensino Credenciada*</h5>
                    <p class="info-credenciamento">*Instituições de Ensino que não estejam com o credenciamento <br> ativo
                        terão as solicitações de acesso negadas.</p>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="CNPJ">CNPJ</label>
                        <input type="text" id="CNPJ" name="CNPJ" placeholder="Digite o CNPJ da Instituição">
                    </div>

                    <div class="form-group">
                        <label for="instituicao">Nome da Instituição</label>
                        <select id="instituicao" name="instituicao">
                            <option value="" disabled selected>Selecione a Instituição</option>
                            <option value="UFC">UFC</option>
                        </select>
                    </div>
                </div>

                <h5 class="dados-acesso">Dados de Acesso</h5>

                <div class="form-row">
                    <div class="form-group">
                        <label for="senha">Senha</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha">
                    </div>
                    <div class="form-group">
                        <label for="senha-confirm">Confirmar senha</label>
                        <input type="password" id="senha-confirm" name="senha-confirm" placeholder="Confirme a senha">
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit">Enviar Solicitação</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script setup>
import HeaderHome from '../components/HeaderHome.vue';
</script>

<style>
    .main-container {
        display: flex;
        align-items: center;
        padding: 64px 164px;
    }

    .ilustracao {
        margin-right: 120px;
    }

    .form-container {
        background-color: #ffffff;
        color: #000000;
        padding: 40px;
         padding-top: 20px;
        border-radius: 10px;
        width: 500px;
        margin: 10px auto 32px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .form-titulos h2 {
        font-family: Inter, sans-serif;
        font-size: 28px;
        text-align: center;
    }

    .form-titulos p {
        font-family: Inter, sans-serif;
        font-size: 11px;
        text-align: center;
        margin-top: -20px;
    }

    .faq-link {
        color: #f7981d;
    }

    .dados-pessoais, .dados-instituicao, .dados-acesso {
        color: #0e2e4a;
        text-align: left;
        font-family: Inter, sans-serif;
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

    .form-group input, .form-group select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .form-group input[type="date"] {
    flex: 1;
    }
    .form-group input:focus, .form-group select:focus {
        border: 2px solid #0e2e4a;
        outline: none;
    }

    .form-group button {
        padding: 6px 10px;
        background-color: #0e2e4a;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 13px;
        display: block;
        margin: 0 auto;
        margin-top: 15px;
    }
    .form-group button:hover {
        background-color: #0c273e;
    }
    .form-group input[type="date"] {
        width: 150px;
    }
    .faq-link {
        color: #f7981d; /* Cor laranja */
        text-decoration: none; /* Remover o sublinhado padrão */
    }
    .faq-link:hover {
     text-decoration: underline; /* Adiciona o sublinhado quando passar o cursor */
    }

</style>
