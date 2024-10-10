import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import Card from '../../../assets/card.png'
import { useNavigate } from 'react-router-dom';
import Pics from './../../../assets/Pics.png'
import Pagination from '../Pagination';
import { getAllJobOpenings, openJobOpening, closeJobOpening } from '../../../api';

const Careermain = ({ onJobsChange }) => {
  // State to store job listings
  const [jobs, setJobs] = useState([]);
  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  // Hook to navigate between routes
  const navigate = useNavigate();
  // State to track the status of each job (open/closed)
  const [jobStatuses, setJobStatuses] = useState(() => {
    // Load job statuses from localStorage
    const savedStatuses = localStorage.getItem('jobStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  });

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Update the parent component when the number of jobs changes
  useEffect(() => {
    onJobsChange(jobs.length);
  }, [jobs, onJobsChange]);

  // Save job statuses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobStatuses', JSON.stringify(jobStatuses));
  }, [jobStatuses]);

  // Function to fetch job openings from the API
  const fetchJobs = async () => {
    try {
      const response = await getAllJobOpenings();
      console.log('Fetched job openings:', response);
      const fetchedJobs = response.data.job_openings;
      
      // Sort jobs by creation date or ID
      const sortedJobs = fetchedJobs.sort((a, b) => {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0) || b.id - a.id;
      });

      const jobsWithLoading = sortedJobs.map(job => ({
        ...job,
        isLoading: false,
        status: job.status || 'open' // Default to 'open' if status is not provided
      }));
      
      const initialStatuses = {};
      jobsWithLoading.forEach(job => {
        initialStatuses[job.id] = jobStatuses[job.id] !== undefined ? jobStatuses[job.id] : (job.status === 'open');
        console.log(`Job "${job.title}" status: ${job.status}`);
      });
      
      setJobStatuses(initialStatuses);
      setJobs(jobsWithLoading);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  };

  // Updated toggleJobStatus function
  const toggleJobStatus = async (jobId) => {
    try {
      // Set loading state for the job being toggled
      setJobs(prevJobs => prevJobs.map(job => 
        job.id === jobId ? { ...job, isLoading: true } : job
      ));

      // Find the job
      const job = jobs.find(job => job.id === jobId);
      const jobTitle = job?.title || 'Unknown Job';
      const currentStatus = jobStatuses[jobId] ? 'open' : 'closed';

      console.log(`Attempting to change job "${jobTitle}" status from ${currentStatus}`);

      // Call the appropriate API based on the current status
      let apiResponse;
      if (currentStatus === 'open') {
        apiResponse = await closeJobOpening(jobId);
      } else {
        apiResponse = await openJobOpening(jobId);
      }

      console.log(`API response for ${jobTitle}:`, apiResponse);

      // Check the current status of the job after the API call
      if (apiResponse.success) {
        // Directly update the status based on the action taken
        const newStatus = currentStatus === 'open' ? 'closed' : 'open';
        console.log(`Job "${jobTitle}" is now ${newStatus}`);

        // Update the local status state
        setJobStatuses(prevStatuses => ({
          ...prevStatuses,
          [jobId]: newStatus === 'open'
        }));

        // Reset loading state and update job status
        setJobs(prevJobs => prevJobs.map(job => 
          job.id === jobId ? { ...job, isLoading: false, status: newStatus } : job
        ));
      } else {
        console.error(`Failed to change status for job "${jobTitle}".`);
        // Reset loading state without changing the status
        setJobs(prevJobs => prevJobs.map(job => 
          job.id === jobId ? { ...job, isLoading: false } : job
        ));
      }
    } catch (error) {
      console.error('Error toggling job status:', error);
      // Reset loading state in case of error
      setJobs(prevJobs => prevJobs.map(job => 
        job.id === jobId ? { ...job, isLoading: false } : job
      ));
    }
  };

  // Calculate the indices for the current page of jobs
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Search and Add New Job section */}
      <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col'>
        <div className='text-white flex justify-center items-center relative py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0]'>
          <input type="text" placeholder='Search Career Posts' className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]' />
          <CiSearch className='text-[#9E9EA2] absolute mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]' />
        </div>
        <div className='flex justify-center items-center side-phone:pb-[5rem]'>
          <button onClick={() => navigate('/newcareer')} className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Job</button>
        </div>
      </div>
      
      {/* Display job cards or a message if no jobs are available */}
      {currentJobs.length > 0 ? (
        <div className='flex justify-center items-center gap-6 flex-wrap px-[9rem] IPad:px-[1rem]'>
          {currentJobs.map((job) => (
            <div key={job.id} className='IPad:w-[18rem] relative bg-[#052A49] w-[20rem] h-[13rem] overflow-hidden rounded-[1.5rem] flex flex-col py-5 px-8 gap-3'>
              <div className='relative z-[1] gap-2 flex flex-col'>
                <p className='text-white text-[1.3rem]'>{job.title}</p>
                <small className='text-white '>{job.description}</small>
                <div className='flex gap-4 pt-2'>
                  <button onClick={() => navigate(`/editcareer/${job.id}`)} className='text-black bg-white px-4 py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] font-[600] transition duration-300 ease-in-out transform hover:scale-105'>
                    Edit Post
                  </button>
                  <button 
                    onClick={() => toggleJobStatus(job.id)} 
                    className={`text-white ${jobStatuses[job.id] ? 'bg-[#22C55E]' : 'bg-[#D92D20]'} px-4 font-[550] py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105`}
                    disabled={job.isLoading}
                  > 
                
                    {job.isLoading ? 'Loading...' : (jobStatuses[job.id] ? 'Open' : 'Close')}
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
      
      {/* Pagination component */}
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