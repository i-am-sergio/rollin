import CourseModel from "../models/CourseModel.js";

export const getCourseByCode = async (req, res) => {
    try {
        const course = await CourseModel.findOne({ code: req.params.code });
        return res.status(200).json(course);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}