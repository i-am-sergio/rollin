import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { extractCourses, getInfoConstancia, validateData } from "../services/FileService.js";

// Register new user.
export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;

    const { cui, email, name, lastname, password, role } = req.body;

    // Verificar si el usuario ya existe por su CUI o correo electrónico
    try {
        const existingUser = await UserModel.findOne({ cui });
        if (existingUser)
            return res.status(400).json({ message: "El usuario ya existe" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
    // Manejar el archivo PDF (constancia) adjunto
    if (req.file) {
        // Verificar los datos del archivo PDF utilizando la función validateData
        const pdfPath = req.file.path;
        const items = await getInfoConstancia(pdfPath);
        const isValid = await validateData(items, lastname + ' ' + name, cui);
        if (!isValid) {
            return res.status(400).json({ message: "Los datos del archivo PDF no son válidos" });
        }
        const extractedCourses = await extractCourses(items); // Extraer los cursos del PDF
        // Crear un nuevo usuario con los datos proporcionados y los cursos extraídos del PDF
        const newUser = new UserModel({ cui, email, name, lastname, password, role, courses: extractedCourses });
        // Guardar el nuevo usuario en la base de datos
        try {
            const user = await newUser.save();
            const token = jwt.sign(
                { cui: user.cui, id: user._id },
                process.env.JWTKEY,
                { expiresIn: "1h" }
            );
            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(400).json({ message: "Se requiere adjuntar una constancia en formato PDF" });
    }
};


// Login User
export const loginUser = async (req, res) => {
    const { cui, password } = req.body;
    try {
        console.log("CUI recibido:", cui); // Registro de consola para verificar el valor de CUI recibido
        const user = await UserModel.findOne({ cui: cui }); // Buscar por cui
        console.log("Usuario encontrado:", user); // Registro de consola para verificar si se encontró un usuario
        if (user) {
            console.log("Contraseña ingresada:", password); // Registro de consola para verificar la contraseña ingresada
            console.log("Contraseña almacenada:", user.password); // Registro de consola para verificar la contraseña almacenada en la base de datos
            const validity = await bcrypt.compare(password, user.password);
            if (!validity) {
                res.status(400).json("Contraseña incorrecta");
            } else {
                const token = jwt.sign(
                    { cui: user.cui, id: user._id },
                    process.env.JWTKEY,
                    { expiresIn: "1h" }
                );
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("Usuario no encontrado");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

