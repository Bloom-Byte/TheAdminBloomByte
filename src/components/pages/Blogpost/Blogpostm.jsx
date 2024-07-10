import React from 'react'

import { CiSearch } from "react-icons/ci";

const Blogpostm = () => {
  return (
    <div className='h-[70vh]'>
        <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col '> 

<div className='text-white flex justify-center items-center  relative  py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0] '>
<input type="text" placeholder='Search Projects'  className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]'/>
<CiSearch  className='text-[#9E9EA2]  absolute  mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]'/>
  </div>
  <div className='flex justify-center items-center side-phone:pb-[5rem]'>
<button   className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Post</button>

  </div>
</div>
    </div>
  )
}

export default Blogpostm