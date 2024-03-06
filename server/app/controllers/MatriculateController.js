import CourseModel from "../models/CourseModel.js";
import LabModel from "../models/LabModel.js";

export const getCourseByCode = async (req, res) => {
    try {
        const course = await CourseModel.findOne({ code: req.params.code });
        return res.status(200).json(course);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllLabsByCourseCode = async (req, res) => {
    try {
        // get labs by course code
        const labs = await LabModel.find({ course: req.params.code });
        return res.status(200).json(labs);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}