import axios from "axios";
import { LoginData } from "@/Interface/interface";

const apiURL = 'https://api.escuelajs.co/api/v1';

export const loginUser = async (data: LoginData) => {
    const response = await axios.post(`${apiURL}/auth/login`,data);
    return response.data;
}