import CourseModel from "../models/CourseModel.js";

export const getCourseByCode = async (req, res) => {
    try {
        const { startime } = await CourseModel.findOne({ code: req.params.code });
        console.log("COURSE RESULT => ",startime)
        // extract startime
        // return res.status(200).json(course);
        return res.status(200).json({ startime });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}