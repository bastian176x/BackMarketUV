import { useState, useEffect } from 'react';
import './App.css';
import appFirebase from './credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Añadir un estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Cambiar el estado de carga
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un indicador de carga mientras se determina el estado de autenticación
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={user ? <Home correoUsuario={user.email} /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
