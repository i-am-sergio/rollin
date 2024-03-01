import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Lab from "../components/Lab";
import { getLabByCourse } from "../actions/LabActions";

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
  const [labs, setLabs] = useState<LabFormData[]>([]);
  const { code, course } = useParams();
  const codeString = String(code);
  let { labData } = useSelector((state: any) => state.labReducer);
  const dispatch = useDispatch();
  const [letter, setLetter] = useState("A");
  const [numClicks, setNumClicks] = useState(0);

  useEffect(() => {
    // Llama a la acción 'getLabByCourse' y despacha la acción para obtener los laboratorios por curso
    dispatch<any>(getLabByCourse(codeString));
  }, [dispatch, codeString]);

  // Actualiza el estado 'labs' cuando 'labData' cambie
  useEffect(() => {
    if (labData) {
      setLabs(labData);
    }
  }, [labData]);

  const handleClickAddLab = () => {
    setNumClicks((prev) => prev + 1);
    const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
    const newLab: LabFormData = {
      course: codeString,
      group: nextLetter,
      teacher: "",
      schedule: "",
      mode: "edit",
    };
    setLabs((prevLabs) => [...prevLabs, newLab]);
  };

  const handleClickDeleteLab = () => {
    if (numClicks > 0) {
      setLabs((prevLabs) => prevLabs.slice(0, -1));
      setLetter((prevLetter) =>
        String.fromCharCode(prevLetter.charCodeAt(0) - 1)
      );
      setNumClicks((prev) => prev - 1);
    }
  };

  return (
    <div>
      <NavBar user={user} />
      <section className="bg-white my-6">
        <div className="flex flex-row-reverse">
          <Link to="/home" className="bg-slate-300 text-xs rounded-full w-14 h-14 flex justify-center items-center mx-8 ml-2 duration-500 ease-in-out hover:translate-y-2">
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
                </div>
                {
                  // muestra los labs existentes
                  labs.length > 0 &&
                    labs.map((lab: any, index: number) => (
                      <Lab
                        key={index}
                        index={index}
                        letter={String.fromCharCode(65 + index)}
                        labData={lab}
                        mode={lab.mode || "view"}
                      />
                    ))
                }
                {labs.length === 0 && <h2>Aun No hay Labs</h2>}
                <div className="px-2 sm:px-6 flex justify-between">
                  {labs.length < 26 && (
                    <button
                      type="button"
                      className="duration-500 ease-in-out hover:translate-y-1 w-full text-gray-600 bg-lime-400 focus: font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-lime-500 hover:text-black"
                      onClick={handleClickAddLab}
                    >
                      Add Lab
                    </button>
                  )}
                  {numClicks > 0 && (
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
