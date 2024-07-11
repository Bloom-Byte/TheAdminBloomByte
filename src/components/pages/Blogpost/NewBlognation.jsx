import React from 'react'
import { PiLessThanBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

import { SlCloudUpload } from "react-icons/sl";

const NewBlognation = () => {
    const navigate = useNavigate();

    return (
      <div className='pb-20'>
      <div className='flex justify-center items-center pt-[4rem] side-phone:flex-col'>
           <div className=' IPad:pr-[10rem] side-phone:pr-[0rem] flex   justify-center items-center gap-[1rem]  pr-[24rem]'>
      <button onClick={() => navigate('/blogpost')} className=' text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
        <PiLessThanBold />
      </button>
      <p className='text-[1.4rem] text-white side-phone:text-[1.1rem]'>Add Post</p>
          </div>
          <div className='gap-4 flex side-phone:flex-col side-phone:pt-[4rem]'>
          <button   className= 'text-black bg-white px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[0.8rem]'>  Save as Draft </button>
          <button   className= 'text-white bg-[#067EF6] px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[0.8rem]'> Publish Now</button>
    
          </div>
           
            </div>
            <div className='flex flex-col items-center justify-center pt-[4rem] gap-1'>
            <label htmlFor="" className='text-[grey] IPad:pr-[33rem] side-phone:pr-[12rem] pr-[46rem]'>Cover Image</label>
     
        <div className=' flex side-phone:flex-col  justify-center items-center   overflow-hidden IPad:w-[40rem] side-phone:gap-[2rem]  side-phone:w-[20rem] w-[54rem] side-phone:h-[18rem] h-[10rem]  rounded-[0.4rem]  placeholder-gray-500  text-white  border-dashed border-2 border-[#052A49]'>
            <div className=' flex IPad:pr-[2rem] side-phone:pr-0 pr-[9rem] text-[grey] items-center gap-[2rem] side-phone:flex-col'  >
            <SlCloudUpload className=' cursor-pointer  transition duration-300 ease-in-out transform hover:scale-105  text-[4rem] font-[] text-[#067EF6] ' />
            <p className='text-[grey] side-phone:text-[0.8rem] flex-wrap flex'>Choose images, videos or drag and drop here</p>
            </div>
            <button className=' cursor-pointer transition duration-300 ease-in-out transform hover:scale-105  border-[1px] border-[grey] rounded-[0.9rem] px-[1.5rem] py-[1rem]  text-white IPad:px-[1rem] IPad:py-[0.5rem]'> Cover Image </button>
</div>

            </div>
            <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[47rem]'>Post Title</label>
          <input type="text"  className=' side-phone:w-[19rem] IPad:w-[40rem] w-[54rem] h-[3rem] rounded-[0.6rem]  placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Post Title"/>
            </div>
            <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="" className='text-[grey] IPad:pr-[28.9rem] side-phone:pr-[12rem] pr-[46rem]'>Post Content</label>
          <input type="text"  className=' IPad:w-[40rem] side-phone:w-[20rem] w-[54rem] h-[14rem] rounded-[0.4rem] pb-[10rem]   placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Post Content"/>
        </div>
            </div>
  )
}

export default NewBlognation