import axios from 'axios';

const api = axios.create({
    baseURL: 'https://portal-solicita.onrender.com',
    timeout: 10000,
});
/* FUNÇÕES DE USUÁRIOS */
export const loginUser = async (cpf, password) => {
    try {
        const response = await api.post("/users/login", {cpf, password});
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    };
};

/* FUNÇÕES DE SOLICITAÇÕES */
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

/* FUNÇÕES DE EQUIPAMENTO */
export const createEquipment = async (name, address) => {
    try {
        const response = await api.post("/equipment", {name, address});
        return response.data;
    } catch (error) {
        console.error("Erro ao criar novo equipamento: ", error);
        throw error;
    };
};

export const deleteEquipment = async (id) => {
  try {
    const response = await api.delete(`/equipment/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateEquipment = async (id, address) => {
  try {
    const response = await api.put(`/equipment/${id}`, address);
    return response.data;
  } catch (error) {
    throw error;
  }
}

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
};

export const createInstitution = async (data) => {
  try {
        const response = await api.post("/institutions", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar nova instituição: ", error);
        throw error;
    };
}

export const fetchInstitutions = async () => {
    try {
        const response = await api.get("/institutions", {
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar instituições:", error);
        throw error; 
      };
}

export const fetchInstitutionByCNPJ = async (cnpj) => {
  try {
      const response = await api.get(`/institutions?cnpj=${cnpj}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      throw error; 
    };
}

/* FUNÇÕES DE DEPARTAMENTO */
export const createDepartment = async (data) => {
  try {
    const response = await api.post("/department", data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  };
}

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/department/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* FUNÇÕES DE TURNOS E VAGAS */

export const createRotation = async (rotationData) => {
  try {
    const response = await api.post("/rotations/", rotationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRotation = async (id) => {
  const response = await api.delete(`/rotations/${id}`);
  return response.data;
};


export default api;
