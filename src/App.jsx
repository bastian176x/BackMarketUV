import { useState } from 'react'

import './App.css'
import appFirebase from './credenciales'
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(appFirebase)
import Login from './components/Login'
import Home from './components/Home' 
function App() {

  const [user, setUser] = useState(null)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })
  return (
    <>
     <div>
      {user ? <Home correoUsuario = {user.email}/> : <Login />}
     </div>
    </>
  )
}

export default App
