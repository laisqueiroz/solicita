# Portal Solicita

![Status do Projeto](https://img.shields.io/badge/status-pausado-lightgrey)


<p align="center">
  <em>Regulador e gerenciador de práticas de ensino para instituições de saúde e de ensino.</em>
</p>
<br>

## 📜 Sobre o Projeto

O **Portal Solicita** foi desenvolvido para a Secretária Municipal de Saúde de Quixadá-CE com o objetivo de otimizar e centralizar a gestão de práticas de ensino, como estágios, visitas técnicas e ações de extensão.

A plataforma conecta instituições de ensino credenciadas com os equipamentos de saúde do município, permitindo que as solicitações de práticas sejam feitas de forma digital. O sistema realiza validações automáticas de vagas, datas e horários, proporcionando mais **transparência, agilidade e organização** para todo o processo, tanto para os gestores de saúde quanto para os coordenadores das instituições.

## ✨ Funcionalidades Principais

-   🔐 **Autenticação Segura:** Login para administradores (gestores de saúde) e coordenadores (instituições de ensino) com acesso baseado em papéis.
-   📝 **Solicitação de Acesso:** Instituições de ensino podem solicitar seu cadastro no portal através de um formulário, que passa pela aprovação do administrador.
-   🚀 **Envio de Solicitações de Prática:** Coordenadores podem solicitar estágios, visitas técnicas e outras atividades nos equipamentos de saúde cadastrados.
-   📊 **Acompanhamento em Tempo Real:** Painel para que os coordenadores possam acompanhar o status de suas solicitações (pendente, aprovado, negado) e visualizar as justificativas.
-   🏥 **Gerenciamento de Equipamentos Públicos:** O administrador pode cadastrar, editar e remover hospitais, postos de saúde e outros locais aptos a receber estudantes.
-   🎓 **Gerenciamento de Instituições de Ensino:** O administrador gerencia as instituições parceiras que podem utilizar o sistema.
-   📋 **Análise e Decisão:** O administrador possui uma interface completa para analisar cada solicitação, podendo deferi-la ou indeferi-la com uma justificativa formal.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

| Categoria     | Tecnologias                                                                                                                                                                                                                                                                    |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend** | ![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)                                                        |
| **Banco de Dados**| ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)                                                            |
| **Ferramentas** | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=insomnia&logoColor=white)                                                                  |


## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão >= 6.0.0)
-   [Git](https://git-scm.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/laisqueiroz/solicita.git](https://github.com/laisqueiroz/solicita.git)
    ```

2.  Acesse a pasta do projeto:
    ```bash
    cd solicita
    ```  

3.  Instalando as dependências e inciando a aplicação - backend:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

4.  Instalando as dependências e inciando a aplicação - frontend:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```


**Observação:** Este projeto não requer a configuração de variáveis de ambiente (`.env`) para a sua execução básica.

<p align="center">
  <a href="https://solicita-8ctp.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Acessar%20a%20Aplicação-4FC08D?style=for-the-badge&logo=rocket&logoColor=white" alt="Acessar a Aplicação">
  </a>
</p>
