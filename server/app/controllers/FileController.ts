import {
  getInfoConstancia,
  extractCourses,
  validateData,
} from "../services/FileService";
import { Request, Response } from "express";

// get items from pdf
export const getItems = async (req : Request, res : Response) => {
  try {
    const pdfPath = "20210689.pdf";
    const items = await getInfoConstancia(pdfPath);
    const extractedCourses = await extractCourses(items);
    res.send(extractedCourses);
  } catch (error : any) {
    res.status(500).send("Error interno del servidor");
  }
};

// upload file
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const pdfPath = req.file?.path;
    if (!pdfPath) {
      res.status(400).send("No se proporcionó ningún archivo");
      return;
    }
    const items = await getInfoConstancia(pdfPath);
    const isValid = await validateData(items, req.body.full_name, req.body.cui);
    if (!isValid) {
      console.log("Los datos no son válidos");
      res.status(400).send("Los datos no son válidos");
      return;
    }
    const extractedCourses = await extractCourses(items);
    res.send(extractedCourses);
  } catch (error: any) {
    console.error("Error al subir el archivo:", error);
    res.status(500).send("Error interno del servidor");
  }
};