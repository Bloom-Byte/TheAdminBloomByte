import axios from 'axios';
import qs from 'qs';

// Create an axios instance with a base URL for making HTTP requests
const api = axios.create({
  baseURL: 'https://api.bytechain.dev/', // Base URL for the API
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Function to handle user login
export const login = async (username, password) => {
  const formData = new URLSearchParams(); // Create a URL-encoded form data object
  formData.append('username', username); // Add username to the form data
  formData.append('password', password); // Add password to the form data

  // Send POST request to login endpoint with form data
  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // Set content type for form data
    },
  });

  // Log the response to ensure you are getting the access_token
  console.log('Login response:', response.data);

  // Store the access token in the browser's local storage
  localStorage.setItem('access_token', response.data.access_token);

  // Return response data
  return response.data;
};

// Function to handle user signup
export const signup = async (username, email, password) => {
  // Send POST request to signup endpoint with user data
  const response = await api.post('/auth/signup', { username, email, password });
  // Return response data
  return response.data;
};

// Function to create a super admin
export const createSuperAdmin = async (username, email, password) => {
  // Send POST request to super admin signup endpoint with user data and admin authorization header
  const response = await api.post('/auth/super-admin/signup', 
    { username, email, password },
    { headers: { adminAuthorization: '123456789' } } // Admin authorization header
  );
  // Return response data
  return response.data;
};

// Function to update a project
export const updateProject = async (projectId, projectData) => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for updateProject:', token);

  // Send PUT request to update project endpoint with project data
  const response = await api.put(`/projects/${projectId}/update`, projectData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set content type for form data
      'Authorization': `Bearer ${token}`, // Include the access token in the request header
    },
  });

  // Return response data
  return response.data;
};

// Function to create a new project
export const createNewProject = async (project, files) => {
  const formData = new FormData(); // Create a FormData object to send the data
  
  // Append project details to the FormData object
  formData.append('name', project.name);
  formData.append('description', project.description);
  formData.append('start_date', project.start_date);
  formData.append('end_date', project.end_date);
  formData.append('client_goal', project.client_goal);
  formData.append('problems', project.problems);
  formData.append('solutions', project.solutions);
  formData.append('category', project.category);
  formData.append('sdlc', project.sdlc);
  formData.append('client_testimonial', project.client_testimonial);
 
  // Append each file to the FormData object
  files.forEach(file => {
    formData.append('files', file);
  });

  // Log the FormData fields for debugging
  console.log('FormData fields:');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for createNewProject:', token); // Debugging line

  // Send POST request to create new project endpoint with form data
  const response = await api.post('/projects/new', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set content type for form data
      'Authorization': `Bearer ${token}`, // Include the access token in the request header
    },
  });

  // Return response data
  return response.data;
};

// Function to get published projects
export const getPublishedProjects = async () => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for getPublishedProjects:', token); // Debugging line

  try {
    // Send GET request to fetch all published projects
    const response = await api.get('/projects/published/all', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the access token in the request header
      },
    });
    console.log('getPublishedProjects response:', response.data);
    return response.data; // Return response data
  } catch (error) {
    console.error('Error in getPublishedProjects:', error);
    throw error; // Throw error if request fails
  }
};

// Function to delete a project
export const deleteProject = async (project_id) => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for deleteProject:', token);

  try {
    // Send DELETE request to delete project endpoint with project ID
    const response = await api.delete(`/projects/${project_id}/delete`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the access token in the request header
      },
      data: { project_id: project_id } // Include the project ID in the request body
    });
    console.log('Delete project response:', response.data);
    return response.data; // Return response data
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || 'Failed to delete project'); // Throw error if request fails
  }
};

// Function to get published blogs
export const getPublishedBlogs = async () => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for getPublishedBlogs:', token);

  // Send GET request to fetch all published blogs
  const response = await api.get('/blogs/published/all', {
    headers: {
      'Authorization': `Bearer ${token}`, // Include the access token in the request header
    },
  });

  // Return response data
  return response.data;
};

// Function to fetch draft blogs
export const getDraftBlogs = async () => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for getDraftBlogs:', token);

  // Send GET request to fetch all draft blogs
  const response = await api.get('/blogs/drafts/all', {
    headers: {
      'Authorization': `Bearer ${token}`, // Include the access token in the request header
    },
  });

  // Return response data
  return response.data;
};

// Function to delete a blog
export const deleteBlog = async (blog_id) => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for deleteBlog:', token);

  try {
    // Send DELETE request to delete blog endpoint with blog ID
    const response = await api.delete(`/blogs/${blog_id}/delete`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the access token in the request header
      },
      data: { blog_id: blog_id } // Include the blog ID in the request body
    });
    console.log('Delete blog response:', response.data);
    return response.data; // Return response data
  } catch (error) {
    console.error('Error deleting blog:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || 'Failed to delete blog'); // Throw error if request fails
  }
};

// Function to update a blog post
export const updateBlog = async (blog_id, blogData) => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
  console.log('Retrieved token for updateBlog:', token);

  // Send PUT request to update blog endpoint with blog data
  const response = await api.put(`/blogs/${blog_id}/update`, blogData, {
    headers: {
      'Content-Type': 'application/json', // Set content type for JSON data
      'Authorization': `Bearer ${token}`, // Include the access token in the request header
    },
  });

  // Return response data
  return response.data;
};

// Function to add a new job opening
export const addNewJobOpening = async (jobData) => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token for addNewJobOpening:', token);

  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(jobData)) {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  }

  try {
    const response = await api.post('/job-openings/new', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Add new job opening response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding new job opening:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      throw new Error(JSON.stringify(error.response.data));
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request: ' + error.message);
    }
  }
};

// Function to get all job openings
export const getAllJobOpenings = async () => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token for getAllJobOpenings:', token);

  try {
    const response = await api.get('/job-openings/all', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Get all job openings response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching job openings:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(JSON.stringify(error.response.data));
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request: ' + error.message);
    }
  }
};

// Function to open a job opening
export const openJobOpening = async (jobOpeningId) => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await api.put(`/job-openings/${jobOpeningId}/open`, null, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error opening job:', error);
    throw error;
  }
};

// Function to close a job opening
export const closeJobOpening = async (jobOpeningId) => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await api.put(`/job-openings/${jobOpeningId}/close`, null, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error closing job:', error);
    throw error;
  }
};

// Function to update a job opening
export const updateJobOpening = async (jobOpeningId, jobData) => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token for updateJobOpening:', token);

  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(jobData)) {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  }

  try {
    const response = await api.put(`/job-openings/${jobOpeningId}/update`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Update job opening response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating job opening:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      throw new Error(JSON.stringify(error.response.data));
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request: ' + error.message);
    }
  }
};

// Export the axios instance for use in other parts of the application
export default api;