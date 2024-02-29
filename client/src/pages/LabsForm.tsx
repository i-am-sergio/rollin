import { useParams ,useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { signUp, logIn } from "../actions/AuthActions";

interface LabFormData {
  code: string;
  name: string;
  teacher: string;
}

const LabsForm = () => {
  let { code } = useParams();
  const { user } = useSelector((state: any) => state.authReducer.authData);

  const { t } = useTranslation();
  const initialState: LabFormData = {
    code: "",
    name: "",
    teacher: "",
  };
  const loading: boolean = useSelector(
    (state: any) => state.authReducer.loading
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [data, setData] = useState<LabFormData>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (coursecode : any, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cui", coursecode);
    formData.append("name", data.name);
    formData.append("password", data.teacher);

    if (isSignUp) {
      dispatch<any>(signUp(formData, navigate))
    } else {
      dispatch<any>(logIn(data, navigate));
    }
  };

  return (
    <div>
      <NavBar user={user} />
      <a href="/home" className='bg-slate-300 ml-4 px-6 rounded-sm mt-10' >Volver</a>
      <p>Código: {code}</p>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="absolute top-0 right-0 p-4">
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-center py-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Agregar Laboratorios
              </h3>
              <form
                className="infoForm authForm space-y-4 md:space-y-6"
                onSubmit={
                  (e) => {
                    handleSubmit(code, e);
                }}
                encType="multipart/form-data"
              >
                <div className="px-2 sm:px-6">
                  <input
                    required
                    type="text"
                    placeholder="Nombre"
                    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    name="cui"
                    value={code}
                  />
                  <input
                    required
                    type="password"
                    className="outline-none my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-300 dark:focus:border-lime-300"
                    placeholder={t("Auth.password")}
                    name="password"
                    value={data.teacher}
                    onChange={handleChange}
                  />
                </div>
                <div className="px-2 sm:px-6">
                  <button
                    className="w-full text-gray-600 bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-300 dark:hover:bg-lime-400 dark:focus:ring-primary-800"
                    disabled={loading}
                  >
                    Save
                  </button>                
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LabsForm;