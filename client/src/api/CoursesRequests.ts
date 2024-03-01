import axios from "axios"

const URL = "https://p9xvtnz0-5000.brs.devtunnels.ms" || "http://localhost:5000" 

const API = axios.create({ baseURL: URL});

export const getAllCourses = () => API.get("/course");