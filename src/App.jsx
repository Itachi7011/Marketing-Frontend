import { useState, useContext, createContext, useReducer } from 'react'
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { reducer, initialState } from "./reducers/UseReducer"


import './App.css'
import './CSS/Navbar.css'
import './CSS/Footer.css'
import './CSS/Signup.css'
import './CSS/EmailVerification.css'
import './CSS/Login.css'
import './CSS/UserProfile.css'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Signup from './pages/auth/Signup';
import EmailVerification from './pages/auth/EmailVerification';
import Login from './pages/auth/Login';
import UserProfile from './pages/profiles/UserProfile';

export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { isDarkMode } = useContext(ThemeContext);
  console.log(state)

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <UserContext.Provider value={{ state, dispatch }}>

        <Router>

          <Navbar />
          <Routes>

            {/* <Route path="/Login" element={<Login />} /> */}
            <Route path="/Signup" element={<Signup />} />
            <Route path="/EmailVerification" element={<EmailVerification />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/UserProfile" element={<UserProfile />} />



            {/* <Route path="*" element={<Error404 />} /> */}
          </Routes>

          <Footer />
        </Router>
      </UserContext.Provider>
    </div>


  )
}

export default App
