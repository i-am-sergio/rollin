import axios from "axios";

const API = axios.create({ baseURL: "https://p9xvtnz0-5000.brs.devtunnels.ms" });

export const getLabs = () => API.get("/labs");
export const createLab = (newLab: any) => API.post("/labs", newLab);
export const deleteLab = (id: string) => API.delete(`/labs/${id}`);