import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { getPublishedProjects, deleteProject } from '../../../api';
import { useNavigate } from 'react-router-dom';
import Pics from './../../../assets/Pics.png';
import Pagination from '../Pagination';

// Main component to display and manage projects
const Project = ({ onProjectsChange }) => {
  const [projects, setProjects] = useState([]); // State to store the list of projects
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
  const [postsPerPage] = useState(6); // State to store the number of projects per page
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to fetch projects from the server
  const fetchProjects = async () => {
    try {
      const response = await getPublishedProjects(); // Fetch published projects from the server
      console.log('Fetched projects:', response);
      const fetchedProjects = response.data.projects; // Extract projects from the response
      
      // Sort projects by creation date or ID
      const sortedProjects = fetchedProjects.sort((a, b) => {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0) || b.id - a.id;
      });

      console.log('Sorted projects:', sortedProjects);
      setProjects(sortedProjects); // Update the state with sorted projects
      localStorage.setItem('projects', JSON.stringify(sortedProjects)); // Save projects to local storage
      localStorage.setItem('lastFetchTime', new Date().getTime().toString()); // Save the fetch time to local storage
      onProjectsChange(sortedProjects.length); // Notify parent component about the number of projects
    } catch (error) {
      console.error('Error fetching published projects:', error); // Log any errors
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Update projects when local storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'projects') {
        const updatedProjects = JSON.parse(e.newValue); // Parse the updated projects from local storage
        setProjects(updatedProjects); // Update the state with the new projects
      }
    };

    window.addEventListener('storage', handleStorageChange); // Listen for storage changes
    return () => window.removeEventListener('storage', handleStorageChange); // Clean up the event listener
  }, []);

  // Function to handle project deletion
  const handleDelete = async (project_id) => {
    try {
      await deleteProject(project_id); // Delete the project from the server
      await fetchProjects(); // Refetch projects after deletion
    } catch (error) {
      console.error('Error deleting project:', error.message); // Log any errors
    }
  };

  // Calculate the indices for the current page of projects
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost); // Get the projects for the current page

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=' '>
      {/* Search and Add New Project section */}
      <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col '>
        <div className='text-white flex justify-center items-center  relative  py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0] '>
          <input type="text" placeholder='Search Projects' className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]' />
          <CiSearch className='text-[#9E9EA2]  absolute  mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]' />
        </div>
        <div className='flex justify-center items-center side-phone:pb-[5rem]'>
          <button onClick={() => navigate('/newpage')} className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Project</button>
        </div>
      </div>

      {/* Display the list of projects */}
      <div className='flex justify-center items-center gap-6   flex-wrap px-[12rem] IPad:px-[1rem]'>
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => {
            console.log('Rendering project:', project);
            return (
              <div key={project.id} className='flex justify-center flex-col'>
                <div className='image_urls bg-white side-phone:w-[16.5rem] side-phone:h-[9.2rem] w-[18rem]  h-[10rem] rounded-lg'>
                  <img 
                    src={project.image_urls && project.image_urls.length > 0 ? project.image_urls[0] : ''} 
                    alt={project.name} 
                    className='w-full h-full object-cover rounded-lg' 
                    onError={(e) => {
                      console.error('Error loading image:', e);
                      e.target.src = 'path/to/fallback/image.jpg'; // Fallback image if the original fails to load
                    }}
                  />
                </div>
                <div className='bg-black side-phone:w-[16.5rem] side-phone:h-[9.2rem] w-[18rem] h-[9rem] mt-[-1rem] overflow-hidden rounded-b-[1rem]'>
                  <p className='name text-white py-2 px-2 font-[600] text-[1.2rem] IPad:text-[1rem] text-ellipsis overflow-hidden whitespace-nowrap'>
                    {project.name}
                  </p>
                  <div className='flex pl-2 gap-4 pt-2'>
                    <button onClick={() => navigate(`/edit/${project.id}`)} className='text-black bg-white px-4 py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] font-[600] transition duration-300 ease-in-out transform hover:scale-105'>
                      Edit Project
                    </button>
                    <button onClick={() => handleDelete(project.id)} className='text-white bg-[#D92D20] px-4 font-[550] py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Display a message if there are no projects
          <div className=' flex justify-center items-center flex-col gap-[2rem] py-[3rem] side-phone:py-[1rem]'>
            <img src={Pics} alt="Pics" className='w-[10rem] h-[8rem] IPad:w-[9rem] IPad:h-[7rem] side-phone:w-[7rem] side-phone:h-[5rem]' />
            <p className='text-white text-2xl IPad:text-[1.5rem] side-phone:text-[1.2rem]'>No Projects</p>
          </div>
        )}
      </div>

      {/* Display pagination controls if there are projects */}
      {projects.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={projects.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Project;