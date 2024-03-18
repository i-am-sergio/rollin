import UserModel from "../models/UserModel";
import CourseModel from "../models/CourseModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  extractCourses,
  getInfoConstancia,
  validateData,
} from "../services/FileService";
import { Request, Response } from "express";

const JWTKEY: string = process.env.JWTKEY ?? "MERN";

// Register new user.
export const registerUser = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const { cui, email, name, lastname, password, role } = req.body;
  console.log("Datos del usuario:", req.body); // Registro de consola para verificar los datos del usuario
  console.log("Archivo PDF adjunto:", req.file); // Registro de consola para verificar el archivo PDF adjunto
  // Verificar si el usuario ya existe por su CUI o correo electrónico
  try {
    const existingUser = await UserModel.findOne({ cui });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe" });
  } catch (error : any) {
    return res.status(500).json({ message: error.message });
  }

  // Manejar el archivo PDF (constancia) adjunto
  if (req.file) {
    // Verificar los datos del archivo PDF utilizando la función validateData
    const pdfPath = req.file.path;
    const items = await getInfoConstancia(pdfPath);
    const isValid = await validateData(items, lastname + " " + name, cui);
    if (!isValid) {
      console.log("Los datos del archivo PDF no son válidos");
      return res
        .status(400)
        .json({ message: "Los datos del archivo PDF no son válidos" });
    }
    const extractedCourses = await extractCourses(items); // Extraer los cursos del PDF
    // Crear un nuevo usuario con los datos proporcionados y los cursos extraídos del PDF
    const newUser = new UserModel({
      cui,
      email,
      name,
      lastname,
      password,
      role,
      courses: extractedCourses,
    });
    // Guardar el nuevo usuario en la base de datos
    try {
      const user = await newUser.save();
      const token = jwt.sign(
        { cui: user.cui, id: user._id },
        JWTKEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ user, token });
    } catch (error : any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    console.log("Se requiere adjuntar una constancia en formato PDF");
    return res
      .status(400)
      .json({ message: "Se requiere adjuntar una constancia en formato PDF" });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { cui, password } = req.body;
  try {
    const user = await UserModel.findOne({ cui: cui }); // Buscar por cui
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Contraseña incorrecta");
      } else {
        const userCourseNames = user.courses;
        // Filtrar los cursos de la base de datos cuyos nombres estén en la lista de nombres de cursos del usuario
        const filteredCourses = await CourseModel.find({
          name: { $in: userCourseNames },
          labs: { $ne: [] },
        });
        console.log("FILTER:", filteredCourses);

        const token = jwt.sign(
          { cui: user.cui, id: user._id },
          JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, filteredCourses, token });
      }
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  } catch (err : any) {
    res.status(500).json(err);
  }
};
