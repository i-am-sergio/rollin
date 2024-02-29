import axios from "axios"

const API = axios.create({ baseURL: "https://p9xvtnz0-5000.brs.devtunnels.ms" });

export const getAllCourses = () => API.get("/course");