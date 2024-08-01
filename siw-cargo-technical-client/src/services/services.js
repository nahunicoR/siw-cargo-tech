import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/usuarios';

export const register = async (payload) => {
    const request = await axios.post(`${apiUrl}/registro`, payload);
    const data = await request.data;
    return data;
}

export const login = async (payload) => {
    const request = await axios.post(`${apiUrl}/login`, payload);
    const { data } = request;
    return data;
}

export const updateUser = async (payload) => {
    const request = await axios.put(`${apiUrl}/actualizar-usuario`, payload);
    const { data } = request;
    return data;
}

export const getFacturas = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const request = await axios.get(`${apiUrl}/facturas`, config);
    const { data } = request;
    return data;
}