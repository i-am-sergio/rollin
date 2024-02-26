import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AuthState } from "../reducers/AuthReducer";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: AuthState) => state.auth.authData.user);
  console.log(user);
  return (
    <div>
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
    </div>
  );
};

export default Home;
