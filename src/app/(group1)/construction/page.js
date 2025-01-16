"use client";

import { useEffect, useState } from "react";
import Feedback from "@/components/section/feedback";
import ConstructionAllCard from "@/components/ui/cards/constructionAllCard";
import SectionTitle from "@/components/ui/sectionTitle";

const All = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://kscplcms.cubeone.in/api/projects?populate=projectDetails.MainImage&populate=projectDetails.Images"
        );
        const data = await response.json();

        // Map the API response to the required format
        const formattedData = data.data.map((item) => {
          const { MainImage, Title, Client, Category } = item.projectDetails || {};
          
          // Generate slug from the title
          const slug = Title
            ? Title.toLowerCase()
                .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
            : "no-title";

          return {
            id: item.id,
            img: MainImage?.url || "",
            width: MainImage?.width || 800,
            height: MainImage?.height || 600,
            name: Title || "No Title",
            position: Client || "No Client",
            slug: slug,
            category: Category || "",
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
            sectionName={"Projects"}
            sectionTitle={"Construction"}
            sectionDesc={"Where Imagination Takes Flight, and Excellence Blossoms"}
          />
        </div>
        <div className="container lg:pt-30 2sm:pt-20 pt-14">
          <div className="grid lg:grid-cols-3 2sm:grid-cols-2 gap-7">
            {projects.map(({ id, img, width, height, name, position, slug, category }) => (
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
            ))}
          </div>
        </div>
      </section>
      <Feedback />
    </>
  );
};

export default All;