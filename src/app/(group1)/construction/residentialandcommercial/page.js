"use client";

import { useEffect, useState } from "react";
import ProjectCardOneRealty from "@/components/ui/cards/projectCardOneRealty"; // Updated component
import SectionTitle from "@/components/ui/sectionTitle";
import {
  cardSlideAnimation,
  cardSlideAnimationDelay,
  cardSlideAnimationRight,
  cardSlideAnimationRightDelay,
} from "@/lib/utils";

// Function to generate slugs
function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Collapse multiple hyphens
}

export default function ProjectArchive() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=ResidentialandCommercial&populate=projectDetails.MainImage"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.data) {
          throw new Error("No data found");
        }

        const formattedProjects = data.data.map((item) => {
          const {
            Title = "No Title",
            MainImage,
            Category = "No Category",
            Description = "No Description",
            Location = "No Location",
            Duration = "No Duration",
          } = item.projectDetails || {};

          const slug = generateSlug(Title);
          const categorySlug = (Category || "").toLowerCase();
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

  if (error) {
    return (
      <section>
        <div className="container-fluid pt-20">
          <p className="text-red-600">
            Failed to load Residential and Commercial projects: {error}
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
        <div className="space-y-20">
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
              const CardComponent = ProjectCardOneRealty;

              return index % 2 === 0 ? (
                <CardComponent
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
              ) : (
                <CardComponent
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
          )}
        </div>
      </div>
    </section>
  );
}
