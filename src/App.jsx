import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar.jsx/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blogpostm from './components/pages/Blogpost/Blogpostm';
import Careermain from './components/pages/Career/Careermain';
import Project from './components/pages/Project/Project';
import Pagination from './components/pages/Pagination';

const App = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Mock data (replace this with your actual data)
  const posts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    content: `This is the content of post ${i + 1}`,
  }));

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Project posts={currentPosts}/>} />
        <Route path="/blogpost" element={<Blogpostm />} />
        <Route path="/career" element={<Careermain />} />
      </Routes>
      <Pagination postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}/>
    </Router>
  )
}

export default App