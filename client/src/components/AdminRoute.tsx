import { Navigate, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    element={(props) =>
      isAdmin ? <Component {...props} /> : <Navigate to="/login" />
    }
  />
);

export default AdminRoute;
