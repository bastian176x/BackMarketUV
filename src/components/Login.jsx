import React from "react";
import appFirebase from "../credenciales";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,} from "firebase/auth";
import { getDatabase,set,ref } from "firebase/database";
import { useState } from "react";
const auth = getAuth(appFirebase);
const database = getDatabase(appFirebase);

const Login = () => {
  const [register , setRegister] = useState(false);

  const funcAuthentication = async(e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;

    if(register){
      try {
        await createUserWithEmailAndPassword(auth, correo, password)

      } catch (error) {
        alert(error.message);
      }
    }else {
      try {
        await signInWithEmailAndPassword(auth, correo, password)
      } catch (error) {
        alert(error.message);
    }
  }}

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
            }).then(() => {
                console.log("Data saved successfully!");
            }).catch((error) => {
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
              <input type="text" placeholder="ingresar email" id="email"/>
              <input type="password" placeholder="ingresar constraseña" id="password"/>
              <button>{register ? "Registrate" : "Inicia sesion"}</button>
            </form>
            <h4>{register ? "Si ya tienes cuenta": "No tienes cuenta"}<button onClick={() => setRegister(!register)}>{register ? "Inicia sesion" : "registrate"}</button></h4>
            <button onClick={signInWithGoogle}>Login con google</button>
          </div>
        </div>
      
      </div>
     
      <div className="col-md-8">

      </div>
    </div>

  </div>
  );
};

export default Login