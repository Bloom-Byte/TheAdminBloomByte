import React, { useState, useEffect } from 'react'
import './Navbar.css'
import Logo from '../../assets/Logo.png'
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [activeButton, setActiveButton] = useState(getActiveButton(location.pathname));


    const handleSignOut = () => {
      logout();
      window.onpopstate = null; // Remove the navigation prevention
      navigate('/login');
    };
  

    function getActiveButton(pathname) {
      switch (pathname) {
        case '/projects':
          return 'projects';
        case '/blogpost':
          return 'blogpost';
        case '/career':
          return 'careerposts';
        default:
          return 'projects';
      }
    }
  
  
    useEffect(() => {
      setActiveButton(getActiveButton(location.pathname));
     }, [location]);
      
    const handleButtonClick = (buttonName) => {
        if (buttonName !== activeButton) {
          setActiveButton(buttonName);
        }
    };
    
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    
   
    
  return (
      <nav>
          <div className={`nav-wall ${isSidebarVisible ? 'visible' : ''} z-[2]`}>
          <div className="logo">
              <img src={Logo} alt="" />
          </div>
          <div className="nav-list">
              <Link  to="/projects" className={`link ${activeButton === 'projects' ? 'active' : ''}`} onClick={() => handleButtonClick('projects')}> Projects</Link>
              <Link to="/blogpost"  className={`link ${activeButton === 'blogpost' ? 'active' : ''}`} onClick={() => handleButtonClick('blogpost')}> Blog Posts </Link>
              <Link to="/career" className={`link ${activeButton === 'careerposts' ? 'active' : ''}`} onClick={() => handleButtonClick('careerposts')}> Career Posts</Link>
              <Link 
                  to="/login" 
                  className="text-white px-5 py-3 text-lg rounded-md bg-[#067EF6] transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                      handleSignOut();
                  }}
              >
                  Sign Out
              </Link>
          </div>
        
          </div>
          <div className={`close-icon ${isSidebarVisible ? 'visible' : ''} z-[1]`} onClick={toggleSidebar}>
              <IoMdClose/>
          </div>
            
            <div className="open-icon z-[1] side-phone:top-[2rem]" onClick={toggleSidebar}>
              <CiMenuBurger/>
          </div>
    </nav>
  )
}

export default Navbar