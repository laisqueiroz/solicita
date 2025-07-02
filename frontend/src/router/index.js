import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated, getUserRole } from "../services/authService";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import AdminManagement from "../views/GestaoAdmin.vue";
import RegularManagement from "../views/GestaoIE.vue";
import SolicitationsAdmin from "../views/SolicitationsAdmin.vue";
import ViewSolicitation from "../views/ViewSolicitation.vue";
import RegistrationPage from "../views/RegistrationPage.vue";
import FAQPage from "../views/FAQPage.vue";
import NewSolicitations from "../views/NewSolicitations.vue";
import InstitutionSolicitationView from "../views/InstitutionSolicitationView.vue";
import SolicitationAcesss from "../views/SolicitationAcesss.vue";
import ManageInstitution from "../views/ManageInstitution.vue";
import ManageEquipment from "../views/ManageEquipment.vue";
import TestManageEquipment from "../views/VerMaisVisualizarSolictIE.vue";


const routes = [
  {
    path: "/test",
    component: TestManageEquipment
  },

  // PÁGINA INICIAL
  { 
    path: "/", 
    component: HomePage 
  },
  // PÁGINA DE PERGUNTAS FREQUENTES
  {
    path: "/faq",
    component: FAQPage
  },
  // PÁGINA DE LOGIN
  { 
    path: "/login", 
    component: LoginPage 
  },
  // PÁGINA DE CADASTRO
  { 
    path: "/register", 
    component: RegistrationPage 
  },
  // PÁGINA GESTÃO - ADMIN
  {
    path: "/admin-management",
    component: AdminManagement
  },
  // PÁGINA GESTÃO - USUÁRIOS REGULARES
  {
    path: "/regular-management",
    component: RegularManagement
  },
  // PÁGINA GESTÃO DE SOLICITAÇÕES - ADMIN
  {
    path: "/solicitations-admin",
    component: SolicitationsAdmin
  },
  // PÁGINA VISUALIZAR SOLICITAÇÕES DE PRÁTICAS - ADMIN
  {
    path: "/solicitations-admin-view-solicitations",
    component: ViewSolicitation
  },
  // PÁGINA NOVA SOLICITAÇÃO - USUÁRIOS REGULARES
  {
    path: "/new-solicitation",
    component: NewSolicitations
  },
  // PÁGINA VISUALIZAR SOLICITAÇÕES DE PRÁTICAS - USUÁRIOS REGULARES
  {
    path: "/view-all-solicitations",
    component: InstitutionSolicitationView
  },
  // PÁGINA VISUALIZAR SOLICITAÇÕES DE ACESSO - ADMIN
  {
    path: "/solicitations-acess-admin",
    component: SolicitationAcesss
  },
  // EXCLUIR ESSA PÁGINA? 
  /*{
    path: "/visualizar-solicitacao-VerMais",
    component: ViewInstitutionSolicitationDetails
  },*/
  // PÁGINA GESTÃO DE INSTITUIÇÕES CREDENCIADAS- ADMIN
  {
    path: "/manage-institution",
    component: ManageInstitution
  },
  // PÁGINA GESTÃO DE EQUIPAMENTOS PÚBLICOS 
  {
    path: "/manage-equipment",
    component: ManageEquipment
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userRole = isAuthenticated() ? getUserRole() : null;

  if (requiresAuth && !isAuthenticated()) {
    next("/login");
  } else if (to.meta.role && userRole !== to.meta.role) {
    alert("Você não tem autorização!");
    next("/login");
  } else {
    next();
  }
});
