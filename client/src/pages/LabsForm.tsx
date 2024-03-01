import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Lab from "../components/Lab";
import { createLab, getLabByCourse } from "../actions/LabActions";
import { use } from "i18next";

interface LabFormData {
  course: string;
  group: string;
  teacher: string;
  schedule: string;
}

const LabsForm = () => {
  const { user } = useSelector((state: any) => state.authReducer.authData);
  const [labs, setLabs] = useState([]);
  const { code, course } = useParams();
  const codeString = String(code);
  let { labData } = useSelector((state: any) => state.labReducer); 

  
  const initialState: LabFormData = {
    course: "",
    group: "A",
    teacher: "",
    schedule: "",
  };

  const dispatch = useDispatch();
  const [letter, setLetter] = useState("A");
  const [numClicks, setNumClicks] = useState(0);
  const [data, setData] = useState<LabFormData>(initialState)
  const [changed, setChanged] = useState(false)
  
  useEffect(() => {
    // Llama a la acción 'getLabByCourse' y despacha la acción para obtener los laboratorios por curso
    dispatch<any>(getLabByCourse(codeString));
  }, [dispatch, course]);


  const handleClickAddCourse = () => {
    // agregar un nuevo lab al array de labs
    if (letter.charCodeAt(0) <= 90) {
      setLetter(String.fromCharCode(letter.charCodeAt(0) + 1));
      setNumClicks(prev => prev + 1);
    }
  }

  const handleClickDeleteCourse = () => {
    if (numClicks > 0) {
      setNumClicks((prev) => prev - 1);
      setLetter((prevLetter) =>
        String.fromCharCode(prevLetter.charCodeAt(0) - 1)
      );
    }
  }

  const handleClickDelete = (e: any) => {
    e.preventDefault()
    alert("Delete")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("***data: ",data)
    // dispatch<any>(createLab(data))
  }

  console.log("LAB DATA => ", labData)
  return (
    <div>
      <NavBar user={user} />
      <section className="bg-gray-50 dark:bg-gray-900">
        <Link to="/home" className="bg-slate-300 ml-4 px-6 rounded-sm mt-10">
          Volver
        </Link>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-center py-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Agregar Laboratorios
              </h3>
              <div className="infoForm authForm space-y-4 md:space-y-6">
                <div className="px-2 sm:px-6">
                  <h3 className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300">
                    Code: {code}
                  </h3>
                  <h3 className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300">
                    Course: {course}
                  </h3>
                </div>
                { 
                // muestra los labs existentes
                  (labData.length > 0) &&
                  labData.map((lab: any, index: number) => (
                    <Lab 
                      key={index} 
                      index={index} 
                      letter={String.fromCharCode(65 + index)} 
                      labData = {lab}  
                    />
                  ))
                }
                {
                  // muestra un boton para agregar un nuevo lab
                  (labs.length === 0) &&
                  <h2>No hay</h2>
                }
                {/* {[...Array(numClicks)].map((_, index) => (
                  <div key={index}>
                    <form className="px-2 sm:px-6 text-center py-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="text"
                        className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                        name="group"
                        value={String.fromCharCode(65 + index)}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        placeholder="teacher"
                        className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                        name="teacher"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        placeholder="schedule"
                        className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                        name="schedule"
                        onChange={handleChange}
                      />
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
                    </form>
                  </div>
                ))} */}
                <div className="px-2 sm:px-6 flex justify-between">
                {91 > 65 + numClicks && (
                  <button
                    type="button"
                    className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-300 dark:hover:bg-lime-400 dark:focus:ring-primary-800 mr-2"
                    onClick={handleClickAddCourse}
                  >
                    Add Course
                  </button>
                  )}
                  {numClicks > 0 && (
                    <button
                      type="button"
                      className="w-full text-gray-600 bg-red-300 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-800 ml-2"
                      onClick={handleClickDeleteCourse}
                    >
                      Delete Last Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabsForm;
