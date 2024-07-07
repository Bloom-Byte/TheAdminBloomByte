import React from 'react'
import { PiLessThanBold } from "react-icons/pi";

import { useNavigate } from 'react-router-dom';


const NewPagination = () => {

  const navigate = useNavigate();

  return (
    <div className='flex pt-[4rem]  justify-center items-center gap-[1rem]'>
      <button onClick={() => navigate('/')} className=' text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105'>
        <PiLessThanBold />
      </button>
      <p className='text-[1.4rem] text-white '>Project Details</p>
    </div>
  )
}

export default NewPagination