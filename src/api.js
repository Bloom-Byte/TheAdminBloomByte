import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'https://api.bytechain.dev/', 
  headers: {
    'Content-Type': 'application/json',
  },
});


// Function to handle user login
export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  // Send POST request to login endpoint with form data
  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

// Log the response to ensure you are getting the access_token
console.log('Login response:', response.data);


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
    { headers: { adminAuthorization: '123456789' } }
  );
  // Return response data
  return response.data;
};



// Function to update a project
export const updateProject = async (projectId, projectData) => {
  const data = qs.stringify(projectData);

  const token = localStorage.getItem('access_token'); 
  console.log('Retrieved token for updateProject:', token); // Debugging line

  const response = await api.put(`/projects/${projectId}/update`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

// Function to create a new project
export const createNewProject = async (project, files) => {
  const formData = new FormData();
  
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
 
  files.forEach(file => {
    formData.append('files', file);
  });

  console.log('FormData fields:');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  

  const token = localStorage.getItem('access_token'); 
  console.log('Retrieved token for createNewProject:', token); // Debugging line



  const response = await api.post('/projects/new', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};




// Function to create a new blog post
export const createBlogPost = async (title, content, status) => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZ…EyM30.jN-uN4Z5D-8TD0E0wAOfJDyOB8SbZ8XADpXhNjqBOgc';
    const encodedToken = encodeURIComponent(token);

    const response = await axios.post(
      'https://api.bytechain.dev/blogs/new',
      { title, content, status },
      {
        headers: {
          'Authorization': `Bearer ${encodedToken}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get published projects
export const getPublishedProjects = async () => {
  const token = localStorage.getItem('access_token'); 
  console.log('Retrieved token for getPublishedProjects:', token); // Debugging line

  const response = await api.get('/projects/published/all', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

// Function to delete all projects
export const deleteProject = async (project_id) => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token for deleteProject:', token);

  try {
    const response = await api.delete(`/projects/${project_id}/delete`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: { project_id: project_id }
    });
    console.log('Delete project response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || 'Failed to delete project');
  }
};

// Export the axios instance
export default api;