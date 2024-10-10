import React, { useState, useEffect } from 'react'
import { PiLessThanBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { addNewJobOpening } from '../../../api';

const NewCareer = () => {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        number_of_positions: 1,
        deadline: '',
        industry: '',
        salary: '',
        work_experience: '',
        required_skills: [],
        description: '',
        job_type: '',
        location: '',
        key_responsibilities: '',
        qualifications: ''
    });

    const [buttonStatus, setButtonStatus] = useState({ text: 'Submit', bgColor: 'bg-[#067EF6]' });
    const [formError, setFormError] = useState('');
    const [networkError, setNetworkError] = useState(false);

    useEffect(() => {
        const checkNetworkStatus = () => {
            setNetworkError(!navigator.onLine);
        };

        window.addEventListener('online', checkNetworkStatus);
        window.addEventListener('offline', checkNetworkStatus);

        // Initial check
        checkNetworkStatus();

        // Cleanup
        return () => {
            window.removeEventListener('online', checkNetworkStatus);
            window.removeEventListener('offline', checkNetworkStatus);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: name === 'required_skills' ? value.split(',').map(skill => skill.trim()) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting job data:', jobData);

        // Reset button status and form error
        setButtonStatus({ text: 'Submit', bgColor: 'bg-[#067EF6]' });
        setFormError('');

        // Check for network connection
        if (networkError) {
            setFormError('Network is down. Please check your internet connection.');
            setButtonStatus({ text: 'Failed', bgColor: 'bg-red-500' });
            setTimeout(() => {
                setButtonStatus({ text: 'Submit', bgColor: 'bg-[#067EF6]' });
            }, 2000);
            return;
        }

        // Basic form validation
        if (!jobData.title || !jobData.job_type || !jobData.deadline || !jobData.industry || !jobData.salary || !jobData.work_experience || jobData.required_skills.length === 0 || !jobData.description) {
            setFormError('Please fill in all required fields');
            setButtonStatus({ text: 'Failed', bgColor: 'bg-red-500' });
            setTimeout(() => {
                setButtonStatus({ text: 'Submit', bgColor: 'bg-[#067EF6]' });
            }, 2000);
            return;
        }

        try {
            const result = await addNewJobOpening(jobData);
            console.log('Job added successfully:', result);
            setButtonStatus({ text: 'Success', bgColor: 'bg-green-500' });
            setTimeout(() => {
                navigate('/career');
                setButtonStatus({ text: 'Submit', bgColor: 'bg-[#067EF6]' });
            }, 2000);
        } catch (error) {
            console.error('Error adding job:', error);
            setButtonStatus({ text: 'Failed', bgColor: 'bg-red-500' });
            setFormError('Failed to add job. Please try again.');
            setTimeout(() => {
                setButtonStatus({ text: 'Submit', bgColor: 'bg-[#067EF6]' });
            }, 2000);
        }
    };

    return (
        <div className='pb-20'>
            {/* Header section */}
            <div className='IPad:pr-[27rem] side-phone:pr-[7rem] flex pt-[4rem] justify-center items-center gap-[1rem] pr-[37rem]'>
                <button onClick={() => navigate('/career')} className='text[1.4rem] text-white font-[800] px-[1.5rem] py-[1.5rem] bg-[#052A49] rounded-[0.9rem] transition duration-300 ease-in-out transform hover:scale-105 side-phone:text-[1.2rem] side-phone:px-[1.3rem] side-phone:py-[1.3rem]'>
                    <PiLessThanBold />
                </button>
                <p className='text-[1.4rem] text-white side-phone:text-[1.2rem]'>Add Job</p>
            </div>

            {/* Network Error Alert */}
            {networkError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Network Error!</strong>
                    <span className="block sm:inline"> Please check your internet connection.</span>
                </div>
            )}

            {/* Form section */}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Title */}
                    <InputField label="Job Title" name="title" value={jobData.title} onChange={handleInputChange} />
                    
                    {/* Number of Positions */}
                    <InputField label="Number of Positions" name="number_of_positions" type="number" value={jobData.number_of_positions} onChange={handleInputChange} />
                    
                    {/* Deadline */}
                    <InputField label="Deadline" name="deadline" type="date" value={jobData.deadline} onChange={handleInputChange} />
                    
                    {/* Industry */}
                    <InputField label="Industry" name="industry" value={jobData.industry} onChange={handleInputChange} />
                    
                    {/* Salary */}
                    <InputField label="Salary" name="salary" value={jobData.salary} onChange={handleInputChange} />
                    
                    {/* Work Experience */}
                    <InputField label="Work Experience" name="work_experience" value={jobData.work_experience} onChange={handleInputChange} />
                    
                    {/* Required Skills */}
                    <InputField label="Required Skills (comma-separated)" name="required_skills" value={jobData.required_skills.join(', ')} onChange={handleInputChange} />
                    
                    {/* Description */}
                    <TextAreaField label="Job Description" name="description" value={jobData.description} onChange={handleInputChange} />
                    
                    {/* Job Type */}
                    <div className='flex flex-col justify-center items-center pt-[1.5rem] gap-[0.5rem]'>
                        <label htmlFor="job_type" className='text-[grey] w-full max-w-[49rem] IPad:max-w-[40rem] side-phone:max-w-[19rem] text-left'>Job Type</label>
                        <select
                            id="job_type"
                            name="job_type"
                            value={jobData.job_type}
                            onChange={handleInputChange}
                            className='side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem] placeholder-gray-500 bg-[#052A49] text-white pl-6'
                        >
                            <option value="">Select Job Type</option>
                            <option value="contract">Contract</option>
                            <option value="salary">Salary</option>
                        </select>
                    </div>
                    
                    {/* Location */}
                    <InputField label="Location" name="location" value={jobData.location} onChange={handleInputChange} />
                    
                    {/* Key Responsibilities */}
                    <TextAreaField label="Key Responsibilities" name="key_responsibilities" value={jobData.key_responsibilities} onChange={handleInputChange} />
                    
                    {/* Qualifications */}
                    <TextAreaField label="Qualifications" name="qualifications" value={jobData.qualifications} onChange={handleInputChange} />
                </div>

                {/* Submit button and error message */}
                <div className='IPad:pr-[30.8rem] side-phone:pr-[0rem] pr-[40rem] flex flex-col items-center pt-[2rem]'> 
                    <button 
                        type="submit" 
                        className={`text-white ${buttonStatus.bgColor} px-8 py-3.5 text-[0.9rem] rounded-[2rem] transition duration-300 ease-in-out transform hover:scale-105`}
                    >
                        {buttonStatus.text}
                    </button>
                    {formError && (
                        <p className="mt-2 text-red-500 text-sm">{formError}</p>
                    )}
                </div>
            </form>
        </div>
    )
}

