import React, { useState, useEffect } from 'react';
import Card from '../../../assets/card.png';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Pics from './../../../assets/Pics.png';
import Pagination from '../Pagination';
import { getPublishedBlogs, getDraftBlogs, deleteBlog } from '../../../api';

// Main component to display and manage blog posts
const Blogpostm = ({ onBlogPostsChange }) => {
  const [blogPosts, setBlogPosts] = useState([]); // State to store the list of blog posts
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
  const [postsPerPage] = useState(6); // State to store the number of posts per page
  const navigate = useNavigate(); // Hook to navigate between pages
  const [activeTab, setActiveTab] = useState('published'); // State to track the active tab (published or draft)

  // Effect hook to fetch blog posts when the component mounts or the active tab changes
  useEffect(() => {
    const fetchBlogs = async () => {
      const storedBlogs = localStorage.getItem(`blogs_${activeTab}`);
      const lastFetchTime = localStorage.getItem(`lastFetchTime_${activeTab}`);
      const currentTime = new Date().getTime();
      const ONE_SECOND = 1000; // 1 second in milliseconds

      if (storedBlogs) {
        console.log('Using stored blogs');
        const blogsData = JSON.parse(storedBlogs);
        setBlogPosts(blogsData);
        onBlogPostsChange(blogsData.length);

        // Check if we need to fetch fresh data
        if (!lastFetchTime || currentTime - parseInt(lastFetchTime) > ONE_SECOND) {
          await fetchFreshData();
        }
      } else {
        await fetchFreshData();
      }
    };

    // Function to fetch fresh blog data from the server
    const fetchFreshData = async () => {
      try {
        const response = activeTab === 'published' ? await getPublishedBlogs() : await getDraftBlogs();
        console.log('Fetched fresh blog posts:', response);
        const fetchedBlogPosts = Array.isArray(response.data.blogs) ? response.data.blogs : [];

         // Sort blog posts by creation date or ID
        const sortedBlogPosts = fetchedBlogPosts.sort((a, b) => {
          return new Date(b.created_at || 0) - new Date(a.created_at || 0) || b.id - a.id;
        });

        
        console.log('Sorted blog posts:', sortedBlogPosts);
        setBlogPosts(sortedBlogPosts);
        localStorage.setItem(`blogs_${activeTab}`, JSON.stringify(sortedBlogPosts));
        localStorage.setItem(`lastFetchTime_${activeTab}`, new Date().getTime().toString());
        onBlogPostsChange(sortedBlogPosts.length);
        setCurrentPage(1); // Reset to the first page whenever the active tab changes
      } catch (error) {
        console.error(`Error fetching ${activeTab} blogs:`, error);
      }
    };

    fetchBlogs();
  }, [onBlogPostsChange, activeTab]);

  // Function to handle blog post deletion
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id); // Delete the blog post from the server
      const updatedBlogPosts = blogPosts.filter(post => post.id !== id);
      setBlogPosts(updatedBlogPosts);
      localStorage.setItem(`blogs_${activeTab}`, JSON.stringify(updatedBlogPosts));
      localStorage.setItem(`lastFetchTime_${activeTab}`, new Date().getTime().toString());
      onBlogPostsChange(updatedBlogPosts.length);
      const newTotalPages = Math.ceil(updatedBlogPosts.length / postsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting blog:', error.message);
      // Optionally, you can show an error message to the user here
    }
  };

  // Function to add a new blog post to the list
  const addNewBlogPost = (newPost) => {
    setBlogPosts(prevPosts => {
      const updatedPosts = [...prevPosts, newPost];
      const newTotalPages = Math.ceil(updatedPosts.length / postsPerPage);
      setCurrentPage(newTotalPages);
      localStorage.setItem(`blogs_${activeTab}`, JSON.stringify(updatedPosts));
      localStorage.setItem(`lastFetchTime_${activeTab}`, new Date().getTime().toString());
      return updatedPosts;
    });
  };

  // Calculate the indices for the current page of blog posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to format the date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className=''>
      {/* Search and Add New Post section */}
      <div className='flex justify-center gap-[2.5rem] IPad:gap-[2rem] side-phone:gap-2 side-phone:flex-col'>
        <div className='text-white flex justify-center items-center relative py-[5.7rem] side-phone:pt-[7rem] side-phone:pb-[1rem] IPad:pl-[4rem] side-phone:py-[11rem] side-phone:pl-[0]'>
          <input type="text" placeholder='Search Projects' className='bg-[#052A49] pl-[3.6rem] w-[30rem] h-[3rem] rounded-[1rem] IPad:w-[20rem] side-phone:w-[14rem]' />
          <CiSearch className='text-[#9E9EA2] absolute mr-[26rem] IPad:mr-[16rem] text-[1.5rem] side-phone:mr-[10.5rem]' />
        </div>
        <div className='flex justify-center items-center side-phone:pb-[5rem]'>
          <button onClick={() => navigate('/newblog')} className='text-white bg-[#067EF6] px-4 py-3.5 text-[0.9rem] rounded-[2rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>Add New Post</button>
        </div>
      </div>

      {/* Tab buttons for switching between published and draft posts */}
      {blogPosts.length > 0 && (
        <div className='relative bottom-[4rem] right-[14.3rem] IPad:right-[6.5rem] side-phone:right-[0rem] side-phone:bottom-[2rem] flex justify-center'>
          <button 
            onClick={() => setActiveTab('published')}
            className={`IPad:text-[0.7rem] side-phone:text-[0.6rem] text-white px-5 py-3.5 rounded-l-[1.5rem] transition-colors duration-300 ease-in-out ${
              activeTab === 'published' ? 'bg-[#067EF6]' : 'bg-[#475467]'
            }`}
          >
            Published
          </button>
          <button 
            onClick={() => setActiveTab('draft')}
            className={`IPad:text-[0.7rem] side-phone:text-[0.6rem] text-white px-5 py-3.5 rounded-r-[1.5rem] transition-colors duration-300 ease-in-out ${
              activeTab === 'draft' ? 'bg-[#067EF6]' : 'bg-[#475467]'
            }`}
          >
            Draft
          </button>
        </div>
      )}

      {/* Display the list of blog posts */}
      {currentBlogPosts.length > 0 ? (
        <div className='flex justify-center items-center gap-6 flex-wrap px-[9rem] IPad:px-[1rem]'>
          {currentBlogPosts.map((post) => (
            <div key={post.id} className='IPad:w-[18rem] relative bg-[#052A49] w-[20rem] h-[13rem] overflow-hidden rounded-[1.5rem] flex flex-col py-5 px-8 gap-3'>
              <div className='relative z-[1]'>
                <p className='text-white'>{post.title}</p>
                <small className='text-[#9E9EA2]'>{formatDate(post.created_at)}</small>
                <div className='flex gap-4 pt-2'>
                  <button onClick={() => navigate(`/editblog/${post.id}`)} className='text-black bg-white px-4 py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] font-[600] transition duration-300 ease-in-out transform hover:scale-105'>
                    Edit Post
                  </button>
                  <button onClick={() => handleDelete(post.id)} className='text-white bg-[#D92D20] px-4 font-[550] py-3.5 text-[0.9rem] rounded-[1.5rem] IPad:text-[0.7rem] side-phone:text-[0.6rem] transition duration-300 ease-in-out transform hover:scale-105'>
                    Delete
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
        // Display a message if there are no blog posts
        <div className='flex justify-center items-center flex-col gap-[2rem] py-[3rem] side-phone:py-[1rem]'>
          <img src={Pics} alt="Pics" className='w-[10rem] h-[8rem] IPad:w-[9rem] IPad:h-[7rem] side-phone:w-[7rem] side-phone:h-[5rem]' />
          <p className='text-white text-2xl IPad:text-[1.5rem] side-phone:text-[1.2rem]'>No Blog Posts</p>
        </div>
      )}

      {/* Display pagination controls if there are blog posts */}
      {blogPosts.length > 0 && (
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={blogPosts.length}
          paginate={paginate}
          currentPage={currentPage} 
        />
      )}
    </div>
  );
};

export default Blogpostm;