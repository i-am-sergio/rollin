import { useSelector } from "react-redux";
import Labs from "../components/Labs";
import Admin from "../components/Admin";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const { user } = useSelector((state: any) => state.authReducer.authData);

  return (
    <div>
      
      <NavBar user={user} />
 
      {user.role === "user" && <Labs user={user} />}
      {user.role === "admin" && <Admin />}
    
    </div>
  );
};

export default Home;
