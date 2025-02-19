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
        // tratar os erros
        console.error(error);
        throw error;
    };
};

export default api;