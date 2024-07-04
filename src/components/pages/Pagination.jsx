import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <nav className="pt-7 flex justify-center items-center mt-[-8rem] gap-[8rem] IPad:gap-4 border-t border-t-[#EAECF0]">
        <button 
          onClick={goToPrevious} 
          className='text-[#475467] flex items-center gap-6 IPad:gap-2'
          disabled={currentPage === 1}
        >
          <FaArrowLeft /> 
          <span className="inline IPad:hidden">Previous</span>
        </button>
        
        <div className="flex items-center">
          <div className="hidden IPad:block text-[#475467]">
            {currentPage}/{totalPages}
          </div>
          <ul className="flex IPad:hidden space-x-2">
            {pageNumbers.map(number => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    currentPage === number
                      ? 'bg-white text-black'
                      : 'text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={goToNext} 
          className='text-[#475467] flex items-center gap-6 IPad:gap-2'
          disabled={currentPage === totalPages}
        >
          <span className="inline IPad:hidden">Next</span>
          <FaArrowRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;