"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import RightArrow from "@/assets/icons/rightArrow";
import Title from "@/components/ui/title";
import ProjectSingleSliderTwo from "@/components/section/projectSingle/projectSingleSliderTwo";
import Feedback from "@/components/section/feedback";

const ProjectArchive = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Infrastructure&populate=projectDetails.MainImage"
        );
        const data = await response.json();

        // Dynamically generate slugs from the Title
        const updatedProjects = data.data.map((project) => {
          const { Title } = project.projectDetails;
          const generatedSlug = Title
            ? Title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
            : "untitled";
          return {
            ...project,
            projectDetails: {
              ...project.projectDetails,
              slug: generatedSlug,
            },
          };
        });

        setProjects(updatedProjects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {projects.map(({ id, projectDetails }) => {
        const {
          Title,
          MainImage,
          Category,
          Description,
          Location,
          Duration,
          Area,
          Team,
        } = projectDetails;

        return (
          <section key={id} className="blog-single">
            <div>
              <Image
                src={MainImage?.url || ""}
                width={1920}
                height={1080}
                loading="lazy"
                alt={Title || "Project Image"}
              />
              <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
                <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
                  <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
                    <h1 className="text-primary-foreground [font-size:_clamp(48px,7vw,130px)] font-extrabold leading-110">
                      {Title}
                    </h1>
                    <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
                    <p className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px]">
                      {Description}
                    </p>
                  </div>
                  <div className="bg-primary py-15 sm:px-[38px] px-5 lg:-mt-[410px]">
                    <Title
                      title_text={Title}
                      className="text-secondary-foreground mb-0"
                    />
                    <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-7 lg:gap-x-0 gap-y-[52px]">
                      <li>
                        <strong className="text-secondary-foreground block text-2xl mb-1.5">
                          Project type:
                        </strong>
                        <span className="text-secondary-foreground block">
                          {Category}
                        </span>
                      </li>
                      <li>
                        <strong className="text-secondary-foreground block text-2xl mb-1.5">
                          Area:
                        </strong>
                        <span className="text-secondary-foreground block">
                          {Area || "N/A"}
                        </span>
                      </li>
                      <li>
                        <strong className="text-secondary-foreground block text-2xl mb-1.5">
                          Project year:
                        </strong>
                        <span className="text-secondary-foreground block">
                          {Duration}
                        </span>
                      </li>
                      <li>
                        <strong className="text-secondary-foreground block text-2xl mb-1.5">
                          Location:
                        </strong>
                        <span className="text-secondary-foreground block">
                          {Location}
                        </span>
                      </li>
                      <li>
                        <strong className="text-secondary-foreground block text-2xl mb-1.5">
                          Team:
                        </strong>
                        <span className="text-secondary-foreground block">
                          {Team || "N/A"}
                        </span>
                      </li>
                    </ul>
                    <ButtonOutline
                      className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary"
                    >
                      Download Brochure{" "}
                      <span className="rotate-90">
                        <RightArrow height="25" width="22" />
                      </span>
                    </ButtonOutline>
                  </div>
                </div>
              </div>
              <div className="container sm:py-15 py-0">
                <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[115%] after:bg-primary sm:ml-12.5 ml-5 max-w-[895px]">
                  <p className="text-primary-foreground lg:pr-4">{Description}</p>
                </div>
              </div>
              <ProjectSingleSliderTwo />
            </div>
          </section>
        );
      })}
      <Feedback />
    </>
  );
};

export default ProjectArchive;
