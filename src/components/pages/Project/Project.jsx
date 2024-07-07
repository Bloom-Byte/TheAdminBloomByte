import React from 'react'
import { CiSearch } from "react-icons/ci";
import projectData from './projectdata';

const Project = () => {
  return (
    <div className=' '>
      <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col '> 

      <div className='text-white flex justify-center items-center  relative  py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0] '>
      <input type="text" placeholder='Search Projects'  className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]'/>
      <CiSearch  className='text-[#9E9EA2]  absolute  mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]'/>
        </div>
        <div className='flex justify-center items-center side-phone:pb-[2rem]'>
 <button className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Project</button>
    
        </div>
      </div>
      

      {/* This is for the bog box post */}
      <div className='flex justify-center items-center gap-6   flex-wrap px-[12rem] IPad:px-[1rem]'>
      {projectData.map((project) => (
        <div key={project.id} className='flex justify-center flex-col'>
          <div className='bg-white side-phone:w-[15rem] side-phone:h-[9.2rem] w-[18rem]  h-[10rem] rounded-lg'></div>
          <div className='bg-black side-phone:w-[15rem] side-phone:h-[9.2rem] w-[18rem] h-[9rem] mt-[-1rem] overflow-hidden rounded-b-[1rem] 
          
           '>
            <p className='text-white py-2 px-2 font-[600] text-[1.2rem] IPad:text-[1rem]'>
              {project.title}
            </p>
            <div className='flex pl-2 gap-4 pt-2'>
            <button className='text-black bg-white px-4 py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] font-[600] transition duration-300 ease-in-out transform hover:scale-105'>
              Edit Project
            </button>
            <button className='text-white bg-[#D92D20] px-4 font-[550] py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>
              Delete
            </button>
          
            </div>
            </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Project