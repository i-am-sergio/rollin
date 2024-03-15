import { useSelector } from "react-redux";
import UserSection from "../components/UserSection";
import AdminSection from "../components/AdminSection";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const { user, filteredCourses } = useSelector((state: any) => state.authReducer.authData);

  return (
    <div>
      
      <NavBar user={user} />
 
      {user.role === "user" && <UserSection user={user} courses={filteredCourses} />}
      {user.role === "admin" && <AdminSection />}
    
    </div>
  );
};

export default Home;
