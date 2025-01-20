import Feedback from "@/components/section/feedback";
import BlogCard from "@/components/ui/cards/blogCard";
import Pagination from "@/components/ui/pagination";
import SectionTitle from "@/components/ui/sectionTitle";
import ErrorMessage from "@/components/ui/errorMessage";

export const metadata = {
  title: "Kalpana Struct-Con -- Blog Archive",
  description: "Kalpana Struct-Con is a next js and tailwind css website",
};

// 1) Helper to generate slug from title
function generateSlug(title = "") {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")  // remove invalid chars
    .replace(/\s+/g, "-")         // replace spaces with hyphens
    .replace(/-+/g, "-");         // collapse multiple hyphens
}

// 2) Helper to pick a responsive image from coverImage or fallback to blog.Image
function getResponsiveImage(blog) {
  // Check coverImage first, fallback to blog.Image
  const cover = blog?.coverImage;
  const image = blog?.Image;

  // Try mediums or small if they exist
  const mediumCover = cover?.formats?.medium?.url;
  const smallCover = cover?.formats?.small?.url;
  const coverOriginal = cover?.url;

  const mediumImage = image?.formats?.medium?.url;
  const smallImage = image?.formats?.small?.url;
  const imageOriginal = image?.url;

  // Priority: coverImage medium -> coverImage small -> coverImage original -> blog.Image medium -> blog.Image small -> blog.Image original
  return (
    mediumCover ||
    smallCover ||
    coverOriginal ||
    mediumImage ||
    smallImage ||
    imageOriginal ||
    ""
  );
}

// 3) Fetch all blogs
async function fetchBlogs() {
  try {
    const response = await fetch(
      "https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { data: [] }; // Return empty data instead of throwing
  }
}

export default async function BlogArchive() {
  try {
    const blogsData = await fetchBlogs();

    if (!blogsData?.data?.length) {
      return <ErrorMessage message="No blog posts found" />;
    }

    return (
      <>
        <section>
          <div className="container-fluid">
            <SectionTitle
              sectionName="Blog"
              sectionTitle="Design Insights & Inspiration"
              sectionDesc="Unveil the Secrets to Transforming Spaces"
            />
          </div>

          <div className="container lg:py-30 2sm:py-20 py-14">
            <div className="grid lg:grid-cols-3 2sm:grid-cols-2 gap-x-5 gap-y-[75px]">
              {blogsData.data.map(({ id, blog }) => {
                // Generate a slug from the title to link to /news-and-updates/[title]
                const slug = generateSlug(blog.Title || "no-title");
                // Decide which image size to display
                const imageUrl = getResponsiveImage(blog);

                return (
                  <div key={id}>
                    <BlogCard
                      id={id}
                      date={blog.publishDate || "No date"}
                      tag={blog.author || "No author"}
                      thumb={imageUrl}
                      title={blog.Title}
                      // If BlogCard supports a link or slug prop, pass it here.
                      // Adjust to match your BlogCard API.
                      link={`/news-and-updates/${slug}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* If you have enough posts to paginate, do so here */}
          <Pagination />
        </section>

        <Feedback />
      </>
    );
  } catch (error) {
    console.error("Error in BlogArchive:", error);
    return <ErrorMessage message="Failed to load blog posts" />;
  }
}
