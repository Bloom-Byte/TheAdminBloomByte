import React, { useState } from 'react'
import './Navbar.css'
import Logo from '../../assets/Logo.png'
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
const Navbar = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);


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
              <a href=""> Projects</a>
              <a href=""> Blog Posts </a>
              <a href=""> Career Posts</a>
              
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