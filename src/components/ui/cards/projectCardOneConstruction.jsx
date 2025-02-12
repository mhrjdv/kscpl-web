"use client";
import Image from 'next/image';
import { motion } from "framer-motion";
import RightArrow from '@/assets/icons/rightArrow';
import ButtonFill from '../buttons/buttonFill';
import Link from 'next/link';
import { staticBluarDataUrl } from '@/lib/staticBluarDataUrl';

const ProjectCardOneConstruction = ({ order, position, project_year, project_desc, project_img, location, project_type, project_name, link, imageVariants, cardVariants }) => {
    // Calculate dynamic font size based on text length
    const getTitleSize = (title) => {
        if (title.length > 30) return 'xl:text-3xl md:text-2xl text-xl';
        if (title.length > 20) return 'xl:text-4xl md:text-3xl text-2xl';
        return 'xl:text-5xl md:text-[40px] text-4xl';
    };

    // Truncate description to 3 lines (approximately 200 characters)
    const truncatedDesc = project_desc.length > 200 
        ? `${project_desc.substring(0, 200)}...` 
        : project_desc;

    return (
        <div className='xl:max-w-[95%] w-full mx-auto relative overflow-hidden'>
            <div className='container'>
                <div className='flex lg:flex-row flex-col items-stretch lg:pb-[100px] pb-25'>
                    <div className={`${order} lg:w-1/2 w-full relative z-[2]`}>
                        <div className={`${position} w-full xl:max-w-[1100px] max-w-[500px] h-full relative`}>
                            <motion.div
                                initial="offscreen"
                                whileInView="onscreen"
                                variants={imageVariants}
                                viewport={{ once: true, amount: 0 }}
                                className="relative z-[2] h-full"
                            >
                                <div className="relative w-full aspect-[16/10] lg:h-full h-[250px]">
                                    <Image 
                                        src={project_img} 
                                        loading='lazy' 
                                        placeholder='blur' 
                                        blurDataURL={staticBluarDataUrl} 
                                        alt='project-img-1' 
                                        layout="fill" 
                                        objectFit="cover" 
                                        className="object-cover"
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
                        className='lg:w-1/2 mt-0 relative z-[1] w-full'
                    >
                        <div className='bg-primary xl:px-16 px-8 py-20 w-full h-full flex flex-col justify-between'>
                            <div>
                                <h3 className={`${getTitleSize(project_name)} font-extrabold leading-120 text-secondary-foreground pb-10`}>
                                    {project_name}
                                </h3>
                                <p className='text-secondary-foreground mb-7 line-clamp-3'>{truncatedDesc}</p>
                                {/* <Link href={link} className='text-secondary-foreground underline mb-7 inline-block'>
                                    Read More
                                </Link> */}
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
                            </div>
                            <div>
                                <Link href={link}>
                                    <ButtonFill className={"border-secondary text-primary-foreground hover:text-secondary-foreground after:left-0 after:bg-secondary"}>
                                        View Project <RightArrow width={'35'} height={"22"} />
                                    </ButtonFill>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardOneConstruction;