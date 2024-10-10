import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PiLessThanBold } from "react-icons/pi";
import { updateJobOpening, getAllJobOpenings } from '../../../api';

const EditCareer = () => {
  const navigate = useNavigate();
  const { job_opening_id } = useParams();
  const [job, setJob] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availableJobs, setAvailableJobs] = useState([]);

  const editableFields = [
    'title',
    'number_of_positions',
    'deadline',
    'industry',
    'salary',
    'work_experience',
    'required_skills',
    'description',
    'job_type'
  ];

  const textareaRefs = useRef({});

  const adjustTextareaHeight = (key) => {
    const textarea = textareaRefs.current[key];
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getAllJobOpenings();
        console.log('Job openings:', response.data.job_openings);
        const jobs = response.data.job_openings || [];
        
        if (jobs.length > 0) {
          setAvailableJobs(jobs);
          if (job_opening_id) {
            const jobData = jobs.find(j => j.id === job_opening_id);
            if (jobData) {
              console.log('Found job data:', jobData);
              setJob(jobData);
            } else {
              setError(`Job not found. Please select a job from the list.`);
            }
          } else {
            // If no job_opening_id is provided, set the first job as default
            setJob(jobs[0]);
          }
          setAvailableJobs(jobs);
        } else {
          setError('No job openings available.');
        }
      } catch (error) {
        setError('Failed to fetch job details: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_opening_id]);

  console.log('Job opening ID from URL:', job_opening_id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob(prevJob => ({
      ...prevJob,
      [name]: name === 'required_skills' ? value.split(',').map(skill => skill.trim()) : value
    }));
    adjustTextareaHeight(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const result = await updateJobOpening(job_opening_id, job);
      setSuccess(true);
      setTimeout(() => {
        navigate('/career');
      }, 2000);
    } catch (error) {
      setError('Failed to update job. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-white text-center mt-8">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen text-white font-bold text-[2rem] flex-col p-4 mb-[5rem]">
      <button onClick={() => navigate('/career')} className='mb-4 text-[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 sm:text-[1.2rem] sm:px-[1.3rem] sm:py-[1.3rem]'>
        <PiLessThanBold />
      </button>
      <h1 className="text-2xl mb-4">Edit Job Opening</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
        {editableFields.map((key) => {
          if (key === 'job_type') {
            return (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="mb-1 text-lg sm:text-base">{key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}</label>
                <select
                  id={key}
                  name={key}
                  value={job[key] || ''}
                  onChange={handleInputChange}
                  className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base"
                  required
                >
                  <option value="" disabled>Select Job Type</option>
                  <option value="salary">Salary</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            );
          }
          return (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-1 text-lg sm:text-base">
                {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
              </label>
              <textarea
                ref={el => textareaRefs.current[key] = el}
                id={key}
                placeholder={key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                value={Array.isArray(job[key]) ? job[key].join(', ') : job[key] || ''}
                onChange={handleInputChange}
                name={key}
                className="p-2 rounded bg-[#052A49] text-white text-lg sm:text-base overflow-hidden"
                rows="1"
                required
              />
            </div>
          );
        })}

        <button type="submit" className="px-4 py-2 bg-[#067EF6] rounded transition duration-300 ease-in-out transform hover:scale-105 text-xl sm:text-lg">
          Update Job
        </button>
      </form>

      {error && <p className="text-red-500 mt-2 text-lg sm:text-base">{error}</p>}
      {success && <p className="text-green-500 mt-2 text-lg sm:text-base">Job updated successfully!</p>}
    </div>
  );
};

export default EditCareer;
