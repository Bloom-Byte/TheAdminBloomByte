import React, { useState } from 'react';
import { PiLessThanBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { createBlogPost } from '../../../api'; // Import the createBlogPost function

const NewBlognation = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Define the handleSubmit function
    const handleSubmit = async (status) => {
      try {
          const response = await createBlogPost(title, content, status); // Removed tags parameter

          if (response) {
              console.log('Blog post created successfully:', response);
              navigate('/blogpost');
          } else {
              console.error('Error creating blog post:', response);
          }
      } catch (error) {
          console.error('An error occurred while creating the blog post:', error.response?.data || error.message); // Log the error response
      }
  };

    return (
      <div className='pb-20'>
        <div className='flex justify-center items-center pt-[4rem] side-phone:flex-col'>
          <div className='IPad:pr-[10rem] side-phone:pr-[0rem] flex justify-center items-center gap-[1rem] pr-[24rem]'>
            <button onClick={() => navigate('/blogpost')} className='text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
              <PiLessThanBold />
            </button>
            <p className='text-[1.4rem] text-white side-phone:text-[1.1rem]'>Add Post</p>
          </div>
          <div className='gap-4 flex side-phone:flex-col side-phone:pt-[4rem]'>
            <button onClick={() => handleSubmit('draft')} className='text-black bg-white px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[0.8rem]'>Save as Draft</button>
            <button onClick={() => handleSubmit('published')} className='text-white bg-[#067EF6] px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[0.8rem]'>Publish Now</button>
          </div>
        </div>
        
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="postTitle" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[47rem]'>Post Title</label>
          <input type="text" id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} className='side-phone:w-[19rem] IPad:w-[40rem] w-[54rem] h-[3rem] rounded-[0.6rem] placeholder-gray-500 bg-[#052A49] text-white pl-6' placeholder="Post Title" />
        </div>
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="postContent" className='text-[grey] IPad:pr-[28.9rem] side-phone:pr-[12rem] pr-[46rem]'>Post Content</label>
          <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} className='IPad:w-[40rem] side-phone:w-[20rem] w-[54rem] h-[14rem] rounded-[0.4rem] pb-[10rem] placeholder-gray-500 bg-[#052A49] text-white pl-5' placeholder="Post Content"></textarea>
        </div>
      </div>
    );
};

export default NewBlognation;
