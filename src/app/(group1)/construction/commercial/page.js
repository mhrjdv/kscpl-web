"use client";

import SectionTitle from "@/components/ui/sectionTitle";
import { useEffect, useState } from "react";
import ProjectCardOne from "@/components/ui/cards/projectCardOne";
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
          "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Commercial&populate=projectDetails.MainImage"
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
    <section>
      <div className="container-fluid">
        <SectionTitle
          sectionName={"Archive"}
          sectionTitle={"A Journey Through Our Past Projects"}
          sectionDesc={"Exploring the Tapestry of Our Design Legacy"}
        />
      </div>
      <div className="lg:pt-30 2sm:pt-20 pt-14">
        <div>
          {projects.map(({ id, projectDetails }) => {
            const {
              Title,
              MainImage,
              slug,
              Category,
              Description,
              Location,
              Duration,
            } = projectDetails;

            return (
              <ProjectCardOne
                key={id}
                project_desc={Description || "No description available"}
                project_img={MainImage?.url || ""}
                project_type={Category || "N/A"}
                location={Location || "N/A"}
                project_year={Duration || "N/A"}
                link={`/construction/${Category.toLowerCase()}/${slug}`}
                project_name={Title || "Untitled"}
                position={
                  id % 2 === 0
                    ? "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                    : "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
                }
                imageVariants={
                  id % 2 === 0
                    ? cardSlideAnimationRight()
                    : cardSlideAnimation()
                }
                cardVariants={
                  id % 2 === 0
                    ? cardSlideAnimationRightDelay()
                    : cardSlideAnimationDelay()
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectArchive;
