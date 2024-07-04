import React from 'react'
import Navbar from './components/Navbar.jsx/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blogpostm from './components/pages/Blogpost/Blogpostm';
import Careermain from './components/pages/Career/Careermain';
import Project from './components/pages/Project/Project';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Project />} />
        <Route path="/blogpost" element={<Blogpostm />} />
        <Route path="/career" element={<Careermain />} />
      </Routes>
    </Router>
  )
}

export default App