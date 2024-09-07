import React, { useState } from 'react';
import axios from 'axios';
import { PiLessThanBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

// Component for creating a new blog post
const NewBlognation = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [title, setTitle] = useState(''); // State for blog post title
    const [content, setContent] = useState(''); // State for blog post content
    const [status, setStatus] = useState('draft'); // State for blog post status (not directly used in this component)
    const [tags, setTags] = useState(''); // State for blog post tags
    const [error, setError] = useState(''); // State for error messages

    // Function to handle form submission
    const handleSubmit = async (status) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setError('No access token found');
            return;
        }

        // Validate input fields
        if (!title || !content) {
            setError('Input empty');
            return;
        }

        try {
            // Send POST request to create new blog post
            const response = await axios.post(
                'https://api.bytechain.dev/blogs/new',
                { 
                    title, 
                    content, 
                    status, 
                    tags: tags.split(',').map(tag => tag.trim()) // Split tags string into array and trim whitespace
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Blog post created successfully:', response.data);
            navigate('/blogpost'); // Navigate to blog post list on success
        } catch (error) {
            // Handle errors
            if (!error.response) {
                setError('No network');
            } else {
                setError(error.response?.data || error.message);
            }
        }
    };

    return (
      <div className='pb-20'>
        {/* Header section with back button and action buttons */}
        <div className='flex justify-center items-center pt-[4rem] side-phone:flex-col'>
          <div className='IPad:pr-[10rem] side-phone:pr-[0rem] flex justify-center items-center gap-[1rem] pr-[24rem]'>
            {/* Back button */}
            <button onClick={() => navigate('/blogpost')} className='text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
              <PiLessThanBold />
            </button>
            <p className='text-[1.4rem] text-white side-phone:text-[1.1rem]'>Add Post</p>
          </div>
          {/* Action buttons */}
          <div className='gap-4 flex side-phone:flex-col side-phone:pt-[4rem]'>
            <button onClick={() => handleSubmit('draft')} className='text-black bg-white px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[0.8rem]'>Save as Draft</button>
            <button onClick={() => handleSubmit('published')} className='text-white bg-[#067EF6] px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[0.8rem]'>Publish Now</button>
          </div>
        </div>
        
        {/* Post title input */}
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="postTitle" className='text-[grey] IPad:pr-[30rem] side-phone:pr-[11.9rem] pr-[47rem]'>Post Title</label>
          <input 
            type="text" 
            id="postTitle" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className='side-phone:w-[19rem] IPad:w-[40rem] w-[54rem] h-[3rem] rounded-[0.6rem] placeholder-gray-500 bg-[#052A49] text-white pl-6' 
            placeholder="Post Title" 
          />
        </div>

        {/* Post content textarea */}
        <div className='flex flex-col justify-center items-center pt-[4rem] gap-[1rem]'>
          <label htmlFor="postContent" className='text-[grey] IPad:pr-[28.9rem] side-phone:pr-[12rem] pr-[46rem]'>Post Content</label>
          <textarea 
            id="postContent" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className='IPad:w-[40rem] side-phone:w-[20rem] w-[54rem] h-[14rem] rounded-[0.4rem] pb-[10rem] placeholder-gray-500 bg-[#052A49] text-white pl-5' 
            placeholder="Post Content"
          ></textarea>
        </div>
        
        {/* Error message display */}
        {error && (
          <div className='flex justify-center items-center pt-[2rem] text-red-500'>
            {error}
          </div>
        )}
      </div>
    );
};

export default NewBlognation;
