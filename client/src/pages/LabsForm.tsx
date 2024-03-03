import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Lab from "../components/Lab";
import { getLabByCourse } from "../actions/LabActions";
import { updateCourse } from "../actions/CourseActions";

interface LabFormData {
  course: string;
  group: string;
  teacher: string;
  schedule: string;
  mode?: string;
}

const LabsForm = () => {
  const { user } = useSelector((state: any) => state.authReducer.authData);
  // const [labs, setLabs] = useState(<[]);
  const [existingLabs, setExistingLabs] = useState<LabFormData[]>([]);
  const [newLabs, setNewLabs] = useState<LabFormData[]>([]);
  const { code, course, date_time } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const codeString = String(code);
  let { labData } = useSelector((state: any) => state.labReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción 'getLabByCourse' y despacha la acción para obtener los laboratorios por curso
    dispatch<any>(getLabByCourse(codeString));
  }, [dispatch, codeString]);

  // Actualiza el estado 'labs' cuando 'labData' cambie
  useEffect(() => {
    if (labData && Array.isArray(labData)) {
      setExistingLabs(labData);
    }
  }, [labData]);

  useEffect(() => {
    if (date_time) {
      const [initialDate, initialTime] = date_time.split(" ");
      setDate(initialDate);
      setTime(initialTime);
    } else {
      const today = new Date();
      setDate(today.toISOString().split("T")[0]);
      const timeNow = today.toTimeString().split(" ")[0].substring(0, 5);
      setTime(timeNow);
    }
  }, [course.date]);

  const handleLabSaved = (index: number, newLab: LabFormData) => {
    setExistingLabs((prevLabs) => [...prevLabs, newLab]);
    setNewLabs((prevLabs) => {
      const newLabsFiltered = prevLabs.filter((lab, i) => {
        return i !== index - existingLabs.length;
      });
      return newLabsFiltered;
    });
  };

  const handleClickAddLab = () => {
    const nextLetter =
      existingLabs.length + newLabs.length > 0
        ? String.fromCharCode(
            "A".charCodeAt(0) + existingLabs.length + newLabs.length
          )
        : "A";
    const newLab: LabFormData = {
      course: codeString,
      group: nextLetter,
      teacher: "",
      schedule: "",
      mode: "edit",
    };
    setNewLabs((prevLabs) => [...prevLabs, newLab]);
  };

  const handleClickDeleteLab = () => {
    if (newLabs.length > 0) {
      setNewLabs((prevLabs) => prevLabs.slice(0, -1));
    }
  };

  const handleClickTimeSave = () => {
    const newDateTime = `${date} ${time}`;
    //console.log("Time Saved: ", { startime: newDateTime });
    dispatch<any>(updateCourse(code, { startime: newDateTime }));
  };

  const isChanged = date_time !== `${date} ${time}`;

  return (
    <div>
      <NavBar user={user} />
      <section className="bg-white my-6">
        <div className="flex flex-row-reverse">
          <Link
            to="/home"
            className="bg-slate-300 text-xs rounded-full w-14 h-14 flex justify-center items-center mx-8 ml-2 duration-500 ease-in-out hover:translate-y-2"
          >
            Volver
          </Link>
        </div>
        <div className="bg-white flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
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
                  <form className="flex flex-row justify-between">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    />
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    />
                    <button
                      type="button"
                      className={`duration-500 my-4 ease-in-out hover:translate-y-1 w-24 text-gray-600 bg-lime-400 focus:font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        isChanged
                          ? "hover:bg-lime-500 hover:text-black"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={handleClickTimeSave}
                      disabled={!isChanged}
                    >
                      Save
                    </button>
                  </form>
                </div>
                {existingLabs.map((lab: LabFormData, index: number) => (
                  <Lab
                    key={`existing-${index}`}
                    index={index}
                    letter={lab.group}
                    labData={lab}
                    mode="view"
                    onLabSaved={handleLabSaved}
                  />
                ))}
                {existingLabs.length === 0 && (
                  <h2 className="text-white px-6 text-center">
                    Aun No hay Laboratorios
                  </h2>
                )}
                {newLabs.map((lab: LabFormData, index: number) => (
                  <Lab
                    key={`new-${index}`}
                    index={index + existingLabs.length}
                    letter={String.fromCharCode(
                      65 + existingLabs.length + index
                    )}
                    labData={lab}
                    mode="edit"
                    onLabSaved={handleLabSaved}
                  />
                ))}
                <div className="px-2 sm:px-6 flex justify-between">
                  {existingLabs.length + newLabs.length < 26 && (
                    <button
                      type="button"
                      className="duration-500 ease-in-out hover:translate-y-1 w-full text-gray-600 bg-lime-400 focus: font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-lime-500 hover:text-black"
                      onClick={handleClickAddLab}
                    >
                      Add Lab
                    </button>
                  )}
                  {newLabs.length > 0 && (
                    <button
                      type="button"
                      className="w-full text-gray-600 bg-red-300 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-800 ml-2"
                      onClick={handleClickDeleteLab}
                    >
                      Delete Last Lab
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
