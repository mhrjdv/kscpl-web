import Image from "next/image";
import Link from "next/link";
import SideBar from "@/components/ui/sideBar";
import QuoteIcon from "@/assets/icons/quoteIcon";
import Feedback from "@/components/section/feedback";
import BlogSlider from "@/components/section/blogSlider";
import NextPrevPost from "@/components/ui/nextPrevPost";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Comments from "@/components/ui/comments";
import SocialMediaList from "@/components/ui/socialMediaList";
import ErrorMessage from "@/components/ui/errorMessage";

// ---------------------------------------------------------------------------
// 1) Fetch all blogs (for generateStaticParams)
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

// ---------------------------------------------------------------------------
// 2) Fetch a single blog by slug (title)
async function fetchSingleBlog(slug) {
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

    // Find the blog with the matching slug
    const blogData = data.data.find(
      (item) =>
        item.blog.Title.toLowerCase().replace(/ /g, "-") === slug.toLowerCase()
    );

    if (!blogData) {
      throw new Error("Blog not found");
    }
    return { data: { blog: blogData.blog } };
  } catch (error) {
    console.error("Error fetching single blog:", error);
    throw new Error(`Failed to load blog post: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// 3) Fetch related posts (excluding the current blog)
async function getRelatedPosts(currentSlug) {
  try {
    const response = await fetch(
      "https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch related posts");
    }
    const data = await response.json();
    return data.data
      .filter(
        (post) =>
          post.blog.Title.toLowerCase().replace(/ /g, "-") !== currentSlug
      )
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// 4) Generate static paths
export async function generateStaticParams() {
  const blogsData = await fetchBlogs();
  return blogsData.data.map((blog) => ({
    title: blog.blog.Title.toLowerCase().replace(/ /g, "-"),
  }));
}

// ---------------------------------------------------------------------------
// 5) Generate metadata
export async function generateMetadata({ params }) {
  try {
    const blogData = await fetchSingleBlog(params.title);
    return {
      title: `Kalpana Struct-Con -- ${blogData.data.blog.Title}`,
      description: blogData.data.blog.Content?.[0]?.children?.[0]?.text || "",
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

// ---------------------------------------------------------------------------
// 6) Helper: get responsive image URL (coverImage or fallback to Image)
function getResponsiveImage(blog) {
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

// ---------------------------------------------------------------------------
// 7) Utility: render inline text or link nodes, handling bold/italic
function renderInlineChildren(children = []) {
  return children.map((node, i) => {
    // If it's just a text node
    if (node.type === "text" || !node.type) {
      let text = node.text || "";
      let className = "";
      // handle bold, italic
      if (node.bold) {
        className += " font-bold";
      }
      if (node.italic) {
        className += " italic";
      }
      // You could also handle underline, code, etc. if your CMS supports it
      return (
        <span key={i} className={className}>
          {text}
        </span>
      );
    }
    // If it's a link node
    if (node.type === "link") {
      // node.url for the href, node.children for the link text
      return (
        <a
          key={i}
          href={node.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          {renderInlineChildren(node.children)}
        </a>
      );
    }

    // If your CMS returns other custom node types inline, handle them here
    return null;
  });
}

// ---------------------------------------------------------------------------
// 8) Utility: render block-level content (paragraph, heading, list, etc.)
function renderBlockContent(content, index) {
  switch (content.type) {
    case "paragraph": {
      // For paragraphs, we typically have an array of inline children
      return (
        <p key={index} className="text-primary-foreground pt-[18px]">
          {renderInlineChildren(content.children)}
        </p>
      );
    }

    case "heading": {
      // your CMS might provide content.level (1,2,3, etc.). Default to H2 if not specified
      const HeadingTag = `h${content.level || 2}`; // or clamp if you only want h1..h3
      return (
        <HeadingTag
          key={index}
          className="text-primary-foreground font-bold leading-135 pt-[23px] mb-[14px]"
        >
          {renderInlineChildren(content.children)}
        </HeadingTag>
      );
    }

    case "list": {
      // "format" can be "ordered" or "unordered"
      if (content.format === "ordered") {
        return (
          <ol key={index} className="list-decimal pl-5">
            {content.children?.map((listItem, liIndex) => (
              <li key={liIndex} className="text-primary-foreground pt-[6px]">
                {renderInlineChildren(listItem.children)}
              </li>
            ))}
          </ol>
        );
      } else {
        // default to unordered
        return (
          <ul key={index} className="list-disc pl-5">
            {content.children?.map((listItem, liIndex) => (
              <li key={liIndex} className="text-primary-foreground pt-[6px]">
                {renderInlineChildren(listItem.children)}
              </li>
            ))}
          </ul>
        );
      }
    }

    default: {
      // In case of other custom block types, or if content.type is empty
      // You could add more handling for e.g. blockquote, code-block, etc.
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// 9) BlogSingle Component
export default async function BlogSingle({ params }) {
  try {
    // fetch the single blog + related in parallel
    const [blogData, relatedPosts] = await Promise.all([
      fetchSingleBlog(params.title),
      getRelatedPosts(params.title),
    ]);

    if (!blogData?.data?.blog) {
      return <ErrorMessage message="Blog post not found" />;
    }

    const blog = blogData.data.blog;

    // Decide which image to use in the hero section
    const heroImageUrl = getResponsiveImage(blog);

    // If your blog might have a "quote" or "quoteAuthor" etc.:
    // e.g. blog.quote, blog.quoteAuthor, blog.quoteTitle
    // We'll keep the code you had for that

    return (
      <>
        <section>
          {/* Hero section with background image */}
          <div
            className='object-cover bg-no-repeat 2xl:pt-[448px] xl:pt-[300px] lg:pt-[200px] pt-[150px] pb-[68px] relative z-[1] after:contents-[""] after:z-[-1] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full after:bg-bottom-liner'
            style={{
              backgroundImage: heroImageUrl ? `url("${heroImageUrl}")` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container">
              <h1 className="text-[#F9FFFC] [font-size:_clamp(48px,6vw,90px)] font-extrabold leading-110">
                {blog.Title}
              </h1>
              <p className="mt-14 text-secondary-foreground flex sm:gap-[9px] gap-[1px]">
                <span>{blog.publishDate || "No date"}</span> /{" "}
                <span>{blog.author || "No author"}</span> / <span>5 min read</span>
              </p>
            </div>
          </div>

          <div className="container lg:pt-30 2sm:pt-20 pt-14">
            <div className="grid 2xl:grid-cols-[auto_427px] lg:grid-cols-[auto_400px] 2xl:gap-[130px] lg:gap-16 items-start">
              {/* Main content */}
              <div>
                {/* Render the blog.Content array with the new function */}
                {blog.Content?.map((block, index) => renderBlockContent(block, index))}

                {/* If the blog has a "quote" field */}
                {blog.quote && (
                  <blockquote className="pt-20 pb-16 flex gap-6">
                    <span className="text-secondary-foreground">
                      <QuoteIcon width="121" />
                    </span>
                    <div>
                      {blog.quote}
                      {blog.quoteAuthor && (
                        <div className="mt-4 relative after:contents-[''] after:absolute after:-left-5 after:top-0 after:h-full after:w-[1px] after:bg-primary left-5">
                          <p className="font-extrabold text-primary-foreground">
                            {blog.quoteAuthor}
                          </p>
                          <span>{blog.quoteTitle}</span>
                        </div>
                      )}
                    </div>
                  </blockquote>
                )}

                <hr className="mt-[22px] mb-12.5" />
              </div>
              {/* Sidebar */}
              <SideBar />
            </div>

            {/* Next/Prev, Comments, etc. as needed */}
            {/* <NextPrevPost /> */}
            <hr className="mt-12.5 mb-17.5 max-w-[830px] w-full" />
            {/* <Comments /> */}

            {/* Related posts */}
            <div>
              <h2 className="[font-size:_clamp(33px,5vw,48px)] font-bold leading-120 text-primary-foreground pb-[32px]">
                Related Post
              </h2>
              <BlogSlider
                data={relatedPosts.map((post) => ({
                  id: post.id,
                  date: post.blog.publishDate,
                  tag: post.blog.author,
                  thumb: getResponsiveImage(post.blog),
                  title: post.blog.Title,
                }))}
              />
            </div>
          </div>
        </section>
        <Feedback />
      </>
    );
  } catch (error) {
    console.error("Error in BlogSingle:", error);
    return <ErrorMessage message={`Failed to load blog post: ${error.message}`} />;
  }
}
