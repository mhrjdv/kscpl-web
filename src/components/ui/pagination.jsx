'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import RightArrow from '@/assets/icons/rightArrow'
import DotIcon from '@/assets/icons/dotIcon'
import ButtonFill from './buttons/buttonFill'

const Pagination = ({ currentPage, totalPages }) => {
    const router = useRouter();
    
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        router.push(`?page=${page}`);
    };

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pages.push(i);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            pages.push('...');
        }
    }

    return (
        <div className='container'>
            <ul className='flex justify-center'>
                <li className='2sm:mr-[22px] mr-1'>
                    <ButtonFill 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={"rotate-180 py-[23px] h-[75px] 2sm:px-6 px-3 after:bg-secondary border-secondary hover:border-primary text-primary-foreground after:left-0"}
                    >
                        <RightArrow width={"35"} height={"22"} />
                    </ButtonFill>
                </li>
                
                {pages.map((page, index) => (
                    page === '...' ? (
                        <li key={`dots-${index}`} className='flex justify-center items-end w-[74px] h-[75px] pb-2'>
                            <DotIcon />
                        </li>
                    ) : (
                        <li 
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`flex justify-center items-center w-[74px] h-[75px] border-[2px] font-semibold cursor-pointer border-primary 
                                ${currentPage === page ? 'bg-primary text-secondary-foreground' : 'hover:bg-primary hover:text-secondary-foreground'}`}
                        >
                            {String(page).padStart(2, '0')}
                        </li>
                    )
                ))}

                <li className='2sm:ml-[22px] ml-1'>
                    <ButtonFill 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={"py-[18px] h-[75px] hover:border-primary 2sm:px-10 px-4 after:left-0"}
                    >
                        <span className='sm:block hidden'>Next</span>
                        <RightArrow width={"35"} height={"22"} />
                    </ButtonFill>
                </li>
            </ul>
        </div>
    )
}

export default Pagination