import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, logIn } from "../actions/AuthActions"; // Asegúrate de importar las acciones correctamente

interface UserData {
  cui: string;
  email: string;
  name: string;
  lastname: string;
  password: string;
  confirmpass: string;
  constancia: File | null;
  role: string;
}

const Auth: React.FC = () => {
  const initialState: UserData = {
    cui: "",
    email: "",
    name: "",
    lastname: "",
    password: "",
    confirmpass: "",
    role: "user",
    constancia: null,
  };
  const loading: boolean = useSelector((state: any) => state.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [data, setData] = useState<UserData>(initialState);
  const [confirmPass, setConfirmPass] = useState<boolean>(true);

  const resetForm = () => {
    setData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      setData({
        ...data,
        constancia: e.target.files ? e.target.files[0] : null,
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setConfirmPass(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("cui", data.cui);
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("constancia", data.constancia || "");

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch<any>(signUp(formData, navigate))
        : setConfirmPass(false);
    } else {
      dispatch<any>(logIn(data, navigate));
    }
  };

  const buttonText: string = loading
    ? "Loading..."
    : isSignUp
    ? "SignUp"
    : "Login";

  return (
    <div className="Auth">
      <div className="a-left">{/* left side */}</div>
      <div className="a-right">
        {/* right form side */}
        <form
          className="infoForm authForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="email"
                placeholder="Correo Institucional"
                className="infoInput"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Nombres"
                className="infoInput"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Apellidos"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
              <input
                type="file"
                id="pdfFile"
                name="pdfFile"
                accept=".pdf"
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="CUI"
              className="infoInput"
              name="cui"
              value={data.cui}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Ya tienes una cuenta Inicia sesion"
                : "No tienes una cuenta Registrate"}
            </span>
            <button className="button infoButton" disabled={loading}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
