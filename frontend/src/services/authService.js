// Função para verificar se o usuário está autenticado
export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null;
}
  
export function getUserRole() {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role;
    }
    return null;
}
  
export function logout() {
    localStorage.removeItem("token");
}