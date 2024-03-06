import axios from "axios";

const URL = "http://localhost:5000";

const API = axios.create({ baseURL: URL });

export const getCourseByCode = (code: string) => API.get(`/matriculate/${code}`);

export const getLabsByCourse = async (code : string) => await API.get(`/matriculate/${code}/labs`);

export const matriculateInLab = (cui: string, course: string, group: string) => API.post(`/matriculate/${cui}/${course}/${group}`);