import Image from 'next/image';
import Link from 'next/link';
import SideBar from '@/components/ui/sideBar';
import QuoteIcon from '@/assets/icons/quoteIcon';
import Feedback from '@/components/section/feedback';
import BlogSlider from '@/components/section/blogSlider';
import NextPrevPost from '@/components/ui/nextPrevPost';
import ButtonOutline from '@/components/ui/buttons/buttonOutline';
import Comments from '@/components/ui/comments';
import SocialMediaList from '@/components/ui/socialMediaList';
import ErrorMessage from '@/components/ui/errorMessage';

// Fetch all blogs
async function fetchBlogs() {
  try {
    const response = await fetch(
      'https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage',
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
    console.error('Error fetching blogs:', error);
    return { data: [] }; // Return empty data instead of throwing
  }
}

// Fetch a single blog by slug (title)
async function fetchSingleBlog(slug) {
  try {
    const response = await fetch(
      'https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Find the blog with the matching slug
    const blog = data.data.find(
      (item) =>
        item.blog.Title.toLowerCase().replace(/ /g, '-') === slug.toLowerCase()
    );

    if (!blog) {
      throw new Error('Blog not found');
    }
    return { data: { blog } };
  } catch (error) {
    console.error('Error fetching single blog:', error);
    throw new Error(`Failed to load blog post: ${error.message}`);
  }
}

// Fetch related posts (excluding the current blog)
async function getRelatedPosts(currentSlug) {
  try {
    const response = await fetch(
      'https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch related posts');
    }
    const data = await response.json();
    return data.data
      .filter(
        (post) =>
          post.blog.Title.toLowerCase().replace(/ /g, '-') !== currentSlug
      )
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Generate static paths
export async function generateStaticParams() {
  const blogsData = await fetchBlogs();
  return blogsData.data.map((blog) => ({
    title: blog.blog.Title.toLowerCase().replace(/ /g, '-'), // Convert title to slug
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  try {
    const blogData = await fetchSingleBlog(params.title);
    return {
      title: `Kalpana Struct-Con -- ${blogData.data.blog.Title}`,
      description: blogData.data.blog.Content?.[0]?.children?.[0]?.text || '',
    };
  } catch (error) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

// BlogSingle Component
export default async function BlogSingle({ params }) {
  try {
    const [blogData, relatedPosts] = await Promise.all([
      fetchSingleBlog(params.title),
      getRelatedPosts(params.title),
    ]);

    if (!blogData?.data?.blog) {
      return <ErrorMessage message="Blog post not found" />;
    }

    const blog = blogData.data.blog;

    // Function to render content based on type
    const renderContent = (content, index) => {
      switch (content.type) {
        case 'paragraph':
          return (
            <p key={index} className="text-primary-foreground pt-[18px]">
              {content.children?.[0]?.text}
            </p>
          );
        case 'heading':
          return (
            <h3
              key={index}
              className="text-3xl 2sm:text-4xl font-bold text-primary-foreground leading-135 pt-[23px] mb-[14px]"
            >
              {content.children?.[0]?.text}
            </h3>
          );
        case 'list':
          return (
            <ol key={index} className="list-decimal pl-5">
              {content.children?.map((item, idx) => (
                <li key={idx} className="text-primary-foreground pt-[18px]">
                  {item.children?.[0]?.text}
                </li>
              ))}
            </ol>
          );
        default:
          return null;
      }
    };

    const tagList = [
      { id: '1', tag: 'Art and Decor', link: '' },
      { id: '2', tag: 'Modern Living', link: '' },
      { id: '3', tag: 'Renovations', link: '' },
      { id: '4', tag: 'Vintage Style', link: '' },
    ];

    return (
      <>
        <section className="">
          <div
            className='object-cover bg-no-repeat 2xl:pt-[448px] xl:pt-[300px] lg:pt-[200px] pt-[150px] pb-[68px] relative z-[1] after:contents-[""] after:z-[-1] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full after:bg-bottom-liner'
            style={{
              backgroundImage: `url(${blog.coverImage?.url || blog.Image?.url})`,
            }}
          >
            <div className="container">
              <h1 className="text-[#F9FFFC] [font-size:_clamp(48px,6vw,90px)] font-extrabold leading-110">
                {blog.Title}
              </h1>
              <p className="mt-14 text-secondary-foreground flex sm:gap-[9px] gap-[1px]">
                <span>{blog.publishDate || 'No date'}</span> /{' '}
                <span>{blog.author}</span> / <span>5 min read</span>
              </p>
            </div>
          </div>
          <div className="container lg:pt-30 2sm:pt-20 pt-14">
            <div className="grid 2xl:grid-cols-[auto_427px] lg:grid-cols-[auto_400px] 2xl:gap-[130px] lg:gap-16 items-start">
              <div>
                {blog.Content?.map((content, index) =>
                  renderContent(content, index)
                )}

                {/* Quote section if exists */}
                {blog.quote && (
                  <blockquote className="pt-20 pb-16 flex gap-6">
                    <span className="text-secondary-foreground">
                      <QuoteIcon width={'121'} />
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

                {/* Tags */}
                <div className="pt-[54px] flex gap-3 flex-wrap">
                  {tagList.map(({ id, link, tag }) => (
                    <Link href={link} key={id}>
                      <ButtonOutline className="font-normal px-2.5 sm:py-[5px] py-[5px] border">
                        <span className="text-lg">{tag}</span>
                      </ButtonOutline>
                    </Link>
                  ))}
                </div>

                {/* Share on Social Media */}
                <div className="flex gap-7 items-center pt-7.5">
                  <strong>Share on:</strong>
                  <SocialMediaList />
                </div>

                <hr className="mt-[22px] mb-12.5" />
              </div>
              {/* ---------- sidebar */}
              <SideBar />
            </div>

            {/* ------ next and prev post */}
            {/* <NextPrevPost /> */}
            <hr className="mt-12.5 mb-17.5 max-w-[830px] w-full" />

            {/* ------- comments */}
            {/* <Comments /> */}

            {/* ---------- related post */}
            <div>
              <h2 className="[font-size:_clamp(33px,5vw,48px)] font-bold leading-120 text-primary-foreground pb-[32px]">
                Related Post
              </h2>
              <BlogSlider
                data={relatedPosts.map((post) => ({
                  id: post.id,
                  date: post.blog.publishDate,
                  tag: post.blog.author,
                  thumb: post.blog.coverImage?.url || post.blog.Image?.url,
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
    console.error('Error in BlogSingle:', error);
    return <ErrorMessage message={`Failed to load blog post: ${error.message}`} />;
  }
}