import React from 'react';

function Pagination({ pageProp, go, back }) {
    return (
        <>
            <div className='w-full flex justify-center'>
                <button 
                    onClick={back} 
                    className='p-2 border-4 border-indigo-500 text-indigo-500 border-r-0 rounded-l-xl'
                    disabled={pageProp === 1} // Disable "Previous" if on the first page
                >
                    Previous
                </button>

                <button className='p-2 border-4 border-indigo-500 text-indigo-500 bg-gray-300'>
                    {pageProp} {/* Display current page number */}
                </button> 

                <button 
                    onClick={go}
                    className='p-2 border-4 border-indigo-500 text-indigo-500 border-l-0 rounded-r-xl'
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Pagination;
