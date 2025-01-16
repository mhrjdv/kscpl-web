"use client";
import Image from 'next/image';
import { motion } from "framer-motion";
import RightArrow from '@/assets/icons/rightArrow';
import ButtonFill from '../buttons/buttonFill';
import Link from 'next/link';
import { staticBluarDataUrl } from '@/lib/staticBluarDataUrl';

const ProjectCardOne = ({ order, position, project_year, project_desc, project_img, location, project_type, project_name, link, imageVariants, cardVariants }) => {
    return (
        <div className='xl:max-w-[95%] w-full mx-auto relative overflow-hidden'>
            <div className='container'>
                <div className='flex lg:flex-row flex-col items-center lg:pb-[170px] pb-25'>
                    <div className={`${order} lg:w-1/2 w-full`}> {/* Ensure full width on small screens */}
                        <div className={`${position} w-full xl:max-w-[1100px] max-w-[800px]`}>
                            <motion.div
                                initial="offscreen"
                                whileInView="onscreen"
                                variants={imageVariants}
                                viewport={{ once: true, amount: 0 }}
                            >
                                {/* Adjust image container for small screens */}
                                <div className="relative w-full aspect-[4/3] lg:h-[700px] h-[300px]"> {/* Responsive height */}
                                    <Image 
                                        src={project_img} 
                                        loading='lazy' 
                                        placeholder='blur' 
                                        blurDataURL={staticBluarDataUrl} 
                                        alt='project-img-1' 
                                        layout="fill" 
                                        objectFit="cover" 
                                        className="object-cover" // Ensure the image covers the container
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={cardVariants}
                        viewport={{ once: true, amount: 0 }}
                        className='lg:w-1/2 lg:mt-[187px] mt-10 relative z-[1] w-full max-w-[700px]' // Constant width for text box
                    >
                        <div className={`bg-primary xl:px-16 px-8 xl:pt-[78px] pt-10 xl:pb-[58px] pb-7 w-full`}> {/* Ensure full width within the constant container */}
                            <h3 className='xl:text-5xl md:text-[40px] text-4xl font-extrabold leading-120 text-secondary-foreground pb-10'>{project_name}</h3>
                            <p className='text-secondary-foreground mb-7'>{project_desc}</p>
                            <ul className='mb-9'>
                                <li className='flex items-center mb-[6px]'>
                                    <span className='inline-block font-extrabold min-w-32 text-secondary-foreground'>Year:</span>
                                    <span className='font-medium text-secondary-foreground'>{project_year}</span>
                                </li>
                                <li className='flex items-center mb-[6px]'>
                                    <span className='inline-block font-extrabold min-w-32 text-secondary-foreground'>Category:</span>
                                    <span className='font-medium text-secondary-foreground'>{project_type}</span>
                                </li>
                                <li className='flex items-center mb-[6px]'>
                                    <span className='inline-block font-extrabold min-w-32 text-secondary-foreground'>Location:</span>
                                    <span className='font-medium text-secondary-foreground'>{location}</span>
                                </li>
                            </ul>
                            <Link href={link}>
                                <ButtonFill className={"border-secondary text-primary-foreground hover:text-secondary-foreground after:left-0 after:bg-secondary"}>
                                    View Project <RightArrow width={'35'} height={"22"} />
                                </ButtonFill>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardOne;