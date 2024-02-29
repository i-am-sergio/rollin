import axios from "axios";

const API = axios.create({ baseURL: "https://p9xvtnz0-5000.brs.devtunnels.ms" });

export const logIn = (formData : any) => API.post("/auth/login", formData);

export const signUp = (formData : any) => API.post("/auth/register", formData);
