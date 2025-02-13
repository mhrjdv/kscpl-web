"use client";

import { useEffect, useState } from "react";
import Feedback from "@/components/section/feedback";
import ConstructionAllCard from "@/components/ui/cards/constructionAllCard";
import SectionTitle from "@/components/ui/sectionTitle";

// A small helper to generate slugs consistently
function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-")        // Replace spaces with hyphens
    .replace(/-+/g, "-");        // Remove extra hyphens
}

export default function All() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          "https://kscplcms.cubeone.in/api/projects?populate=projectDetails.MainImage&populate=projectDetails.Images"
        );

        // Check if the response is okay
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        // If the data structure is as you showed, we can safely check data.data
        if (!data || !data.data) {
          throw new Error("Invalid data structure received from API");
        }

        // Map the API response to the required format
        const formattedData = data.data.map((item) => {
          const details = item.projectDetails || {};
          const {
            MainImage,
            Title = "No Title",
            Client = "No Client",
            Category = "",
          } = details;

          // Generate slug from the title
          const slug = generateSlug(Title);

          return {
            id: item.id,
            img: MainImage?.url || "",
            width: MainImage?.width || 800,
            height: MainImage?.height || 600,
            name: Title,
            position: Client,
            slug,
            category: Category,
          };
        });

        setProjects(formattedData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Error fetching projects");
      }
    }

    fetchProjects();
  }, []);

  // Optionally handle and show any error
  if (error) {
    return (
      <div className="container pt-20">
        <p className="text-red-600">Failed to load projects: {error}</p>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container-fluid">
          <SectionTitle
            sectionName="Projects"
            sectionTitle="Construction"
            sectionDesc="Where Imagination Takes Flight, and Excellence Blossoms"
          />
        </div>
        <div className="container lg:pt-30 2sm:pt-20 pt-14">
          <div className="grid lg:grid-cols-3 2sm:grid-cols-2 gap-7">
            {projects.map(
              ({
                id,
                img,
                width,
                height,
                name,
                position,
                slug,
                category,
              }) => (
                <ConstructionAllCard
                  key={id}
                  img={img}
                  width={width}
                  height={height}
                  name={name}
                  position={position}
                  slug={slug}
                  category={category}
                />
              )
            )}
          </div>
        </div>
      </section>
      <Feedback />
    </>
  );
}
