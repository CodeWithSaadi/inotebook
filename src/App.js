import './App.css';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Shop from './components/Shop';
import Profile from './components/Profile';



function App() {


  const [alert, setAlert] = useState(null)                                 // useState for Alert

  //Alert function-----------------
  const showAlert = (message, type) => {
    setAlert({                         //show mesage in alert
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

const shop= ()=>{<Shop/>}

  return (
    <>

      <NoteState>            {/* use for useContext  */}
        <Router>

          <Navbar home={<Link className="nav-link  " aria-current="page" to="/home">Home</Link>} about={<Link className="nav-link " to="/about">About</Link>} inotebook={<Link className="navbar-brand" to='/'>iNotebook</Link>} showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/home" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About shop={shop} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/profile" element={<Profile  />} />
            </Routes>
          </div>
          {/* <Shop/> */}
        </Router>

      </NoteState>
    </>
  );
}

export default App;
