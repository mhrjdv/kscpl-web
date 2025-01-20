import Image from "next/image";
import bg_banner from "@/assets/images/project-hero-image.jpg";
import RightArrow from "@/assets/icons/rightArrow";
import ProjectSingleSliderTwo from "@/components/section/projectSingle/projectSingleSliderTwo";
import Feedback from "@/components/section/feedback";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Title from "@/components/ui/title";

// Reuse the same slug helper to ensure consistent generation
function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function generateStaticParams() {
  // This is called at build time (or on-demand in ISR) to generate your static routes
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Infrastructure&populate=projectDetails.MainImage"
  );

  if (!res.ok) {
    // In a real app you might do something else; you can also just let it throw
    console.error("Failed to fetch Infrastructure projects");
    return [];
  }

  const data = await res.json();
  if (!data || !data.data) {
    console.error("Invalid data structure for Infrastructure projects");
    return [];
  }

  return data.data.map((item) => {
    const title = item.projectDetails?.Title || "no-title";
    return {
      slug: generateSlug(title),
    };
  });
}

export const metadata = {
  title: "Kalpana Struct-Con -- Project Single",
  description: "Kalpana Struct-Con is a next js and tailwind css website",
};

export default async function ProjectSingle({ params }) {
  const { slug } = params;

  // Fetch only projects in Infrastructure category
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Infrastructure&populate=projectDetails.MainImage&populate=projectDetails.Images",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    // If this fails, you can handle it gracefully
    return <div className="container pt-20">Failed to load project data</div>;
  }

  const data = await res.json();

  if (!data || !data.data) {
    return <div className="container pt-20">Invalid data structure</div>;
  }

  // Find the one whose Title slug matches the param slug
  const matched = data.data.find((p) => {
    const title = p.projectDetails?.Title ?? "";
    const pSlug = generateSlug(title);
    return pSlug === slug;
  });

  const project = matched?.projectDetails;
  if (!project) {
    return <div className="container pt-20">Project not found</div>;
  }

  return (
    <>
      <section className="blog-single">
        <div>
          {/* Hero Section */}
          <div className="w-full h-[80vh] relative">
            <Image
              src={project.MainImage?.url || bg_banner}
              width={project.MainImage?.width || 1920}
              height={project.MainImage?.height || 1080}
              alt={project.Title || "Project Image"}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Title & Main Info */}
          <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
              {/* Left Side */}
              <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
                <h1 className="text-primary-foreground [font-size:_clamp(48px,7vw,130px)] font-extrabold leading-110">
                  {project.Title}
                </h1>
                <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
                <p className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px]">
                  {project.Description}
                </p>
              </div>

              {/* Right Side (Project Info Box) */}
              <div className=" bg-primary py-15 sm:px-[38px] px-5 lg:-mt-[410px]">
                <Title
                  title_text="Elegant Urban Oasis"
                  className="text-secondary-foreground mb-0"
                />
                <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-7 lg:gap-x-0 gap-y-[52px]">
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Clients:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Replace with actual data */}
                      {project.Client || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Area:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Demo value */}
                      891 m²
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Project year:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Or project.Duration if that is the "year" */}
                      {project.Duration || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Project type:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Could be the same as Category if you like */}
                      {project.Category || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Location:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Location || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Team:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Hard-coded in your sample; consider pulling from API */}
                      Russell Otten, Gabriel Ranieri, Raissa Furlan, Maria Pereira
                    </span>
                  </li>
                </ul>
                <ButtonOutline
                  className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary"
                >
                  Download Brochure{" "}
                  <span className="rotate-90">
                    <RightArrow height="25" width="22" />
                  </span>
                </ButtonOutline>
              </div>
            </div>
          </div>

          {/* Paragraph or additional details */}
          <div className="container sm:py-15 py-0">
            <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[115%] after:bg-primary sm:ml-12.5 ml-5 max-w-[895px]">
              <p className="text-primary-foreground lg:pr-4">
                {/* Example placeholder text; replace or remove */}
                The structural system is composed
                of pillars and beams with the same
                section, connected by a metallic
                cube that works as a structural
                node...
              </p>
            </div>
          </div>

          {/* Slider with the project images */}
          <ProjectSingleSliderTwo images={project.Images || []} />
        </div>
      </section>

      <Feedback />
    </>
  );
}
