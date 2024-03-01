import axios from "axios";

const URL = "http://localhost:5000";

const API = axios.create({ baseURL: URL });

export const logIn = (formData: any) => API.post("/auth/login", formData);

export const signUp = (formData: any) => API.post("/auth/register", formData);
