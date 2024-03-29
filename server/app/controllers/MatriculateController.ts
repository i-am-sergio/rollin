import CourseModel from "../models/CourseModel";
import LabModel from "../models/LabModel";
import { Request, Response } from "express";

export const getCourseByCode = async (req : Request, res : Response) => {
    try {
        const course = await CourseModel.findOne({ code: req.params.code });
        return res.status(200).json(course);
    }
    catch (error : any) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllLabsByCourseCode = async (req : Request, res : Response) => {
    try {
        // get labs by course code
        const labs = await LabModel.find({ course: req.params.code });
        return res.status(200).json(labs);
    }
    catch (error : any) {
        return res.status(500).json({ message: error.message });
    }
}

// route:  router.post("/:cui/:course/:group", matriculateUserToLab);

export const matriculateUserToLab = async (req : Request, res : Response) => {
    try {
        // get lab by course and group
        const lab = await LabModel.findOne({ course: req.params.course, group: req.params.group });
        // check if lab exists
        if (!lab) {
            return res.status(404).json({ message: "Lab not found" });
        }
        // check if lab is full
        if (lab.students.length >= lab.quantity) {
            return res.status(400).json({ message: "Lab is full" });
        }
        // check if user is already matriculated
        if (lab.students.includes(req.params.cui)) {
            return res.status(400).json({ message: "User is already matriculated" });
        }
        // add user to lab
        lab.students.push(req.params.cui);
        await lab.save();
        return res.status(200).json(lab);
    }
    catch (error : any) {
        return res.status(500).json({ message: error.message });
    }
}