import React from "react";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  // Obtener el estado de autenticación del store de Redux
  const user = useSelector((state: any) => state.auth.authData.user);
  console.log(user);
  return (
    <div>
      <h1>Hello, World!</h1>
      {user && (
        <div>
          <h2>Datos de autenticación:</h2>
          <p>Nombre: {user.name}</p>
          <p>Apellido: {user.lastname}</p>
          {/* Agrega más campos según la estructura de tu objeto de datos de autenticación */}
        </div>
      )}
    </div>
  );
};

export default Home;
