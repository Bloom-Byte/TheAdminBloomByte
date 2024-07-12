import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import Card from '../../../assets/card.png'
import careerData from './careerdata'
import { useNavigate } from 'react-router-dom';
import Pics from './../../../assets/Pics.png'
import Pagination from '../Pagination';

const Careermain = ({ onJobsChange }) => {
  const [jobs, setJobs] = useState(careerData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    onJobsChange(jobs.length);
  }, [jobs, onJobsChange]);

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
    // Adjust current page if necessary after deletion
    const newTotalPages = Math.ceil((jobs.length - 1) / postsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  // Get current jobs
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col'>
        <div className='text-white  flex justify-center items-center relative py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0]'>
          <input type="text" placeholder='Search Career Posts' className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]' />
          <CiSearch className='text-[#9E9EA2] absolute mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]' />
        </div>
        <div className='flex justify-center items-center side-phone:pb-[5rem]'>
          <button onClick={() => navigate('/newcareer')} className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Job</button>
        </div>
      </div>
      
      {currentJobs.length > 0 ? (
        <div className='flex justify-center items-center gap-6 flex-wrap px-[9rem] IPad:px-[1rem]'>
          {currentJobs.map((job) => (
            <div key={job.id} className='IPad:w-[18rem] relative bg-[#052A49] w-[20rem] h-[13rem] overflow-hidden rounded-[1.5rem] flex flex-col py-5 px-8 gap-3'>
              <div className='relative z-[1] gap-2 flex flex-col'>
                <p className='text-white text-[1.3rem]'>{job.title}</p>
                <small className='text-white '>{job.description}</small>
                <div className='flex gap-4 pt-2'>
                  <button onClick={() => navigate('/editjob')} className='text-black bg-white px-4 py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] font-[600] transition duration-300 ease-in-out transform hover:scale-105'>
                    Edit Post
                  </button>
                  <button onClick={() => handleDelete(job.id)} className='text-white bg-[#D92D20] px-4 font-[550] py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>
                    Delete
                  </button>
                </div>
              </div>
              <div className='absolute top-[4.5rem] left-[9.5rem] z-0'>
                <img src={Card} alt='card' className='IPad:h-[8rem] w-[10rem] h-[8.3rem]' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col gap-[2rem] py-[3rem] side-phone:py-[1rem]'>
          <img src={Pics} alt="Pics" className='w-[10rem] h-[8rem] IPad:w-[9rem] IPad:h-[7rem] side-phone:w-[7rem] side-phone:h-[5rem]' />
          <p className='text-white text-2xl IPad:text-[1.5rem] side-phone:text-[1.2rem]'>No Career Post</p>
        </div>
      )}
      
      {jobs.length > 0 && (
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={jobs.length}
          paginate={paginate}
          currentPage={currentPage} 
        />
      )}
    </div> 
  )
}

export default Careermain