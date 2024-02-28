import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Labs from "../components/Labs";
import Admin from "../components/Admin";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.authReducer.authData);
  // structure of user:
  // console.log("USER => ", user);

  return (
    <div>
      
      <NavBar user={user} />
 
      {user.role === "user" && <Labs user={user} />}
      {user.role === "admin" && <Admin />}
    
    </div>
  );
};

export default Home;
