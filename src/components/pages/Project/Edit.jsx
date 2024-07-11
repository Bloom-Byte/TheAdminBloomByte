import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PiLessThanBold } from "react-icons/pi";

const Edit = () => {

    const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen text-white font-bold text-[2rem] flex-col">
          <button onClick={() => navigate('/')} className=' text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
        <PiLessThanBold />
      </button>
   
      Edit
      
    </div>
  )
}

export default Edit