import axios from "axios";

const URL = "http://localhost:5000";
///"https://p9xvtnz0-5000.brs.devtunnels.ms" ||
const API = axios.create({ baseURL: URL });

export const getLabByCourse = (course: string) => API.get(`/lab/${course}`);
export const createLab = (newLab: any) => API.post("/lab", newLab);
export const deleteLab = (id: string) => API.delete(`/labs/${id}`);
