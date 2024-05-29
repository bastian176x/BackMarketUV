import React from "react";
import appFirebase from "../credenciales";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(appFirebase);
const database = getDatabase(appFirebase);

const Login = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const funcAuthentication = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;

    if (register) {
      try {
        await createUserWithEmailAndPassword(auth, correo, password);
        navigate("/home"); // Redirigir a Home después del registro
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, password);
        navigate("/home"); // Redirigir a Home después del inicio de sesión
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const photoUrl = user.photoURL;

        set(ref(database, `users/${user.uid}`), {
          name: name,
          email: email,
          photoUrl: photoUrl,
        })
          .then(() => {
            console.log("Data saved successfully!");
            navigate("/home"); // Redirigir a Home después del inicio de sesión con Google
          })
          .catch((error) => {
            console.error("Failed to save data", error);
          });
      })
      .catch((error) => {
        console.error("Error with Google sign in", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body">
              <form onSubmit={funcAuthentication}>
                <input type="text" placeholder="Ingresar email" id="email" />
                <input type="password" placeholder="Ingresar contraseña" id="password" />
                <button>{register ? "Regístrate" : "Inicia sesión"}</button>
              </form>
              <h4>
                {register ? "Si ya tienes cuenta" : "No tienes cuenta"}
                <button onClick={() => setRegister(!register)}>
                  {register ? "Inicia sesión" : "Regístrate"}
                </button>
              </h4>
              <button onClick={signInWithGoogle}>Login con Google</button>
            </div>
          </div>
        </div>
        <div className="col-md-8"></div>
      </div>
    </div>
  );
};

export default Login;
