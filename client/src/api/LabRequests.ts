import axios from "axios";

const URL = "http://localhost:5000";

const API = axios.create({ baseURL: URL });

export const getLabByCourse = (course: string) => API.get(`/lab/${course}`);
export const createLab = (newLab: any) => API.post("/lab", newLab);
export const updateLab = (course: string, group: string, updatedLab: any) =>
  API.put(`/lab/${group}/${course}`, updatedLab);
export const deleteLab = (course: string, group: string) =>
  API.delete(`/lab/${group}/${course}`);
