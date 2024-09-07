import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PiLessThanBold } from "react-icons/pi";
import { updateProject, getPublishedProjects } from '../../../api';

// This component allows users to edit a project
const Edit = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const { project_id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState({}); // State to store project details
  const [image, setImage] = useState(null); // State to store the selected image file
  const [previewImage, setPreviewImage] = useState(''); // State to store the preview URL of the image
  const [error, setError] = useState(''); // State to store error messages
  const [success, setSuccess] = useState(false); // State to indicate if the update was successful
  const [isLoading, setIsLoading] = useState(true); // State to indicate if the data is still loading

  // List of fields that can be edited
  const editableFields = [
    'name',
    'description',
    'category',
    'client_goal',
    'sdlc',
    'start_date',
    'end_date',
    'client_testimonial',
    'problems',
    'solutions'
  ];

  // Fetch project details when the component loads
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await getPublishedProjects(); // Fetch all published projects
        console.log('API Response:', response);
        
        const projects = response.data.projects || []; // Get the list of projects
        console.log('Projects:', projects);
        console.log('Looking for project with ID:', project_id);
        
        const projectData = projects.find(p => p.id === project_id); // Find the project with the matching ID
        console.log('Found project:', projectData);
        
        if (projectData) {
          setProject(projectData); // Set the project details in state
          setPreviewImage(projectData.image_url); // Set the current image URL for preview
        } else {
          console.log('Project IDs in the response:', projects.map(p => p.id));
          setError(`Project not found. Available IDs: ${projects.map(p => p.id).join(', ')}`); // Show error if project not found
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError('Failed to fetch project details: ' + error.message); // Show error if fetching fails
      } finally {
        setIsLoading(false); // Indicate that loading is complete
      }
    };

    fetchProjectDetails();
  }, [project_id]);

  // Handle changes to text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: value // Update the project state with the new value
    }));
  };

  // Handle changes to the image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the selected image file
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Clear any previous errors
    setSuccess(false); // Reset the success state

    try {
      const formData = new FormData(); // Create a FormData object to send the data
      editableFields.forEach(key => {
        formData.append(key, project[key]); // Add each editable field to the FormData
      });
      if (image) {
        formData.append('image', image); // Add the image file to the FormData if selected
        console.log('Image appended to FormData:', image);
      } else {
        console.log('No new image selected');
      }

      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Log the contents of the FormData
      }

      const updatedProject = await updateProject(project_id, formData); // Send the update request to the server
      console.log('Server response:', updatedProject);

      setSuccess(true); // Indicate that the update was successful

      // Update the project in local storage
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const updatedProjects = storedProjects.map(p => 
        p.id === project_id ? { ...p, ...updatedProject.data } : p
      );
      
      console.log('Updated project in local storage:', updatedProjects.find(p => p.id === project_id));
      localStorage.setItem('projects', JSON.stringify(updatedProjects)); // Save the updated projects to local storage

      // Update the project state with the new data
      setProject(prevProject => {
        const newProject = { ...prevProject, ...updatedProject.data };
        console.log('New project state:', newProject);
        return newProject;
      });

      // Redirect to the projects page after a short delay
      setTimeout(() => {
        console.log('Final project state before navigation:', project);
        navigate('/projects');
      }, 2000);
    } catch (error) {
      setError('Failed to update project. Please try again.'); // Show error if the update fails
      console.error('Error updating project:', error);
    }
  };

  // Show a loading message while the project details are being fetched
  if (isLoading) {
    return <div className="text-white text-center mt-8">Loading project details...</div>;
  }

  // Show an error message if there was an error fetching the project details
  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  // Render the form to edit the project
  return (
    <div className="flex justify-center items-center min-h-screen text-white font-bold text-[2rem] flex-col p-4 mb-[5rem]">
      {/* Back button */}
      <button onClick={() => navigate('/projects')} className='mb-4 text-[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 sm:text-[1.2rem] sm:px-[1.3rem] sm:py-[1.3rem]'>
        <PiLessThanBold />
      </button>
      <h1 className="text-2xl mb-4">Edit Project</h1>

      {isLoading ? (
        <p className="text-lg sm:text-base">Loading project details...</p>
      ) : error ? (
        <p className="text-red-500 text-lg sm:text-base">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
          {editableFields.map((key) => (
            <input
              key={key}
              type={key.includes('date') ? 'datetime-local' : 'text'}
              placeholder={key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
              value={project[key] || ''}
              onChange={handleInputChange}
              name={key}
              className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base"
              required
            />
          ))}

          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base"
            accept="image/*"
          />
          {previewImage && (
            <img src={previewImage} alt="Project preview" className="mt-2 max-w-xs rounded" />
          )}

          <button type="submit" className="px-4 py-2 bg-[#067EF6] rounded transition duration-300 ease-in-out transform hover:scale-105 text-xl sm:text-lg">
            Update Project
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-2 text-lg sm:text-base">{error}</p>}
      {success && <p className="text-green-500 mt-2 text-lg sm:text-base">Project updated successfully!</p>}
    </div>
  );
};

export default Edit;