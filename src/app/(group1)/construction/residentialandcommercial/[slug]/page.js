import Image from "next/image";
import bg_banner from "@/assets/images/project-hero-image.jpg";
import RightArrow from "@/assets/icons/rightArrow";
import ProjectSingleSliderTwo from "@/components/section/projectSingle/projectSingleSliderTwo";
import Feedback from "@/components/section/feedback";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Title from "@/components/ui/title";

export const metadata = {
  title: "Kalpana Struct-Con -- Project Single",
  description: "Kalpana Struct-Con is a next js and tailwind css website",
};

export default async function ProjectSingle({ params }) {
  const { slug } = params;

  // Fetch projects filtered by "ResidentialandCommercial" category
  const response = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=ResidentialandCommercial&populate=projectDetails.MainImage&populate=projectDetails.Images"
  );
  const data = await response.json();

  if (!data.data) {
    return <div>No projects found</div>;
  }

  // Find the project with the matching slug
  const project = data.data.find(
    (p) =>
      p.projectDetails.Title
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") === slug
  )?.projectDetails;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <section className="blog-single">
        <div>
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
          <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
              <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
                <h1 className="text-primary-foreground [font-size:_clamp(48px,7vw,130px)] font-extrabold leading-110">
                  {project.Title}
                </h1>
                <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
                <p className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px]">
                  {project.Description}
                </p>
              </div>
              <div className="bg-primary py-15 sm:px-[38px] px-5 lg:-mt-[410px]">
                <Title
                  title_text={"Elegant Urban Oasis"}
                  className={"text-secondary-foreground mb-0"}
                />
                <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-7 lg:gap-x-0 gap-y-[52px]">
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Clients:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Client || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Area:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Area || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Project year:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.Duration || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Project type:
                    </strong>
                    <span className="text-secondary-foreground block">
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
                      {project.Team || "N/A"}
                    </span>
                  </li>
                </ul>
                <ButtonOutline
                  className={
                    "text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary"
                  }
                >
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
                {project.Description}
              </p>
            </div>
          </div>
          <ProjectSingleSliderTwo images={project.Images || []} />
        </div>
      </section>
      <Feedback />
    </>
  );
}

export async function generateStaticParams() {
  const response = await fetch(
    "https://kscplcms.cubeone.in/api/projects?filters[projectDetails][Category][$eq]=ResidentialandCommercial&populate=projectDetails.MainImage"
  );
  const data = await response.json();

  return data.data.map((item) => ({
    slug: item.projectDetails.Title
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  }));
}