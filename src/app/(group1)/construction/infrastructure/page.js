"use client"; // Add this since we're using useEffect and useState

import { useEffect, useState } from "react";
import ProjectCardOne from "@/components/ui/cards/projectCardOne";
import SectionTitle from "@/components/ui/sectionTitle";
import {
  cardSlideAnimation,
  cardSlideAnimationDelay,
  cardSlideAnimationRight,
  cardSlideAnimationRightDelay,
} from "@/lib/utils";

const ProjectArchive = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Infrastructure&populate=projectDetails.MainImage"
        );
        const data = await response.json();

        if (!data.data) {
          throw new Error("No data found");
        }

        // Map the API response to the required format
        const formattedProjects = data.data.map((project) => {
          const { Title, MainImage, Category, Description, Location, Duration } =
            project.projectDetails || {};

          return {
            id: project.id,
            project_name: Title || "No Title",
            project_desc: Description || "No Description",
            project_img: MainImage?.url || "",
            project_type: Category || "No Category",
            location: Location || "No Location",
            project_year: Duration || "No Duration",
            link: `/construction/${Category.toLowerCase()}/${Title
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")}`,
          };
        });

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section>
      <div className="container-fluid">
        <SectionTitle
          sectionName={"Archive"}
          sectionTitle={"A Journey Through Our Past Projects"}
          sectionDesc={"Exploring the Tapestry of Our Design Legacy"}
        />
      </div>
      <div className="lg:pt-30 2sm:pt-20 pt-14">
        <div className="">
          {projects.map(
            (
              {
                id,
                project_desc,
                project_img,
                project_name,
                project_year,
                project_type,
                location,
                link,
              },
              index
            ) => {
              if (index % 2 === 0) {
                return (
                  <ProjectCardOne
                    key={id}
                    project_desc={project_desc}
                    project_img={project_img}
                    project_type={project_type}
                    location={location}
                    project_year={project_year}
                    link={link}
                    project_name={project_name}
                    order={"lg:order-1 order-0"}
                    position={"lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"}
                    imageVariants={cardSlideAnimationRight()}
                    cardVariants={cardSlideAnimationRightDelay()}
                  />
                );
              } else {
                return (
                  <ProjectCardOne
                    key={id}
                    project_desc={project_desc}
                    project_img={project_img}
                    project_type={project_type}
                    location={location}
                    project_year={project_year}
                    link={link}
                    project_name={project_name}
                    position={"lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"}
                    imageVariants={cardSlideAnimation()}
                    cardVariants={cardSlideAnimationDelay()}
                  />
                );
              }
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectArchive;