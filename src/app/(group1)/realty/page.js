"use client"; // Add this since we're using useEffect and useState

import { useEffect, useState } from "react";
import ProjectCardOneRealty from "@/components/ui/cards/projectCardOneRealty";
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
          "https://kscplcms.cubeone.in/api/realties?populate=realtyProjects.mainImage&populate=realtyProjects.allImages"
        );
        const data = await response.json();

        if (!data.data) {
          throw new Error("No data found");
        }

        // Map the API response to the required format
        const formattedProjects = data.data.map((project) => {
          const { title, description, location, mainImage, allImages } = project.realtyProjects || {};

          return {
            id: project.id,
            project_name: title || "No Title",
            project_desc: description ? description.map(desc => desc.children.map(child => child.text).join(' ')).join(' ') : "No Description",
            project_img: mainImage?.url || "",
            project_type: "Realty", // Assuming all projects are of type "Realty"
            location: location || "No Location",
            project_year: "N/A", // No year provided in the API response
            link: `/realty/${title
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
                  <ProjectCardOneRealty
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
                  <ProjectCardOneRealty
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