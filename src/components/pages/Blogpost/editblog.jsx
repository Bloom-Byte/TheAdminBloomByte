import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PiLessThanBold } from "react-icons/pi";
import { updateBlog, getPublishedBlogs, getDraftBlogs } from '../../../api'; // Adjust the import path as necessary

// Main component to edit a blog post
const EditBlog = () => {
	const navigate = useNavigate(); // Hook to navigate between pages
	const { blog_id } = useParams(); // Get the blog ID from the URL
	const [title, setTitle] = useState(''); // State to store the blog title
	const [content, setContent] = useState(''); // State to store the blog content
	const [status, setStatus] = useState('published'); // State to store the blog status
	const [tags, setTags] = useState(''); // State to store the blog tags
	const [error, setError] = useState(''); // State to store error messages
	const [success, setSuccess] = useState(false); // State to indicate if the update was successful
	const [isLoading, setIsLoading] = useState(true); // State to track loading status

	// Function to fetch blog details
	useEffect(() => {
		const fetchBlogDetails = async () => {
			try {
				const [publishedResponse, draftResponse] = await Promise.all([getPublishedBlogs(), getDraftBlogs()]);
				const blogs = [...(publishedResponse.data.blogs || []), ...(draftResponse.data.blogs || [])];
				const blogData = blogs.find(b => b.id === blog_id);

				if (blogData) {
					setTitle(blogData.title);
					setContent(blogData.content);
					setStatus(blogData.status);
				} else {
					setError('Blog not found.');
				}
			} catch (error) {
				setError('Failed to fetch blog details: ' + error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBlogDetails();
	}, [blog_id]);

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		setError(''); // Clear any previous errors
		setSuccess(false); // Reset the success state

		// Validation check for empty fields
		if (!title || !content) {
			setError('Both title and content must be provided.');
			return;
		}

		try {
			// Prepare the blog data to be sent to the server
			const blogData = { 
				title, 
				content, 
				status, 
				tags: tags.split(',').map(tag => tag.trim()) // Split tags string into array and trim whitespace
			};
			// Call the API to update the blog post
			const response = await updateBlog(blog_id, blogData);
			console.log('Blog updated successfully:', response);
			setSuccess(true); // Indicate that the update was successful
			setTimeout(() => navigate('/blogpost'), 1500); // Navigate to blog post list after 1.5 seconds
		} catch (error) {
			console.error('Error updating blog:', error);
			setError('Failed to update blog. Please try again.'); // Show error message if update fails
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen text-white font-bold text-[2rem] flex-col p-4">
			{/* Back button */}
			<button onClick={() => navigate('/blogpost')} className=' mb-4 text-[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 sm:text-[1.2rem] sm:px-[1.3rem] sm:py-[1.3rem]'>
				<PiLessThanBold />
			</button>
			<h1 className="text-2xl  mb-4">Edit Blog</h1>
			{/* Form */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
				{/* Input field for the blog title */}
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base"
				/>
				{/* Textarea for the blog content */}
				<textarea
					placeholder="Content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base h-40"
				/>
				{/* Status dropdown */}
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			{/* Button to submit the form */}
				<button type="submit" className="px-4 py-2 bg-[#067EF6] rounded transition duration-300 ease-in-out transform hover:scale-105 text-xl sm:text-lg">
					Update Blog
				</button>
			</form>
			{/* Display error message if any */}
			{error && <p className="text-red-500 mt-2 text-lg sm:text-base">{error}</p>}
			{/* Display success message if the blog is updated successfully */}
			{success && <p className="text-green-500 mt-2 text-lg sm:text-base">Blog updated successfully!</p>}
		</div>
	);
};

export default EditBlog;