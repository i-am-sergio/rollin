import LabModel from "../models/LabModel.js";

export const saveLab = async (lab) => {
  try {
    const newLab = new LabModel({
      group: lab.group,
      course: lab.course,
      teacher: lab.teacher,
      schedule: lab.schedule,
    });
    return await newLab.save();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getAllLabs = async () => {
  try {
    return await LabModel.find();
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const getAllLabsByCourse = async (course) => {
  try {
    return await LabModel.find({ course });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteLabByCourse = async (group, course) => {
  try {
    const lab = await LabModel.findOneAndDelete({ group, course });
    if (!lab) {
      throw new Error("No se encontró el laboratorio");
    }
    return lab;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};
