import React, {useState} from 'react'
import Navbar from './components/Navbar.jsx/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blogpostm from './components/pages/Blogpost/Blogpostm';
import Careermain from './components/pages/Career/Careermain';
import Project from './components/pages/Project/Project';
import NewPagination from './components/pages/Project/NewPagination';
import Edit from './components/pages/Project/Edit';
import Editblog from './components/pages/Blogpost/editblog';
import NewBlognation from './components/pages/Blogpost/NewBlognation';
import NewCareer from './components/pages/Career/NewCareer';

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
    <Router>
      <Routes>
        <Route path="/newpage" element={<NewPagination />} />
        <Route path="/newblog" element={<NewBlognation />} />
        <Route path='/newcareer' element={<NewCareer/>} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/editblog' element={<Editblog />} />
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Project onProjectsChange={handleProjectsChange} />} />
              <Route path="/blogpost" element={<Blogpostm onBlogPostsChange={handleBlogPostsChange} />} />
              <Route path="/career" element={<Careermain onJobsChange={handleJobsChange} />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App