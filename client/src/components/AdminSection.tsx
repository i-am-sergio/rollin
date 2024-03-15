import { useSelector, useDispatch } from "react-redux";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import { getAllCourses } from "../actions/CourseActions";
import { Course } from "../interfaces/Course";

const AdminSection: React.FC = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCicle, setSelectedCicle] = useState("");

  const handleCicleChange = (event: any) => {
    setSelectedCicle(event.target.value);
  };

  let { coursesData } = useSelector((state: any) => state.courseReducer);

  useEffect(() => {
    setSelectedCicle("A");
    dispatch<any>(getAllCourses());
  }, [dispatch]);

  // Funcion para seleccionar solo los cursos que estan en el semestre 1
  const coursesPerSemester = (s: number) : Course[] => {
    return coursesData.filter((course: Course) => course.semestre == s);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 100000); // Actualizar la fecha cada segundo
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, []);

  if (!Array.isArray(coursesData)) {
    return <div>No Courses</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <select
          name="cicle"
          value={selectedCicle}
          onChange={handleCicleChange}
          className="my-6 w-full mx-5 h-8 bg-slate-300 rounded-md hover:cursor-pointer sm:mx-48"
        >
          <option value="A">Semestre A</option>
          <option value="B">Semestre B</option>
        </select>
      </div>

      <div>
        <h2 className="text-2xl text-center pt-5 font-bold">Primer Año</h2>
        {selectedCicle === "A" ? (
          <Courses courses={coursesPerSemester(1)} />
        ) : (
          <Courses courses={coursesPerSemester(2)} />
        )}
        <h2 className="text-2xl text-center pt-5 font-bold">Segundo Año</h2>
        {selectedCicle === "A" ? (
          <Courses courses={coursesPerSemester(3)} />
        ) : (
          <Courses courses={coursesPerSemester(4)} />
        )}
        <h2 className="text-2xl text-center pt-5 font-bold">Tercer Año</h2>
        {selectedCicle === "A" ? (
          <Courses courses={coursesPerSemester(5)} />
        ) : (
          <Courses courses={coursesPerSemester(6)} />
        )}
        <h2 className="text-2xl text-center pt-5 font-bold">Cuarto Año</h2>
        {selectedCicle === "A" ? (
          <Courses courses={coursesPerSemester(7)} />
        ) : (
          <Courses courses={coursesPerSemester(8)} />
        )}
        <h2 className="text-2xl text-center pt-5 font-bold">Quinto Año</h2>
        {selectedCicle === "A" ? (
          <Courses courses={coursesPerSemester(9)} />
        ) : (
          <Courses courses={coursesPerSemester(10)} />
        )}
      </div>
    </div>
  );
};

export default AdminSection;
