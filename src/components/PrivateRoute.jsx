// Paso 6: borra el return de abajo y descomenta el bloque completo (verifica
// si hay un token guardado antes de mostrar lo protegido).

import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('taskflow_token');
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