// Helper components for input fields
const InputField = ({ label, name, type = "text", value, onChange }) => (
    <div className='flex flex-col justify-center items-center pt-[1.5rem] gap-[0.5rem]'>
        <label htmlFor={name} className='text-[grey] w-full max-w-[49rem] IPad:max-w-[40rem] side-phone:max-w-[19rem] text-left'>{label}</label>
        <input 
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className='side-phone:w-[19rem] IPad:w-[40rem] w-[49rem] h-[3rem] rounded-[0.6rem] placeholder-gray-500 bg-[#052A49] text-white pl-6' 
            placeholder={label}
        />
    </div>
)

const TextAreaField = ({ label, name, value, onChange }) => (
    <div className='flex flex-col justify-center items-center pt-[1.5rem] gap-[0.5rem]'>
        <label htmlFor={name} className='text-[grey] w-full max-w-[49rem] IPad:max-w-[40rem] side-phone:max-w-[19rem] text-left'>{label}</label>
        <textarea 
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className='IPad:w-[40rem] side-phone:w-[20rem] w-[49rem] h-[10rem] rounded-[0.4rem] pb-[6rem] placeholder-gray-500 bg-[#052A49] text-white pl-5' 
            placeholder={label}
        ></textarea>
    </div>
)

export default NewCareer