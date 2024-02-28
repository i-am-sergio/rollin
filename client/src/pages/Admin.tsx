import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../actions/AuthActions";

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.authReducer.authData);
  console.log("USER => ", user);

  const handleLogOut = () => {
    dispatch<any>(logout());
  };
  return (
    <div>
      <h1>{t("Home.welcome")}</h1>
    </div>
  );
};

export default Admin;
