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
          "https://kscplcms.cubeone.in/api/constructions?populate=constructionProjects.mainImage"
        );
        const data = await response.json();

        // Map the API response to the required format
        const formattedData = data.data.map((item) => {
          const mainImage = item.constructionProjects?.mainImage || {};
          return {
            id: item.id,
            img: mainImage.url || "", // Main image URL
            width: mainImage.width || 800, // Default width if not provided
            height: mainImage.height || 600, // Default height if not provided
            name: item.constructionProjects?.title || "No Title", // Project Title
            position: item.constructionProjects?.client || "No Client", // Client
            social_link: [], // Add social links if available
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
            {projects.map(({ id, img, width, height, name, position, social_link }) => (
              <ConstructionAllCard
                key={id}
                img={img}
                width={width}
                height={height}
                name={name}
                position={position}
                social_link={social_link}
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
