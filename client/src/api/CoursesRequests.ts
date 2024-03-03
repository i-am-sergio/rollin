import axios from "axios";

const URL = "http://localhost:5000";

const API = axios.create({ baseURL: URL });

export const getAllCourses = () => API.get("/course");

//update the course (endpoint: /course/:code)
export const updateCourse = (code:any, updatedCourse:any) => API.put(`/course/${code}`, updatedCourse);