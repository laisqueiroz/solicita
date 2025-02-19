import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import GestaoAdmin from "../views/GestaoAdmin.vue";
import GestaoIE from "../views/GestaoIE.vue";
import SolicitationsAdmin from "../views/SolicitationsAdmin.vue";
import ViewSolicitation from "../views/ViewSolicitation.vue";
import CadastroPage from "../views/CadastroPage.vue";
import VisualizarSolicitacaoIE from "../views/VisualizarSolicitacaoIE.vue";
import EquipmentAdmin from "../views/EquipmentAdmin.vue";
import InstitutionsAdmin from "../views/InstitutionsAdmin.vue";
import SolicitationAcesss from "../views/SolicitationAcesss.vue";

const routes = [
  { 
    path: "/", 
    component: HomePage 
  },
  { 
    path: "/login", 
    component: LoginPage 
  },
  { 
    path: "/cadastro", 
    component: CadastroPage 
  },

  {
    path: "/gestao-admin",
    component: GestaoAdmin
  },

  {
    path: "/gestao-ie",
    component: GestaoIE
  },

  {
    path: "/solicitations-admin",
    component: SolicitationsAdmin
  },

  {
    path: "/solicitations-admin-view-solicitations",
    component: ViewSolicitation
  },

  {
    path: "/visualizar-solicitacao",
    component: VisualizarSolicitacaoIE
  },

  {
    path: "/equipment-admin",
    component: EquipmentAdmin
  },

  {
    path: "/institutions-admin",
    component: InstitutionsAdmin
  },

  {
    path: "/solicitations-acess-admin",
    component: SolicitationAcesss
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
