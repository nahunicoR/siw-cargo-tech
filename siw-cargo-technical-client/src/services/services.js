import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/usuarios';

let token = '';


export const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

export const register = async (payload) => {
    console.log(payload)
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

export const getFacturas = async () => {
    const config = {
        headers: {
            'Authorization': token
        }
    }
    const request = await axios.get(`${apiUrl}/facturas`, config);
    const { data } = request;
    return data;
}