import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signUp, logIn } from "../actions/AuthActions";
import LanguageSelector from "../i18n/LanguageSelector";

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
  const { t } = useTranslation();
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
  const loading: boolean = useSelector(
    (state: any) => state.authReducer.loading
  );
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
    formData.append("constancia", data.constancia ?? "");

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch<any>(signUp(formData, navigate))
        : setConfirmPass(false);
    } else {
      dispatch<any>(logIn(data, navigate));
    }
  };

  let buttonText: string;
  if (loading) {
    buttonText = t("Auth.buttonTextLoading");
  } else {
    buttonText = isSignUp
      ? t("Auth.buttonTextSignUp")
      : t("Auth.buttonTextLogin");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-0 right-0 p-4">
        <LanguageSelector />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-center py-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? t("Auth.register") : t("Auth.login")}
            </h3>
            <form
              className="infoForm authForm space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="px-2 sm:px-6">
                <input
                  required
                  type="text"
                  placeholder={t("Auth.cui")}
                  className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                  name="cui"
                  value={data.cui}
                  onChange={handleChange}
                />
                {isSignUp && (
                  <input
                    required
                    type="email"
                    placeholder={t("Auth.email")}
                    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                )}
                {isSignUp && (
                  <input
                    required
                    type="text"
                    placeholder={t("Auth.firstNames")}
                    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                )}
                {isSignUp && (
                  <input
                    required
                    type="text"
                    placeholder={t("Auth.lastNames")}
                    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    name="lastname"
                    value={data.lastname}
                    onChange={handleChange}
                  />
                )}
                <input
                  required
                  type="password"
                  className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                  placeholder={t("Auth.password")}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                {isSignUp && (
                  <input
                    required
                    type="password"
                    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    name="confirmpass"
                    placeholder={t("Auth.confirmPassword")}
                    onChange={handleChange}
                  />
                )}
              </div>

              {isSignUp && (
                <div className="px-2 sm:px-6">
                  <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    accept=".pdf"
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                  />
                </div>
              )}

              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                  display: confirmPass ? "none" : "block",
                }}
              >
                {t("Auth.confirmPasswordMismatch")}
              </span>
              <div className="px-2 sm:px-6">
                <button
                  className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-300 dark:hover:bg-lime-400 dark:focus:ring-primary-800"
                  disabled={loading}
                >
                  {buttonText}
                </button>
                <button
                  style={{
                    fontSize: "12px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    resetForm();
                    setIsSignUp((prev) => !prev);
                  }}
                  className="font-medium text-gray-300 hover:underline dark:text-gray-300 pt-4"
                >
                  {isSignUp
                    ? t("Auth.alreadyHaveAccount")
                    : t("Auth.dontHaveAccount")}
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
