import {
  getInfoConstancia,
  extractCourses,
  validateData,
} from "../services/FileService.js";

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
};

// upload file
export const uploadFile = async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const items = await getInfoConstancia(pdfPath);
    const isValid = await validateData(items, req.body.full_name, req.body.cui);
    if (!isValid) {
      res.status(400).send("Los datos no son válidos");
      return;
    }
    const extractedCourses = await extractCourses(items);
    res.send(extractedCourses);
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).send("Error interno del servidor");
  }
};
