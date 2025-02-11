import Image from "next/image";
import bg_banner from "@/assets/images/project-hero-image.jpg";
import RightArrow from "@/assets/icons/rightArrow";
import ProjectSingleSliderTwo from "@/components/section/projectSingle/projectSingleSliderTwo";
import Feedback from "@/components/section/feedback";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Title from "@/components/ui/title";

function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function generateStaticParams() {
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Commercial&populate=projectDetails.MainImage"
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.data?.map((item) => ({
    slug: generateSlug(item.projectDetails?.Title || "no-title"),
  })) || [];
}

export const metadata = {
  title: "Kalpana Struct-Con",
  description: "Kalpana Struct-Con",
};

export default async function ProjectSingle({ params }) {
  const { slug } = params;

  // Fetch projects with brochure data
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=Commercial&populate=projectDetails.MainImage&populate=projectDetails.Images&populate=projectDetails.brochure",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return <div className="container pt-20">Failed to load project data</div>;

  const data = await res.json();
  const project = data.data?.find((p) => 
    generateSlug(p.projectDetails?.Title) === slug
  )?.projectDetails;

  if (!project) return <div className="container pt-20">Project not found</div>;

  return (
    <>
      <section className="blog-single">
        <div>
          <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[30px] h-auto">
              <div className="relative after:absolute sm:after:-left-10 after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[100%] after:bg-primary sm:ml-10 ml-4">
                <h1 className="text-primary-foreground [font-size:_clamp(28px,3vw,20px)] font-extrabold leading-110">
                  {project.Title}
                </h1>
                <span className="inline-block w-[200px] h-[1px] bg-primary"></span>
                <p className="text-basic sm:text-xl 2sm:text-2xl !leading-160 text-primary-foreground mt-[10px]">
                  {project.Description}
                </p>
              </div>

              <div className="bg-primary py-8 sm:px-[20px] px-2 mt-0 pl">
                <ul className="pb-4 flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-4 lg:gap-x-0 gap-y-[30px]">
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Clients:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Client || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Area:
                    </strong>
                    <span className="text-secondary-foreground block">
                      891 m²
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Project year:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Duration || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Project type:
                    </strong>
                    <span className="text-secondary-foreground block">
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

          <ProjectSingleSliderTwo images={project.Images || []} />
        </div>
      </section>

      <Feedback />
    </>
  );
}