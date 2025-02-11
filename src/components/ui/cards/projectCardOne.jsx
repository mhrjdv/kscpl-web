"use client";
import Image from 'next/image';
import { motion } from "framer-motion";
import RightArrow from '@/assets/icons/rightArrow';
import ButtonFill from '../buttons/buttonFill';
import Link from 'next/link';
import { staticBluarDataUrl } from '@/lib/staticBluarDataUrl';
import { useCallback } from 'react';

const ProjectCardOne = ({
  order,
  position,
  project_year,
  project_desc,
  project_img,
  location,
  project_type,
  project_name,
  link,
  imageVariants,
  cardVariants,
  brochure
}) => {
  // Function to handle brochure download
  const handleDownload = useCallback(
    async (event) => {
      event.preventDefault();
      if (!brochure) return;
      try {
        // Fetch the brochure file as a blob
        const response = await fetch(brochure);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        // Create a blob URL for the fetched file
        const blobUrl = window.URL.createObjectURL(blob);
        // Create a temporary anchor element and trigger download
        const a = document.createElement("a");
        a.href = blobUrl;
        // Extract a file name from the URL, or use a default name
        const fileName = brochure.split('/').pop() || "brochure.pdf";
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the brochure:", error);
      }
    },
    [brochure]
  );

  return (
    <div className="xl:max-w-[95%] w-full mx-auto relative overflow-hidden">
      <div className="container">
        <div className="flex lg:flex-row flex-col items-center lg:pb-[170px] pb-25">
          <div className={`${order} lg:w-1/2 w-full`}>
            <div className={`${position} w-full xl:max-w-[1100px] max-w-[800px]`}>
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                variants={imageVariants}
                viewport={{ once: true, amount: 0 }}
              >
                <div className="relative w-full aspect-[4/3] lg:h-[700px] h-[300px]">
                  <Image
                    src={project_img}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={staticBluarDataUrl}
                    alt="project-img-1"
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
            className="lg:w-1/2 lg:mt-[187px] mt-10 relative z-[1] w-full max-w-[700px]"
          >
            <div className="bg-primary xl:px-16 px-8 xl:pt-[78px] pt-10 xl:pb-[58px] pb-7 w-full">
              <h3 className="xl:text-5xl md:text-[40px] text-4xl font-extrabold leading-120 text-secondary-foreground pb-10">
                {project_name}
              </h3>
              <p className="text-secondary-foreground mb-7">{project_desc}</p>
              <ul className="mb-9">
                <li className="flex items-center mb-[6px]">
                  <span className="inline-block font-extrabold min-w-32 text-secondary-foreground">
                    Year:
                  </span>
                  <span className="font-medium text-secondary-foreground">
                    {project_year}
                  </span>
                </li>
                <li className="flex items-center mb-[6px]">
                  <span className="inline-block font-extrabold min-w-32 text-secondary-foreground">
                    Category:
                  </span>
                  <span className="font-medium text-secondary-foreground">
                    {project_type}
                  </span>
                </li>
                <li className="flex items-center mb-[6px]">
                  <span className="inline-block font-extrabold min-w-32 text-secondary-foreground">
                    Location:
                  </span>
                  <span className="font-medium text-secondary-foreground">
                    {location}
                  </span>
                </li>
              </ul>
              <Link href={link}>
                <ButtonFill className="border-secondary text-primary-foreground hover:text-secondary-foreground after:left-0 after:bg-secondary">
                  View Project <RightArrow width="35" height="22" />
                </ButtonFill>
              </Link>
              {brochure && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-4 inline-block"
                >
                  <ButtonFill className="border-secondary text-primary-foreground hover:text-secondary-foreground after:left-0 after:bg-secondary">
                    Download Brochure
                  </ButtonFill>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardOne;
