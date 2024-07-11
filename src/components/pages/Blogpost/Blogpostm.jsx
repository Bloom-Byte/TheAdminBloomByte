import React, { useState, useEffect } from 'react'
import Card from '../../../assets/card.png'
import { CiSearch } from "react-icons/ci";
import blogData from './blogdata';
import { useNavigate } from 'react-router-dom';
import Pics from './../../../assets/Pics.png'
import Pagination from '../Pagination';

const Blogpostm = ({ onBlogPostsChange }) => {
  const [blogPosts, setBlogPosts] = useState(blogData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('published');

  useEffect(() => {
    onBlogPostsChange(blogPosts.length);
  }, [blogPosts, onBlogPostsChange]);

  const handleDelete = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
    // Adjust current page if necessary after deletion
    const newTotalPages = Math.ceil((blogPosts.length - 1) / postsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  const addNewBlogPost = (newPost) => {
    setBlogPosts(prevPosts => {
      const updatedPosts = [...prevPosts, newPost];
      const newTotalPages = Math.ceil(updatedPosts.length / postsPerPage);
      setCurrentPage(newTotalPages); // Move to the last page
      return updatedPosts;
    });
  };

  // Get current blog posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=''>
      <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col'>
        <div className='text-white  flex justify-center items-center relative py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0]'>
          <input type="text" placeholder='Search Projects' className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]' />
          <CiSearch className='text-[#9E9EA2] absolute mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]' />
        </div>
        <div className='flex justify-center items-center side-phone:pb-[5rem]'>
          <button onClick={() => navigate('/newblog')} className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Post</button>
        </div>
      </div>
      {blogPosts.length > 0 && (
      <div className=' relative bottom-[4rem] right-[14.3rem]   IPad:right-[6.5rem] side-phone:right-[0rem]  side-phone:bottom-[2rem] flex justify-center '><button 
          onClick={() => setActiveTab('published')}
          className={` IPad:text-[0.7rem] side-phone:text-[0.6rem]  text-white px-5 py-3.5 rounded-l-[1.5rem] transition-colors duration-300 ease-in-out ${
            activeTab === 'published' ? 'bg-[#067EF6]' : 'bg-[#475467]'
          }`}
        >
          Published
        </button>
        <button 
          onClick={() => setActiveTab('draft')}
          className={` IPad:text-[0.7rem] side-phone:text-[0.6rem] text-white px-5 py-3.5 rounded-r-[1.5rem] transition-colors duration-300 ease-in-out ${
            activeTab === 'draft' ? 'bg-[#067EF6]' : 'bg-[#475467]'
          }`}
        >
          Draft
        </button>
        </div>
      )}
      {currentBlogPosts.length > 0 ? (
        <div className='flex justify-center items-center gap-6 flex-wrap px-[9rem] IPad:px-[1rem]'>
          {currentBlogPosts.map((post) => (
            <div key={post.id} className=' IPad:w-[18rem] relative bg-[#052A49] w-[20rem] h-[13rem] overflow-hidden rounded-[1.5rem] flex flex-col py-5 px-8 gap-3'>
              <div className='relative z-[1]'>
                <p className='text-white '>{post.title}</p>
                <small className='text-[#9E9EA2]'>{post.date}</small>
                <div className='flex gap-4 pt-2'>
                  <button onClick={() => navigate('/editblog')} className='text-black bg-white px-4 py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] font-[600] transition duration-300 ease-in-out transform hover:scale-105'>
                    Edit Post
                  </button>
                  <button onClick={() => handleDelete(post.id)} className='text-white bg-[#D92D20] px-4 font-[550] py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>
                    Delete
                  </button>
                </div>
              </div>
              <div className='absolute top-[4.5rem] left-[9.5rem] z-0'>
                <img src={Card} alt='card' className=' IPad:h-[8rem] w-[10rem] h-[8.3rem] ' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col gap-[2rem] py-[3rem] side-phone:py-[1rem]'>
          <img src={Pics} alt="Pics" className='w-[10rem] h-[8rem] IPad:w-[9rem] IPad:h-[7rem] side-phone:w-[7rem] side-phone:h-[5rem]' />
          <p className='text-white text-2xl IPad:text-[1.5rem] side-phone:text-[1.2rem]'>No Blog Posts</p>
        </div>
      )}
      
      {blogPosts.length > 0 && (
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={blogPosts.length}
          paginate={paginate}
          currentPage={currentPage} 
        />
      )}
    </div>
  )
}

export default Blogpostm