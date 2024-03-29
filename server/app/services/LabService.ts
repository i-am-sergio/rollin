import LabModel from "../models/LabModel";

export const saveLab = async (lab : any) => {
  try {
    const newLab = new LabModel({
      group: lab.group,
      course: lab.course,
      teacher: lab.teacher,
      schedule: lab.schedule,
      quantity: lab.quantity,
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

export const getAllLabsByCourse = async (course : any) => {
  try {
    return await LabModel.find({ course });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const updateLabByCourse = async (group : any, course : any, newData : any) => {
  try {
    const existingLab = await LabModel.findOne({ group, course });
    if (!existingLab) {
      throw new Error("No se encontró el laboratorio");
    }
    const updatedLab = await LabModel.findOneAndUpdate(
      { group, course },
      newData,
      { new: true }
    );
    if (!updatedLab) {
      throw new Error("No se pudo actualizar el laboratorio");
    }
    return updatedLab;
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

export const deleteLabByCourse = async (group : any, course : any) => {
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
