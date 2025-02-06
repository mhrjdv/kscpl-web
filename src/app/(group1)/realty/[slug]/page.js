import Image from "next/image";
import bg_banner from "@/assets/images/project-hero-image.jpg";
import RightArrow from "@/assets/icons/rightArrow";
import ProjectSingleSliderOne from "@/components/section/projectSingle/projectSingleSliderOne";
import Paragraph from "@/components/section/projectSingle/paragraph";
import ProjectSingleSliderTwo from "@/components/section/projectSingle/projectSingleSliderTwo";
import TeamTwo from "@/components/section/team/teamTwo";
import Feedback from "@/components/section/feedback";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Title from "@/components/ui/title";

export const metadata = {
  title: "Kalpana Struct-Con -- Project Single",
  description:
    "Kalpana Struct-Con is a next js and tailwind css website",
};

export default async function ProjectSingle({ params }) {
  const { slug } = params;

  // Fetch data from the new API
  const response = await fetch(
    "https://kscplcms.cubeone.in/api/realties?populate=realtyProjects.mainImage&populate=realtyProjects.allImages"
  );
  const data = await response.json();

  // Find the project that matches the slug
  const project = data.data.find(
    (p) =>
      p.realtyProjects.title
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") === slug
  )?.realtyProjects;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <section className="blog-single">
        <div>
          {/* Commenting out the hero section to match reference code styling
          <div className="w-full h-[80vh] relative">
            // ...existing hero code...
          </div> 
          */}
          <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[30px] h-auto">
              <div className="relative after:absolute sm:after:-left-10 after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[100%] after:bg-primary sm:ml-10 ml-4">
                <h1 className="text-primary-foreground [font-size:_clamp(28px,3vw,20px)] font-extrabold leading-110">
                  {project.title}
                </h1>
                <span className="inline-block w-[200px] h-[1px] bg-primary"></span>
                <p className="text-basic sm:text-xl 2sm:text-2xl !leading-160 text-primary-foreground mt-[10px]">
                  {project.description
                    ? project.description.map((desc) =>
                        desc.children.map((child) => child.text).join(" ")
                      ).join(" ")
                    : "No Description"}
                </p>
              </div>

              <div className="bg-primary py-8 sm:px-[20px] px-2 mt-0">
                {/* Removed Title component to match reference UI */}
                <ul className="pb-4 flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-4 lg:gap-x-0 gap-y-[30px]">
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1.5">
                      Location:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.location || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1.5">
                      Features:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.features
                        ? project.features
                            .map((feature) =>
                              feature.children
                                .map((child) => child.text)
                                .join(", ")
                            )
                            .join(", ")
                        : "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1.5">
                      Amenities:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.amenities
                        ? project.amenities
                            .map((amenity) =>
                              amenity.children
                                .map((child) => child.text)
                                .join(", ")
                            )
                            .join(", ")
                        : "N/A"}
                    </span>
                  </li>
                </ul>
                <ButtonOutline className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary text-sm py-2 px-4">
                  Download Brochure{" "}
                  <span className="rotate-90">
                    <RightArrow height={"25"} width={"22"} />
                  </span>
                </ButtonOutline>
              </div>
            </div>
          </div>
          <div className="container sm:py-15 py-0">
            <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[115%] after:bg-primary sm:ml-12.5 ml-5 max-w-[895px]">
              <p className="text-primary-foreground lg:pr-4">
                {project.locationDescription
                  ? project.locationDescription
                      .map((desc) =>
                        desc.children.map((child) => child.text).join(" ")
                      )
                      .join(" ")
                  : "No location description available."}
              </p>
            </div>
          </div>
          <ProjectSingleSliderTwo images={project.allImages || []} />
        </div>
      </section>
      <Feedback />
    </>
  );
}

export async function generateStaticParams() {
  const response = await fetch(
    "https://kscplcms.cubeone.in/api/realties?populate=realtyProjects.mainImage&populate=realtyProjects.allImages"
  );
  const data = await response.json();

  return data.data.map((item) => ({
    slug: item.realtyProjects.title
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  }));
}