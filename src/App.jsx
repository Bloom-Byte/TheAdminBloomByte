import React, {useState} from 'react'
import Navbar from './components/Navbar.jsx/Navbar'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';
import Blogpostm from './components/pages/Blogpost/Blogpostm';
import Careermain from './components/pages/Career/Careermain';
import Project from './components/pages/Project/Project';
import NewPagination from './components/pages/Project/NewPagination';
import Edit from './components/pages/Project/Edit';
import Editblog from './components/pages/Blogpost/editblog';
import NewBlognation from './components/pages/Blogpost/NewBlognation';
import NewCareer from './components/pages/Career/NewCareer';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import BackNavigationPreventer from './components/BackNavigationPreventer';
import PublicRoute from './context/PublicRoute';
import Editcareer from './components/pages/Career/editcareer';
const App = () => {

  const [hasProjects, setHasProjects] = useState(true);
  const [hasBlogPosts, setHasBlogPosts] = useState(true);
  const [hasJobs, setHasJobs] = useState(true);

  const handleProjectsChange = (projectCount) => {
    setHasProjects(projectCount > 0);
  };

  const handleBlogPostsChange = (blogPostCount) => {
    setHasBlogPosts(blogPostCount > 0);
  };

  const handleJobsChange = (jobCount) => {
    setHasJobs(jobCount > 0);
  };

  return (
    <AuthProvider>
      <Router>
        <BackNavigationPreventer />
        <Routes>
          <Route path="/" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/newpage" element={<PrivateRoute><NewPagination /></PrivateRoute>} />
          <Route path="/newblog" element={<PrivateRoute><NewBlognation /></PrivateRoute>} />
          <Route path="/newcareer" element={<PrivateRoute><NewCareer /></PrivateRoute>} />
          <Route path="/edit/:project_id" element={<PrivateRoute><Edit /></PrivateRoute>} />
          <Route path="/editblog/:blog_id" element={<PrivateRoute><Editblog /></PrivateRoute>} />
          <Route path="/editcareer/:job_opening_id" element={<PrivateRoute><Editcareer /></PrivateRoute>} />
         
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/projects" element={<PrivateRoute><Project onProjectsChange={handleProjectsChange} /></PrivateRoute>} />
                <Route path="/blogpost" element={<PrivateRoute><Blogpostm onBlogPostsChange={handleBlogPostsChange} /></PrivateRoute>} />
                <Route path="/career" element={<PrivateRoute><Careermain onJobsChange={handleJobsChange} /></PrivateRoute>} />
              </Routes>
            </>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App