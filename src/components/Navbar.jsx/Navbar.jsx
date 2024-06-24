import React, { useState } from 'react'
import './Navbar.css'
import Logo from '../../assets/Logo.png'
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [activeButton, setActiveButton] = useState('projects');


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
          <div className={`nav-wall ${isSidebarVisible ? 'visible' : ''}`}>
          <div className="logo">
              <img src={Logo} alt="" />
          </div>
          <div className="nav-list">
              <Link  to="/projects" className={`link ${activeButton === 'projects' ? 'active' : ''}`} onClick={() => handleButtonClick('projects')}> Projects</Link>
              <Link to="/blogpost"  className={`link ${activeButton === 'blogpost' ? 'active' : ''}`} onClick={() => handleButtonClick('blogpost')}> Blog Posts </Link>
              <Link to="/career" className={`link ${activeButton === 'careerposts' ? 'active' : ''}`} onClick={() => handleButtonClick('careerposts')}> Career Posts</Link>
              
          </div>
        
          </div>
          <div className={`close-icon ${isSidebarVisible ? 'visible' : ''}`} onClick={toggleSidebar}>
              <IoMdClose/>
          </div>
            
            <div className="open-icon" onClick={toggleSidebar}>
              <CiMenuBurger/>
          </div>
    </nav>
  )
}

export default Navbar