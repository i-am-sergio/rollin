import axios from "axios"

const URL = "https://p9xvtnz0-5000.brs.devtunnels.ms" || "http://localhost:5000"

const API = axios.create({ baseURL: URL })

export const getLabs = () => API.get("/lab")
export const createLab = (newLab: any) => API.post("/lab", newLab)
export const deleteLab = (id: string) => API.delete(`/labs/${id}`)