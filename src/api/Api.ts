import axios from "axios";
import { LoginData, ProductsData } from "@/Interface/interface";
import { NoiseAwareOutlined } from "@mui/icons-material";

const apiURL = 'https://api.escuelajs.co/api/v1';

export const loginUser = async (data: LoginData) => {
    const response = await axios.post(`${apiURL}/auth/login`,data);
    return response.data;
}

const storeApiURL = 'https://fakestoreapi.com';

export const getProducts = async ()=> {
    const response = await axios.get(`${storeApiURL}/products`)
    return response;
}

export const getProductById = async (id: number) => {
    const response = await axios.get(`${storeApiURL}/products/${id}`);
    return response;
}

export const getCategory = async () => {
    const response = await axios.get(`${storeApiURL}/products/categories`)
    return response;
}

export const getProductByCategory  = async (category: string) => {
    const response = await axios.get(`${storeApiURL}/products/category/${category}`);
    return response;
}