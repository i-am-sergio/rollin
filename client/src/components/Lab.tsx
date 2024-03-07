import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createLab, updateLab, deleteLab } from "../actions/LabActions";
import { addLabToCourse, deleteLabFromCourse } from "../actions/CourseActions";
import { Navigate, useNavigate } from "react-router-dom";
import ScheduleManager from "./ScheduleManager";
interface LabFormData {
  course: string;
  group: string;
  teacher: string;
  schedule: string;
  quantity: number;
}

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  type = "text",
  maxLength,
  value,
  onChange,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    maxLength={maxLength}
    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
    value={value}
    onChange={onChange}
  />
);

const Lab = ({
  index,
  letter,
  labData,
  mode,
  onLabSaved,
}: {
  index: number;
  letter: string;
  labData: any;
  mode: string;
  onLabSaved: (index: number, newLab: LabFormData) => void;
}) => {
  const initialState: LabFormData = {
    course: labData.course || "",
    group: letter || "",
    teacher: labData.teacher || "",
    schedule: labData.schedule || "",
    quantity: labData.quantity || 0,
  };

  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const [isChanged, setChanged] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      ...labData,
    }));
  }, [labData]);

  useEffect(() => {
    const change =
      data.course !== labData.course ||
      data.group !== labData.group ||
      data.teacher !== labData.teacher ||
      data.schedule !== labData.schedule ||
      data.quantity !== labData.quantity;
    setChanged(change);
  }, [data, labData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "group" ? e.target.value.toUpperCase() : e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleClickDelete = (e: any) => {
    e.preventDefault();
    const confirmed = confirm(
      `¿Estás seguro de que deseas eliminar el Lab ${labData.course} grupo ${letter}?`
    );
    if (confirmed) {
      dispatch<any>(deleteLab(labData.course, letter));
      dispatch<any>(
        deleteLabFromCourse({ course: labData.course, lab: letter })
      );
      alert(`Lab ${labData.course} grupo ${letter} eliminado!`);
      navigate("/home");
    }
  };

  const handleSchedulesChange = (schedules) => {
    const schedulesString = schedules
      .map(
        (schedule) =>
          `${schedule.startTime}-${schedule.endTime} ${schedule.day}`
      )
      .join(", ");
    console.log(schedulesString);
    // Aquí puedes actualizar el estado de un componente padre o enviarlo a una API
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "edit" || (mode === "view" && isChanged)) {
      if (mode === "edit") {
        dispatch<any>(createLab(data));
        dispatch<any>(addLabToCourse({ course: data.course, lab: data.group }));
        onLabSaved(index, data);
      } else {
        dispatch<any>(updateLab(data.course, letter, data));
        onLabSaved(index, data);
      }
    }
    alert("Changes Saved!");
  };

  return (
    <div>
      <form
        className="px-2 sm:px-6 text-center py-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        onSubmit={handleSubmit}
      >
        <InputField
          name="group"
          placeholder="Group"
          maxLength={3}
          value={data.group}
          onChange={handleChange}
        />
        <InputField
          name="teacher"
          placeholder="Teacher"
          value={data.teacher}
          onChange={handleChange}
        />
        <ScheduleManager onChange={handleSchedulesChange} />
        <InputField
          name="schedule"
          placeholder="Schedule"
          value={data.schedule}
          onChange={handleChange}
        />
        <InputField
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={data.quantity.toString()}
          onChange={handleChange}
        />
        <div className="flex flex-row">
          {mode === "view" && (
            <button
              onClick={handleClickDelete}
              className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-500"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={!isChanged}
            className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-200 dark:hover:bg-sky-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Lab;
