import { useSelector, useDispatch } from "react-redux";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import { getAllCourses } from "../actions/CourseActions";

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCicle, setSelectedCicle] = useState('');

  const handleCicleChange = (event: any) => {
    setSelectedCicle(event.target.value);
  };

  // user data from redux
  // const { user } = useSelector((state: any) => state.authReducer.authData);
  let { coursesData } = useSelector((state: any) => state.courseReducer);

  useEffect(() => {
    setSelectedCicle('A');
    dispatch<any>(getAllCourses());
  }, [dispatch])

  // Funcion para seleccionar solo los cursos que estan en el semestre 1
  const coursesPerSemester = (s: number) => {
    return coursesData.filter((course: any) => course.semestre == s)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 100000); // Actualizar la fecha cada segundo
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, []);

  if (!coursesData) {
    return <div>No Courses</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1>{currentDate.toLocaleDateString()}</h1>
      </div>

      <select name="cicle" value={selectedCicle} onChange={handleCicleChange}>
        <option selected value="A">Semestre A</option>
        <option value="B">Semestre B</option>
      </select>
      <div>
        <h2>Primer Año</h2>
        {selectedCicle === 'A' ? <Courses courses={coursesPerSemester(1)} /> : <Courses courses={coursesPerSemester(2)} />}
        <h2>Segundo Año</h2>
        {selectedCicle === 'A' ? <Courses courses={coursesPerSemester(3)} /> : <Courses courses={coursesPerSemester(4)} />}
        <h2>Tercer Año</h2>
        {selectedCicle === 'A' ? <Courses courses={coursesPerSemester(5)} /> : <Courses courses={coursesPerSemester(6)} />}
        <h2>Cuarto Año</h2>
        {selectedCicle === 'A' ? <Courses courses={coursesPerSemester(7)} /> : <Courses courses={coursesPerSemester(8)} />}
        <h2>Quinto Año</h2>
        {selectedCicle === 'A' ? <Courses courses={coursesPerSemester(9)} /> : <Courses courses={coursesPerSemester(10)} />}
      </div>

    </div>
  );
};

export default Admin;
