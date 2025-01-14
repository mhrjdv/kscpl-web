"use client";

import { useEffect, useState } from "react";
import ProjectCardOne from "@/components/ui/cards/projectCardOne";
import SectionTitle from "@/components/ui/sectionTitle";
import {
  cardSlideAnimation,
  cardSlideAnimationDelay,
  cardSlideAnimationRight,
  cardSlideAnimationRightDelay,
} from "@/lib/utils";

const CategoryProjects = ({ category }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=${category}&populate=projectDetails.MainImage`
        );
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
          console.warn("No projects found for the selected category.");
          setProjects([]);
          return;
        }

        const formattedData = data.data.map((item) => {
          const projectDetails = item.projectDetails || {};
          const mainImage = projectDetails.MainImage || {};

          return {
            id: item.id,
            project_name: projectDetails.Title || "No Title",
            project_desc: projectDetails.Description || "No Description",
            project_year: projectDetails.Duration || "Unknown Year",
            project_type: projectDetails.Category || "Unknown Category",
            location: projectDetails.Location || "Unknown Location",
            project_img: mainImage.url || "",
            link: `/construction/${projectDetails.Category?.toLowerCase()}/${projectDetails.Slug || "no-slug"}`,
          };
        });

        setProjects(formattedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [category]);

  return (
    <section>
      <div className="container-fluid">
        <SectionTitle
          sectionName={category?.toUpperCase() || "Projects"}
          sectionTitle={`Projects in ${category || "All Categories"}`}
          sectionDesc={`A curated collection of ${category || "all"} projects`}
        />
      </div>
      <div className="lg:pt-30 2sm:pt-20 pt-14">
        <div>
          {projects.length > 0 ? (
            projects.map(
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
                const isEven = index % 2 === 0;
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
                    order={isEven ? "lg:order-1 order-0" : ""}
                    position={
                      isEven
                        ? "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                        : "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
                    }
                    imageVariants={
                      isEven
                        ? cardSlideAnimationRight()
                        : cardSlideAnimation()
                    }
                    cardVariants={
                      isEven
                        ? cardSlideAnimationRightDelay()
                        : cardSlideAnimationDelay()
                    }
                  />
                );
              }
            )
          ) : (
            <p className="text-center text-gray-500">No projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryProjects;
