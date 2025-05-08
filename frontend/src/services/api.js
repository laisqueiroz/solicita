import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
});

export const loginUser = async (cpf, password) => {
    try {
        const response = await api.post("/users/login", {cpf, password});
        return response.data;
    } catch (error) {
        console.error(error.message);
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
    };
};

export const createEquipment = async (name, shift, vacant) => {
    try {
        const response = await api.post("/equipment", {name, shift, vacant});
        return response.data;
    } catch (error) {
        console.error("Erro ao criar novo equipamento: ", error);
        throw error;
    };
};

export const fetchEquipments = async () => {
    try {
        /*const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Usuário não autenticado!");
        }*/
  
        const response = await api.get("/equipment", {
          /*headers: {
              Authorization: `Bearer ${token}`,
          },*/
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
        throw error; 
      };
}

export const fetchInstitutions = async () => {
    try {
        /*const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Usuário não autenticado!");
        }*/
  
        const response = await api.get("/institutions", {
          /*headers: {
              Authorization: `Bearer ${token}`,
          },*/
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar instituições:", error);
        throw error; 
      };
}

export const fetchInstitutionByCNPJ = async (cnpj) => {
  try {
      /*const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado!");
      }*/

      const response = await api.get(`/institutions?cnpj=${cnpj}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      throw error; 
    };
}


export default api;