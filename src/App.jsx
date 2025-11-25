import { useState, useContext, createContext, useReducer } from 'react'
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { reducer, initialState } from "./reducers/UseReducer"


import './App.css'
import './CSS/Homepage.css'
import './CSS/Navbar.css'
import './CSS/Footer.css'
import './CSS/Signup.css'
import './CSS/EmailVerification.css'
import './CSS/Login.css'
import './CSS/AboutUs.css'
import './CSS/ContactUs.css'
import './CSS/UserProfile.css'

import './CSS/DigitalMarketing/SocialMediaMarketing.css'
import './CSS/DigitalMarketing/SearchMarketing.css'
import './CSS/DigitalMarketing/ContentCreation.css'
import './CSS/DigitalMarketing/ScheduleDemo.css'

import './CSS/admin/AdminNavbar.css'
import './CSS/admin/AdminSidebar.css'
import './CSS/admin/UsersList.css'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Signup from './pages/auth/Signup';
import EmailVerification from './pages/auth/EmailVerification';
import Login from './pages/auth/Login';
import UserProfile from './pages/profiles/UserProfile';
import Homepage from './pages/Homepage';

import SocialMediaMarketing from './pages/digitalMarketing/SocialMediaMarketing';
import SearchMarketing from './pages/digitalMarketing/SearchMarketing';
import ContentCreation from './pages/digitalMarketing/ContentCreation';
import ScheduleDemo from './pages/digitalMarketing/ScheduleDemo';

import AdminNavbar from './pages/admin/layout/AdminNavbar';
import AdminSidebar from './pages/admin/layout/AdminSidebar';
import UsersList from './pages/admin/lists/UsersList';
import ScheduledDemosList from './pages/admin/lists/ScheduledDemosList';

import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <UserContext.Provider value={{ state, dispatch }}>

        <Router>

          <Navbar />
          <AdminNavbar />
          <AdminSidebar />
          <Routes> 

            <Route path="/" element={<Homepage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/EmailVerification" element={<EmailVerification />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/UserProfile" element={<UserProfile />} />

            <Route path="/SocialMediaMarketing" element={<SocialMediaMarketing />} />
            <Route path="/SearchMarketing" element={<SearchMarketing />} />
            <Route path="/ContentCreation" element={<ContentCreation />} /> 
            <Route path="/ScheduleDemo" element={<ScheduleDemo />} />
 
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
 
            <Route path="/admin/UsersList" element={<UsersList />} /> 
            <Route path="/admin/ScheduledDemosList" element={<ScheduledDemosList />} />



            {/* <Route path="*" element={<Error404 />} /> */}
          </Routes>

          <Footer />
        </Router>
      </UserContext.Provider>
    </div>


  )
}

export default App
