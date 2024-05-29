import { useState, useEffect } from 'react';
import './App.css';
import appFirebase from './credenciales';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
