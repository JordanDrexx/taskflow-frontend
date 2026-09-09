import Dashboard from './pages/Dashboard';

// Paso 4: borra el bloque de App() de abajo y descomenta el bloque comentado
// completo (imports de react-router-dom/Login/Register/PrivateRoute
// incluidos), que reemplaza el tablero fijo por las 3 rutas de TaskFlow.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
//
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Cualquier ruta no definida (incluida "/") redirige a /login —
            sin esto, abrir la raíz del sitio muestra pantalla en blanco
            con "No routes matched location" en la consola. */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
