import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../actions/AuthActions";
import Labs from "../components/Labs";
import Admin from "./Admin";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.authReducer.authData);
  console.log("USER => ", user);

  const handleLogOut = () => {
    dispatch<any>(logout());
  };

  return (
    <div>
      <NavBar user={user} />
      <h1>{t("Home.welcome")}</h1>
      {user && (
        <div>
          <h2>{t("Home.authenticationData")}</h2>
          <p>
            {t("Home.firstName")} {user.name}
          </p>
          <p>
            {t("Home.lastName")} {user.lastname}
          </p>
        </div>
      )}
      <button
        className="bg-cyan-800 px-4 py-2 rounded-md hover:bg-fuchsia-300"
        onClick={handleLogOut}
      >
        Log Out
      </button>
      {user.role === "user" && <Labs />}
      {user.role === "admin" && <Admin />}
    </div>
  );
};

export default Home;
