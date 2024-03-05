import axios from "axios";

const URL = "http://localhost:5000";

const API = axios.create({ baseURL: URL });

export const getCourseByCode = (code: string) => API.get(`/matriculate/${code}`);

export const getLabsByCourse = async (code : string) => await API.get(`/matriculate/${code}/labs`);