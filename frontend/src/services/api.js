import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
});

export const loginUser = async (cpf, password) => {
    console.log("entrou no service-front");
    try {
        console.log("entrou no try");
        const response = await api.post("/users/login", {cpf, password});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    };
};

export const getAllSolicitations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado!");
      }

      const response = await api.get("/solicitations", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar solicitações.", error);
      throw error; 
    };
};

export const updateSolicitationId = async (id, data) => {
    try {
        await api.put(`/solicitations/${id}`, data);
        console.log('Sucesso');
    } catch (error) {
        console.error(`Erro ao atualizar solicitação com ID ${id}:`, error);
        throw error;
    }
}

export default api;