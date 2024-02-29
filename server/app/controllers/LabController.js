import {saveLab,getAllLabs,getAllLabsByCourse} from "../services/LabService.js";

export const labCreate = async (req, res) => {
    try {
        const lab = req.body;
        if (!req.body) {
            console.log("Content can not be empty!");
            res.status(400).json({ message: "Content can not be empty!" });
            return;
        }
        const data = await saveLab(lab);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Error interno del servidor");
    }
};

export const labFindAll = async (req, res) => {
    try {
        const data = await getAllLabs();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Error interno del servidor");
    }
};

export const labFindByCourse = async (req, res) => {
    try {
        const {course} = req.query;
        if (!course) {
            console.log("Content can not be empty!");
            res.status(400).json({ message: "Content can not be empty!" });
            return;
        }
        const data = await getAllLabsByCourse(course);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Error interno del servidor");
    }
};