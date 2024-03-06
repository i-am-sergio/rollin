import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseByCode } from "../actions/MatriculateActions";
import NavBar from "../components/NavBar";
import NonMatriculate from "../components/NonMatriculate";
import Enroll from "../components/Enroll";

const Matriculate = () => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const { user } = useSelector((state: any) => state.authReducer.authData);

  // get matriculate startime with dispatch 1 time
  useEffect(() => {
    if (code) {
      dispatch<any>(getCourseByCode(code));
    }
  }, []);

  const matriculateData = useSelector(
    (state: any) => state.matriculateReducer.matriculateData
  );
  const { labs, startime } = matriculateData || { labs: [], startime: "" };

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

  if (!Array.isArray(labs) || labs.length === 0) {
    return <div>No Labs to Enroll</div>;
  }

  if (!startime) {
    return <div>Start time is not defined</div>;
  }

  return (
    <div>
      <NavBar user={user} />
      {!isMatriculateOpen() && <NonMatriculate />}
      {/* En lugar de pasarle solo las letras en labs, se deben pasar toda la info de cada lab haciendo otro dispatch */}
      {isMatriculateOpen() && <Enroll labs={labs} code={code} />}
    </div>
  );
};

export default Matriculate;
