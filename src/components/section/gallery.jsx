"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../ui/sectionTitle";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

// Add generateSlug function
function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-")        // Replace spaces with hyphens
    .replace(/-+/g, "-");        // Remove extra hyphens
}

const Gallery = ({ text_muted, bg_muted }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expendItem, setExpendItem] = useState("02"); // Changed from null to "02"

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "https://kscplcms.cubeone.in/api/projects?populate=projectDetails.MainImage"
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch projects data: ${res.status}`);
        }

        const { data } = await res.json();

        // Extract projects
        const projectData = data?.slice(0, 4).map(item => item.projectDetails).filter(Boolean) || [];

        // Map projects to usable structure
        const formattedProjects = projectData.map((project, index) => {
          const imageFormats = project.MainImage?.formats || {};
          const mediumFormat = imageFormats.medium || {};
          const slug = generateSlug(project.Title || "untitled-project"); // Generate slug
          const category = project.Category || "default-category"; // Extract category

          return {
            id: String(index + 1).padStart(2, "0"), // IDs like "01", "02"
            img: mediumFormat.url || project.MainImage?.url || "/default-image.jpg", // Prefer 'medium' or fallback
            img_width: mediumFormat.width || 500, // Use width from medium format or fallback
            img_height: mediumFormat.height || 500, // Use height from medium format or fallback
            img_title: project.Title || "Untitled Project",
            img_desc: project.Description || "No description available",
            slug, // Add slug field
            category, // Add category field
            link: `/construction/${category}/${slug}`, // Use category and slug in link
          };
        });

        setProjects(formattedProjects);
      } catch (err) {
        console.error("Error fetching projects data:", err);
        setError("Unable to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="pt-20">
      <div className="container-fluid">
        <SectionTitle
          sectionName={"Gallery"}
          sectionTitle={"Exploring Our Creations"}
          sectionDesc={"Where Imagination Takes Flight, and Excellence Blossoms"}
          link={"/project-archive"}
          button_text={"View All Projects"}
          bg_muted={bg_muted}
          text_muted={text_muted}
        />
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-nowrap flex-wrap lg:pt-30 2sm:pt-20 pt-14">
        {loading && (
          <p className="text-center text-lg text-secondary-foreground">Loading projects...</p>
        )}

        {error && (
          <p className="text-center text-lg text-red-500">{error}</p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-lg text-secondary-foreground">No projects found.</p>
        )}

        {!loading &&
          !error &&
          projects.map(({ id, img, img_width, img_height, img_desc, img_title, link }) => (
            <div
              key={id}
              onMouseEnter={() => setExpendItem(id)}
              onMouseLeave={() => setExpendItem("02")}
              className={`${
                expendItem === id ? "lg:basis-[47%] basis-[50%]" : "lg:basis-[20%] basis-[30%]"
              } flex-grow sm:h-[600px] h-[300px] overflow-hidden group transition-all duration-700 relative`}
            >
              <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-between 2xl:pl-[30px] pl-5 pr-5 2xl:pr-0 py-[30px] after:absolute after:left-0 after:bottom-0 after:contents-[''] after:w-full after:h-1/2 after:bg-bottom-liner after:z-[-1] z-10">
                <h3
                  className={`text-6xl font-extrabold leading-120 transition-all duration-700 text-transparent webkit-text-stroke-width-1 webkit-text-stroke-white ${
                    expendItem === id ? "webkit-text-stroke-primary" : ""
                  }`}
                >
                  {id}
                </h3>
                <div
                  className={`flex 2xl:flex-row ${
                    expendItem === id ? "flex-col" : "flex-col sm:flex-row"
                  } items-start justify-between 2xl:items-end`}
                >
                  <Link
                    href={link}
                    className="text-3xl 2sm:text-4xl font-bold leading-135 text-white max-w-60 2xl:min-w-56 min-w-48 relative"
                  >
                    {img_title}
                  </Link>
                  <p
                    className={`text-secondary-foreground font-semibold 3xl:max-w-[421px] 2xl:max-w-80 transition-all duration-700 3xl:min-w-[420px] xl:min-w-80 min-w-72 overflow-hidden ${
                      expendItem === id ? "opacity-100" : "sm:opacity-0 opacity-100"
                    }`}
                  >
                    {img_desc}
                  </p>
                </div>
              </div>
              <Image
                src={img}
                alt={img_title}
                loading="lazy"
                placeholder="blur"
                blurDataURL={staticBluarDataUrl}
                width={img_width}
                height={img_height}
                className="h-full sm:h-[600px] h-[300px] w-full object-cover"
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default Gallery;
