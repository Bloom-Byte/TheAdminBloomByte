import React from 'react'
import { PiLessThanBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
const NewCareer = () => {

    const navigate = useNavigate();

  return (
      <div className='pb-20'>
           <div className=' IPad:pr-[27rem] side-phone:pr-[7rem] flex pt-[4rem]  justify-center items-center gap-[1rem]  pr-[37rem]'>
      <button onClick={() => navigate('/career')} className=' text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
        <PiLessThanBold />
      </button>
      <p className='text-[1.4rem] text-white side-phone:text-[1.2rem]'>Add Job</p>
          </div>
          <div>
          <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[42.5rem]'>Job Title</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Job Title"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[3rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[42.5rem]'>Job Type</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Job Type"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[3rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[42.5rem]'>Location</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Location"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[3rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[28rem] side-phone:pr-[10rem] pr-[40rem]'>Compensation</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Compensation"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[3rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[28rem] side-phone:pr-[10rem] pr-[40rem]'>Job Description</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Job Description"/>
              </div>
              <div className='flex flex-col justify-center items-center pt-[3rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[25rem] side-phone:pr-[8rem] pr-[38rem]'>Key Responsibilities</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Key Responsibilities"/>
              </div>
              <div className='flex flex-col justify-center items-center pt-[3rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[27rem] side-phone:pr-[10.5rem] pr-[40.5rem]'>Qualifications</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Qualifications"/>
        </div>
          </div>
          <div  className=' IPad:pr-[30.8rem] side-phone:pr-[0rem] pr-[40rem]  flex justify-center pt-[3rem] '> 
      <button   className= 'text-white bg-[#067EF6] px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105'>  Continue </button>
      </div>
    
    </div>
  )
}

export default NewCareer