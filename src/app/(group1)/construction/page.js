"use client";

import { useEffect, useState } from "react";
import Feedback from "@/components/section/feedback";
import ConstructionAllCard from "@/components/ui/cards/constructionAllCard";
import SectionTitle from "@/components/ui/sectionTitle";

// Utility function to generate a slug
const generateSlug = (title) =>
  title ? title.replace(/\s+/g, "-").toLowerCase() : "no-slug";

const All = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/projects?populate=projectDetails.MainImage&populate=projectDetails.Images"
        );
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
          console.warn("No projects found.");
          setProjects([]);
          return;
        }

        // Map the API response to the required format
        const formattedData = data.data.map((item) => {
          const projectDetails = item.projectDetails || {};
          const mainImage = projectDetails.MainImage || {};
          const images = projectDetails.Images || [];

          return {
            id: item.id,
            slug: projectDetails.Slug || generateSlug(projectDetails.Title), // Use API slug or generate dynamically
            category: projectDetails.Category?.toLowerCase() || "unknown", // Fetch and normalize category
            title: projectDetails.Title || "No Title",
            client: projectDetails.Client || "No Client",
            location: projectDetails.Location || "No Location",
            duration: projectDetails.Duration || "No Duration",
            description: projectDetails.Description || "No Description",
            mainImage: {
              url: mainImage.url || "",
              width: mainImage.width || 800,
              height: mainImage.height || 600,
            },
            images: images.map((img) => ({
              id: img.id,
              url: img.url || "",
              thumbnail: img.formats?.thumbnail?.url || "",
            })),
          };
        });

        setProjects(formattedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <section className="pt-20">
        <div className="container-fluid">
          <SectionTitle
            sectionName="Projects"
            sectionTitle="Construction"
            sectionDesc="Where Imagination Takes Flight, and Excellence Blossoms"
          />
        </div>
        <div className="container lg:pt-30 2sm:pt-20 pt-14">
          <div className="grid lg:grid-cols-3 2sm:grid-cols-2 gap-7">
            {projects.map((project) => (
              <ConstructionAllCard
                key={project.id}
                slug={project.slug} // Pass the slug
                category={project.category} // Pass the category
                img={project.mainImage.url}
                name={project.title}
                position={project.client}
              />
            ))}
          </div>
        </div>
      </section>
      <Feedback />
    </>
  );
};

export default All;
