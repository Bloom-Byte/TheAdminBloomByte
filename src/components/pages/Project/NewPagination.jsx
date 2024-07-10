import React from 'react'
import { PiLessThanBold } from "react-icons/pi";

import { useNavigate } from 'react-router-dom';
import { SlCloudUpload } from "react-icons/sl";

const NewPagination = () => {

  const navigate = useNavigate();

  return (
  <div className='pb-20'>
    <div className=' IPad:pr-[27rem] side-phone:pr-[7rem] flex pt-[4rem]  justify-center items-center gap-[1rem]  pr-[37rem]'>
      <button onClick={() => navigate('/')} className=' text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
        <PiLessThanBold />
      </button>
      <p className='text-[1.4rem] text-white side-phone:text-[1.2rem]'>Project Details</p>
      </div>
      <div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[42.5rem]'>Project Name</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Project Name"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[10rem] pr-[39rem]'>Project Description</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Description"/>
        </div>
        <div className='flex side-phone:flex-col justify-center items-center pt-[4rem] gap-[1rem] side-phone:gap-[1.8rem]'>
          <div className='flex flex-col side-phone:gap-2'>
          <label htmlFor="" className='text-[grey] side-phone:pl-[0.5rem]'>Project Starting Date</label>
          <input type="text" className=' side-phone:w-[19rem] IPad:w-[19.5rem] w-[24rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="dd/mm/yyyy" />
          </div>
          <div className='flex flex-col side-phone:gap-2'>
          <label htmlFor="" className='text-[grey] side-phone:pl-[0.5rem]'>Project End Date</label>
          <input type="text" className=' side-phone:w-[19rem] IPad:w-[19.5rem] w-[24rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="dd/mm/yyyy" />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[33rem] side-phone:pr-[12rem] pr-[43rem]'>Client Goal</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Client Goal"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[29rem] side-phone:pr-[6rem] pr-[38rem]'>Problems Encountered</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Problems Encountered"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[33rem] side-phone:pr-[12rem] pr-[43rem]'>Solutions</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Solutions"/>
        </div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[33rem] side-phone:pr-[12rem] pr-[41rem]'>SDLC Process</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="SDLC Process"/>
        </div>
        <div className='flex justify-center pt-[4rem]'>
        <div className=' flex side-phone:flex-col  justify-center items-center   overflow-hidden IPad:w-[40rem] side-phone:gap-[2rem]  side-phone:w-[20rem] w-[49rem] side-phone:h-[18rem] h-[10rem]  rounded-[0.4rem]  placeholder-gray-500  text-white  border-dashed border-2 border-[#052A49]'>
            <div className=' flex IPad:pr-[2rem] side-phone:pr-0 pr-[9rem] text-[grey] items-center gap-[2rem] side-phone:flex-col'  >
            <SlCloudUpload className=' cursor-pointer  transition duration-300 ease-in-out transform hover:scale-105  text-[4rem] font-[] text-[#067EF6] ' />
            <p className='text-[grey] side-phone:text-[0.8rem] flex-wrap flex'>Choose images, videos or drag and drop here</p>
            </div>
            <button className=' cursor-pointer transition duration-300 ease-in-out transform hover:scale-105  border-[1px] border-[grey] rounded-[0.9rem] px-[1.5rem] py-[1rem]  text-white IPad:px-[1rem] IPad:py-[0.5rem]'> Cover Image </button>
</div>

        </div>
      
      </div>
      <div  className=' IPad:pr-[31.5rem] side-phone:pr-[0rem] pr-[40rem]  flex justify-center pt-[4rem] '> 
      <button   className= 'text-white bg-[#067EF6] px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105'>  Continue </button>
      </div>
      </div>
  )
}

export default NewPagination