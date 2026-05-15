import axios, { AxiosResponse } from "axios";
import { LoginData } from "@/Interface/interface";

const apiURL = 'https://api.escuelajs.co/api/v1';
const productAPI = 'https://fakestoreapi.com/products';
const categoryAPI = 'https://fakestoreapi.com/products/categories';

export const loginUser = async (data: LoginData) => {
    const response = await axios.post(`${apiURL}/auth/login`,data);
    return response.data;
}

export const products = async () => {
    try {
        const response = await axios.get(productAPI);
        if (axios.isAxiosError(response)) {
            
            console.error("Products API Error:", response.status);
            return { notFound: true };
        }
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}

export const category = async () => {
    try {
        const response = await axios.get(categoryAPI);
        if (axios.isAxiosError(response)) {
            
            console.error("Categories API Error:", response.status);
            return { notFound: true };
        }
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}