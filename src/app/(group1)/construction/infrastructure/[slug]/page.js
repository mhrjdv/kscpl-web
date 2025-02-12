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
  title: "Kalpana Struct-Con",
  description: "Kalpana Struct-Con",
};

export default async function ProjectSingle({ params }) {
  const { slug } = params;

  // Fetch only projects in Infrastructure category
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Infrastructure&populate=projectDetails.MainImage&populate=projectDetails.Images&populate=projectDetails.brochure",
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
          {/* <div className="w-full h-[80vh] relative">
            <Image
              src={project.MainImage?.url || bg_banner}
              width={project.MainImage?.width || 1600}
              height={project.MainImage?.height || 900}
              alt={project.Title || "Project Image"}
              className="object-cover w-full h-auto"
              priority
            />
          </div> */}

          {/* Title & Main Info */}
          <div className="container 2sm:mt-[85px] sm:mt-30 mt-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[30px] h-auto">
              {/* Left Side */}
              <div className="relative after:absolute sm:after:-left-10 after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[100%] after:bg-primary sm:ml-10 ml-4">
                <h1 className="text-primary-foreground [font-size:_clamp(28px,3vw,20px)] font-extrabold leading-110">
                  {project.Title}
                </h1>
                <span className="inline-block w-[200px] h-[1px] bg-primary"></span>
                <p className="text-basic sm:text-xl 2sm:text-2xl !leading-160 text-primary-foreground mt-[10px]">
                  {project.Description}
                </p>
              </div>

              {/* Right Side (Project Info Box) */}
              <div className="bg-primary py-8 sm:px-[20px] px-2 mt-0 pl">
                {/* <Title
                  title_text="Elegant Urban Oasis"
                  className="text-secondary-foreground mb-0 text-lg"
                /> */}
                <ul className="pb-4 flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-4 lg:gap-x-0 gap-y-[30px]">
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Clients:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Replace with actual data */}
                      {project.Client || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Area:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Demo value */}
                      891 m²
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Project year:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Or project.Duration if that is the "year" */}
                      {project.Duration || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Project type:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {/* Could be the same as Category if you like */}
                      {project.Category || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Location:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Location || "N/A"}
                    </span>
                  </li>
                </ul>
                {project.brochure?.url && (
                  <a
                    href={project.brochure.url}
                    className="inline-flex items-center border border-secondary rounded text-sm py-2 px-4 text-secondary-foreground hover:text-primary-foreground hover:bg-secondary transition-colors whitespace-nowrap"
                    download
                    target="_blank" // updated to open in new tab
                  >
                    Download Brochure
                    <span className="rotate-90 ml-2">
                      <RightArrow height="18" width="16" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Paragraph or additional details */}
          {/* <div className="container sm:py-15 py-0">
            <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[115%] after:bg-primary sm:ml-12.5 ml-5 max-w-[895px]">
              <p className="text-primary-foreground lg:pr-4">
              
                The structural system is composed
                of pillars and beams with the same
                section, connected by a metallic
                cube that works as a structural
                node...
              </p>
            </div>
          </div> */}

          {/* Slider with the project images */}
          <ProjectSingleSliderTwo images={project.Images || []} />
        </div>
      </section>

      <Feedback />
    </>
  );
}
