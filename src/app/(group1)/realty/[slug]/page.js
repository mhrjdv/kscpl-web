import Image from "next/image";
import bg_banner from "@/assets/images/project-hero-image.jpg";
import RightArrow from "@/assets/icons/rightArrow";
import ProjectSingleSliderTwo from "@/components/section/projectSingle/projectSingleSliderTwo";
import Feedback from "@/components/section/feedback";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Title from "@/components/ui/title";

/**
 * Create a URL-friendly slug from the project title.
 */
function generateSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generate static parameters from the API data.
 */
export async function generateStaticParams() {
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/realties?populate=realtyProjects.mainImage&populate=realtyProjects.allImages"
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (
    data.data?.map((item) => ({
      slug: generateSlug(item.realtyProjects?.title || "no-title"),
    })) || []
  );
}

export const metadata = {
  title: "Kalpana Struct-Con -- Project Single",
  description: "Kalpana Struct-Con is a next js and tailwind css website",
};

/**
 * Helper function to format a rich text child.
 *
 * This function checks for formatting properties such as bold, italic,
 * and underline, and applies the corresponding Tailwind CSS classes.
 *
 * For example, if the API returns:
 *   { bold: true, text: "STEP IN – LIFE AWAITS", type: "text" }
 *
 * then it will render as:
 *   <span className="font-bold">STEP IN – LIFE AWAITS</span>
 */
function formatText(child, idx) {
  if (!child || typeof child.text !== "string") return null;

  const classes = [];
  if (child.bold) classes.push("font-bold");
  if (child.italic) classes.push("italic");
  if (child.underline) classes.push("underline");

  return (
    <span key={idx} className={classes.join(" ")}>
      {child.text}
    </span>
  );
}

/**
 * Helper function to render portable (rich) text blocks coming from Strapi.
 *
 * This function handles:
 * - Paragraph blocks: rendered as a <p> tag.
 * - Unordered list blocks: rendered as a <ul> with list items (<li>).
 * - Any other block type: rendered in a <div>.
 *
 * Note that the outer container (in this case, the description’s container)
 * keeps your original UI classes intact.
 */
function renderPortableText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, idx) => {
    // Paragraph block
    if (block.type === "paragraph") {
      return (
        <p key={idx} className="mb-3">
          {block.children.map((child, childIdx) =>
            formatText(child, childIdx)
          )}
        </p>
      );
    }

    // Unordered list block
    if (block.type === "list" && block.format === "unordered") {
      return (
        <ul key={idx} className="list-disc pl-5 mb-3">
          {block.children.map((listItem, liIdx) => (
            <li key={liIdx}>
              {listItem.children.map((child, childIdx) =>
                formatText(child, childIdx)
              )}
            </li>
          ))}
        </ul>
      );
    }

    // Fallback: render other block types in a <div>
    return (
      <div key={idx}>
        {block.children
          ? block.children.map((child, childIdx) => formatText(child, childIdx))
          : ""}
      </div>
    );
  });
}

/**
 * Main component for the Project Single page.
 *
 * This component fetches project data from the API, finds the project
 * matching the URL slug, and renders the title, rich text description,
 * features, amenities, location description, and image slider.
 */
export default async function ProjectSingle({ params }) {
  const { slug } = params;

  // Fetch data from the API
  const res = await fetch(
    "https://kscplcms.cubeone.in/api/realties?populate=realtyProjects.mainImage&populate=realtyProjects.allImages&populate=realtyProjects.brochure",
    { next: { revalidate: 60 } }
  );
  if (!res.ok)
    return (
      <div className="container pt-20">
        Please Refresh: Failed to load project data.
      </div>
    );

  const data = await res.json();

  // Find the project whose title slug matches the URL parameter.
  const project = data.data?.find(
    (p) => generateSlug(p.realtyProjects?.title) === slug
  )?.realtyProjects;

  if (!project)
    return <div className="container pt-20">Project not found</div>;

  return (
    <>
      <section className="blog-single">
        <div>
          {/* Main Grid: Left column (title & description) and Right sidebar */}
          <div className="container 2sm:mt-[0px] sm:mt-30 mt-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[30px] h-auto">
              {/* Left Column: Title and Rich Text Description */}
              <div className="relative after:absolute sm:after:-left-10 after:-left-4 after:top-[calc(50%+50px)] after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[100%] after:bg-primary sm:ml-10 ml-4 2sm:mt-[72px]">
                <h1 className="text-primary-foreground [font-size:_clamp(28px,3vw,20px)] font-extrabold leading-110">
                  {project.title}
                </h1>
                <span className="inline-block w-[200px] h-[1px] bg-primary"></span>
                <div className="text-basic sm:text-xl 2sm:text-2xl !leading-160 text-primary-foreground mt-[10px]">
                  {project.description
                    ? renderPortableText(project.description)
                    : "No Description"}
                </div>
              </div>

              {/* Right Sidebar: Registration number, Location, and Features */}
              <div className="bg-primary py-10 sm:px-[30px] px-2 mt-0 pl h-auto">
                {project.MahaReraRegistrationNo && (
                  <p className="text-secondary-foreground mb-5 text-lg">
                    Maha Rera Registration No: {project.MahaReraRegistrationNo}
                  </p>
                )}
                <ul className="pb-4 flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-4 lg:gap-x-0 gap-y-[30px]">
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Location:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.location || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong className="text-secondary-foreground block text-lg mb-1">
                      Features:
                    </strong>
                    <div className="text-secondary-foreground">
                      {project.features
                        ? renderPortableText(project.features)
                        : "N/A"}
                    </div>
                  </li>
                </ul>
                {project.brochure?.url && (
                  <a
                    href={project.brochure.url}
                    className="inline-flex items-center border border-secondary rounded text-sm py-2 px-4 text-secondary-foreground hover:text-primary-foreground hover:bg-secondary transition-colors whitespace-nowrap"
                    download
                    target="_blank"
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

          {/* New Sections Below the Description: Amenities & Location Description */}
          <div className="container sm:py-15 py-0 ">
            {project.amenities && (
              <div className="mb-12 relative after:absolute sm:after:-left-10 after:-left-4 after:top-[calc(50%+50px)] after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[100%] after:bg-primary sm:ml-10 ml-4 2sm:mt-[20px]">
                <h2 className="text-primary-foreground text-2xl font-bold mb-6">
                  Amenities
                </h2>
                <div className="text-primary-foreground grid grid-cols-1 sm:grid-cols-2 sm:ml-10 ml-4">
                  {renderPortableText(project.amenities)}
                </div>
              </div>
            )}
            {project.locationDescription && (
              <div className="relative after:absolute sm:after:-left-10 after:-left-4 after:top-[calc(50%+50px)] after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[100%] after:bg-primary sm:ml-10 ml-4 2sm:mt-[25px]">
                <h2 className="text-primary-foreground text-2xl font-bold mb-6">
                  Location Description
                </h2>
                <div className="text-primary-foreground sm:ml-10 ml-4">
                  {renderPortableText(project.locationDescription)}
                </div>
              </div>
            )}
          </div>

          {/* Slider with all images */}
          <ProjectSingleSliderTwo images={project.allImages || []} />
        </div>
      </section>
      <Feedback />
    </>
  );
}
