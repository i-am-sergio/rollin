import { getInfoConstancia, extractCourses } from "../services/FileService.js";

// get items from pdf
export const getItems = async (req, res) => {
    try {
        const pdfPath = "20210689.pdf";
        const items = await getInfoConstancia(pdfPath);
        const extractedCourses = await extractCourses(items);
        res.send(extractedCourses);
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
}

// upload file
export const uploadFile = async (req, res) => {
    try {
        const pdfPath = req.file.path;
        const items = await getInfoConstancia(pdfPath);
        const extractedCourses = await extractCourses(items);
        res.send(extractedCourses);
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
}