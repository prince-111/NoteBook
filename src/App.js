import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import  Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Users from "./components/Users";


function App() {
  const[alert, setAlert] = useState(null);
 
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }
  
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert} />
    <div className="container">
      <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/users" element={<Users/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
          <Route exact path="/password-reset" element={<PasswordReset/>}/>
          <Route exact path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
      </Routes>
      </div>
    </Router>
   </NoteState>
    </>
  );
}

export default App;
