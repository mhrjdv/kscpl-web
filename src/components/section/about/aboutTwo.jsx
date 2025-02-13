"use client";

import React, {
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import SectionTitle from "../../ui/sectionTitle";
import about_bg from "@/assets/images/about-image-2.jpg";
import SectionSidebarImg from "@/components/ui/sectionSidebarImg";
import expertise_bg from "@/assets/images/expertise.jpg";
import { motion } from "framer-motion";
import Title from "../../ui/title";
import { cardSlideAnimation } from "@/lib/utils";
import ServiceCard from "@/components/ui/cards/serviceCard";


const AboutTwo = () => {
  const [aboutData, setAboutData] =
    useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/about-us?populate=*"
        );
        const data = await response.json();
        setAboutData(data.data);
      } catch (error) {
        console.error(
          "Error fetching about data:",
          error
        );
      }
    };

    fetchAboutData();
  }, []);

  // Helper function to get image dimensions
  const getImageDimensions = (image) => {
    if (!image)
      return { width: 500, height: 500 }; // Default fallback dimensions
    return {
      width: image.width || 500,
      height: image.height || 500,
    };
  };

  if (!aboutData) return <div>Loading...</div>;

  const founderImageDimensions =
    getImageDimensions(aboutData.founderImage);

  return (
    <section container py-20>
      <div className="container-fluid">
        <SectionTitle
          sectionName={"About Us"}
          sectionTitle={"About Us"}
          sectionDesc={
            "We Build Dreams with Passion, Vision, and Sheer Expertise"
          }
        />
        <div
          className={`bg-primary xl:mt-[130px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 mb-0 p-10`}
        >
          <div className="container">
            <div className="flex lg:flex-row flex-col items-center justify-between"> 
              <div className="md:-mt-25 -mt-[400px] -mb-25">
                <SectionSidebarImg
                  img={about_bg}
                  section_name={"about-bg"}
                />
              </div>
              <div className="max-w-[700px] lg:pt-0 pt-10 lg:pb-0 pb-10 lg:pl-0 ml-8">
                <h2 className="text-secondary-foreground text-3xl 2sm:text-4xl font-bold leading-120 mt-5 mb-5 max-w-[600px]">
                  {aboutData.title}
                </h2>
                {aboutData.description.map(
                  (desc, index) =>
                    desc.children[0].text && (
                      <p
                        key={index}
                        className={`text-secondary-foreground text-base ${
                          index > 0 ? "mt-3" : ""
                        }`}
                      >
                        {desc.children[0].text}
                      </p>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <SectionTitle
          sectionName={"Team"}
          sectionTitle={
            "Our Founders & Management"
          }
          sectionDesc={
            "Our expert-led team ensures flawless project execution with skilled professionals and efficient management, delivering excellence in construction and real estate."
          }
        />
        <div className="lg:mt-15 2sm:mt-20 mt-14 bg-secondary">
          <div className="flex lg:flex-row flex-col items-center gap-15">
            <div className="flex justify-center md:pl-40 md:justify-start">
              <SectionSidebarImg
                img={
                  aboutData.founderImage?.url ||
                  expertise_bg
                }
                section_name={"Expertise-bg"}
                className={"w-full h-full"}
                width={
                  founderImageDimensions.width
                }
                height={
                  founderImageDimensions.height
                }
              />
            </div>
            <div className="px-3 2xl:py-0 py-7 max-w-[533px] w-full">
              <Title
                title_text={aboutData.founderName}
                className={"2xl:mb-4 mb-4"}
              />
              <p className="text-primary-foreground mt-1 text-xl">
                {aboutData.founderDesignation}
              </p>
              <p className="text-primary-foreground text-base mt-3">
                {aboutData.founderDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Section */}
      <div className="container-fluid">
        {/* <h2 className="text-primary-foreground text-xl font-bold mb-5">Our Employees</h2> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 pl-30 pr-30 mt-10">
          {aboutData.employees.map(employee => (
            <ServiceCard
              key={employee.id}
              service_name={employee.name}
              designation={employee.designation}
              service_desc={employee.description}
              text_muted=""
            />
          ))}
        </div>
      </div>

      {/* Partner Images Section */}
      <div className="container-fluid mt-0">
        <SectionTitle
          sectionName={"Our Partners"} // reduced font size
          sectionTitle={"Our Partners"}
          sectionDesc={"Trusted by leading organizations and brands."}
          className="mt-0" // reduced top spacing
        />
        <div className="flex flex-wrap items-center justify-center gap-3 py-10 mt-8">
          {aboutData.partnerImages.map((partner) => (
            <Image
              key={partner.id}
              src={partner.url}
              alt={partner.name}
              width={275}
              height={275}
              className="object-contain"
            />
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default AboutTwo;
