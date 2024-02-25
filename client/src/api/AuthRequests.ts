import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const logIn = (formData : any) => API.post("/auth/login", formData);

export const signUp = (formData : any) => API.post("/auth/register", formData);
