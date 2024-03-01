import axios from "axios";

const URL = "http://localhost:5000";
//"https://p9xvtnz0-5000.brs.devtunnels.ms" ||
const API = axios.create({ baseURL: URL });

export const getAllCourses = () => API.get("/course");
