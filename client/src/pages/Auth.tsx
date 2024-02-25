import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, logIn } from "../actions/AuthActions"; // Asegúrate de importar las acciones correctamente

interface UserData {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmpass: string;
}

const Auth: React.FC = () => {
  const initialState: UserData = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const loading: boolean = useSelector((state: any) => state.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [data, setData] = useState<UserData>(initialState);
  const [confirmPass, setConfirmPass] = useState<boolean>(true);

  const resetForm = () => {
    setData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch<any>(signUp(data, navigate))
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
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
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
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
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
