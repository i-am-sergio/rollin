import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createLab, deleteLab } from "../actions/LabActions";
import { Navigate, useNavigate } from "react-router-dom";

interface LabFormData {
  course: string;
  group: string;
  teacher: string;
  schedule: string;
}

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
    course: labData.course,
    group: letter,
    teacher: "",
    schedule: "",
  };

  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const [localMode, setLocalMode] = useState(mode);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      ...labData,
    }));
  }, [labData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClickDelete = (e: any) => {
    e.preventDefault();
    // alert(Lab ${labData.course} grupo ${letter} deleted!);
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar el Lab ${labData.course} grupo ${letter}?`
      )
    ) {
      // Código si el usuario elige "Sí"
      dispatch<any>(deleteLab(labData.course, letter));
      alert(`Lab ${labData.course} grupo ${letter} eliminado!`);
      navigate("/home");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("***data: ", data);
    dispatch<any>(createLab(data));
    alert("Changes Saved!");
    onLabSaved(index, data);
    // que no se vaya a la página de inicio
  };
  const teacherValue = mode === "edit" ? "" : labData.teacher || "";
  const scheduleValue = mode === "edit" ? "" : labData.schedule || "";

  return (
    <div>
      <form
        className="px-2 sm:px-6 text-center py-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
          name="group"
          value={String.fromCharCode(65 + index)}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="teacher"
          className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
          name="teacher"
          value={mode === "view" ? teacherValue : data.teacher}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="schedule"
          className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
          name="schedule"
          value={mode === "view" ? scheduleValue : data.schedule}
          onChange={handleChange}
        />
        {localMode === "view" && (
          <div className="flex flex-row">
            <button
              className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-500"
              disabled={changed}
              onClick={handleClickDelete}
            >
              Delete
            </button>
            <button
              className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-200 dark:hover:bg-sky-300"
              disabled={changed}
            >
              Save
            </button>
          </div>
        )}
        {localMode === "edit" && (
          <div className="flex flex-row">
            <button
              className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-200 dark:hover:bg-sky-300"
              disabled={changed}
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Lab;
