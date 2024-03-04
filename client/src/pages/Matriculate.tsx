import { useSelector } from "react-redux";
import NavBar from "../components/NavBar"


const Matriculate = () => {
  const { user } = useSelector((state: any) => state.authReducer.authData);

  // get current datetime function
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

  const dateTime = getCurrentDateTime();
  const matriculateStart = "2022-10-01T00:00:00";
  const matriculateEnd = "2022-10-31T23:59:59";
  console.log(dateTime);

  const isMatriculateOpen = () => {
    if (dateTime >= matriculateStart && dateTime <= matriculateEnd) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <NavBar user={user} />
      { !isMatriculateOpen() && <h2>Aun No inician las matriculas</h2> }
      { isMatriculateOpen() && <h2>Matriculas Abiertas</h2>}
    </div>
  )
}

export default Matriculate