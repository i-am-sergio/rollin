import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar"
import { getStartimeByCourse } from "../actions/MatriculateActions";


const Matriculate = () => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const { user } = useSelector((state: any) => state.authReducer.authData);
  
  // get matriculate startime with dispatch 1 time
  useEffect(() => {
    if (code) {
      dispatch<any>(getStartimeByCourse(code));
    }
  }, []);
  
  const { startime } = useSelector((state: any) => state.matriculateReducer.matriculateData);

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  };

  const currentDateTime = getCurrentDateTime();
  const matriculateStart = startime;
  
  const isMatriculateOpen = () => {
    const currentDate = new Date(currentDateTime);
    const matriculateStartDate = new Date(matriculateStart);
    return currentDate >= matriculateStartDate;
  };

  return (
    <div>
      <NavBar user={user} />
      { !isMatriculateOpen() && <h2>Aun No inician las matriculas</h2> }
      { isMatriculateOpen() && <h2>Matriculas Abiertas</h2>}
    </div>
  )
}

export default Matriculate