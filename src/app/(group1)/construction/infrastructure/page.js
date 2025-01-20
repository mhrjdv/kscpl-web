"use client"; // Because we're using useEffect, useState

import { useEffect, useState } from "react";
import ProjectCardOne from "@/components/ui/cards/projectCardOne";
import SectionTitle from "@/components/ui/sectionTitle";
import {
  cardSlideAnimation,
  cardSlideAnimationDelay,
  cardSlideAnimationRight,
  cardSlideAnimationRightDelay,
} from "@/lib/utils";

// 1) A small helper function to generate slugs consistently
function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-")        // replace spaces with hyphens
    .replace(/-+/g, "-");        // collapse multiple hyphens
}

export default function ProjectArchive() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Infrastructure&populate=projectDetails.MainImage"
        );

        // Basic check if fetch was successful
        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.data) {
          throw new Error("No data found");
        }

        // 2) Map the API response to the required format
        const formattedProjects = data.data.map((item) => {
          const {
            Title = "No Title",
            MainImage,
            Category = "No Category",
            Description = "No Description",
            Location = "No Location",
            Duration = "No Duration",
          } = item.projectDetails || {};

          // Generate consistent slug
          const slug = generateSlug(Title);

          // Build the link: e.g. /construction/Infrastructure/cyber-one-Infrastructure-building
          // Make sure Category is "Infrastructure" if it's truly Infrastructure
          const categorySlug = (Category || "").toLowerCase(); // "Infrastructure"
          const link = `/construction/${categorySlug}/${slug}`;

          return {
            id: item.id,
            project_name: Title,
            project_desc: Description,
            project_img: MainImage?.url || "",
            project_type: Category,
            location: Location,
            project_year: Duration,
            link,
          };
        });

        setProjects(formattedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to load projects");
      }
    }

    fetchProjects();
  }, []);

  // 3) Optionally handle and show any error
  if (error) {
    return (
      <section>
        <div className="container-fluid pt-20">
          <p className="text-red-600">
            Failed to load Infrastructure projects: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container-fluid">
        <SectionTitle
          sectionName="Archive"
          sectionTitle="A Journey Through Our Past Projects"
          sectionDesc="Exploring the Tapestry of Our Design Legacy"
        />
      </div>
      <div className="lg:pt-30 2sm:pt-20 pt-14">
        <div>
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
              // Even-indexed items (0, 2, 4, ...)
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
                    order="lg:order-1 order-0"
                    position="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                    imageVariants={cardSlideAnimationRight()}
                    cardVariants={cardSlideAnimationRightDelay()}
                  />
                );
              } else {
                // Odd-indexed items (1, 3, 5, ...)
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
                    position="lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
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
}
