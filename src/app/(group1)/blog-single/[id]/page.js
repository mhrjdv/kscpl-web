import Image from 'next/image';
import Feedback from '@/components/section/feedback';
import SideBar from '@/components/ui/sideBar';
import QuoteIcon from '@/assets/icons/quoteIcon';
import BlogSlider from '@/components/section/blogSlider';
import ErrorMessage from '@/components/ui/errorMessage';

const API_URL = 'https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage';

async function fetchBlogs() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

async function fetchSingleBlog(title) {
  const blogsData = await fetchBlogs();
  return blogsData.data.find(blog => blog.blog.Title.toLowerCase().replace(/ /g, '-') === title);
}

async function getRelatedPosts(title) {
  const blogsData = await fetchBlogs();
  return blogsData.data.filter(blog => blog.blog.Title.toLowerCase().replace(/ /g, '-') !== title);
}

export async function generateStaticParams() {
  const blogsData = await fetchBlogs();
  return blogsData.data.map((blog) => ({
    title: blog.blog.Title.toLowerCase().replace(/ /g, '-'),
  }));
}

export async function generateMetadata({ params }) {
  try {
    const blogData = await fetchSingleBlog(params.title);
    return {
      title: `Kalpana Struct-Con -- ${blogData.blog.Title}`,
      description: blogData.blog.Content?.[0]?.children?.[0]?.text || '',
    };
  } catch (error) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogSingle({ params }) {
  try {
    const blogData = await fetchSingleBlog(params.title);
    const relatedPosts = await getRelatedPosts(params.title);

    if (!blogData) {
      return <ErrorMessage message="Blog post not found" />;
    }

    const blog = blogData.blog;

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

    return (
      <>
        <section>
          <div
            className='object-cover bg-no-repeat 2xl:pt-[448px] xl:pt-[300px] lg:pt-[200px] pt-[150px] pb-[68px] relative z-[1] after:contents-[""] after:z-[-1] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full after:bg-bottom-liner'
            style={{ backgroundImage: `url(${blog.coverImage?.url || blog.Image?.url})` }}
          >
            <div className="container">
              <h1 className="text-[#F9FFFC] [font-size:_clamp(48px,6vw,90px)] font-extrabold leading-110">
                {blog.Title}
              </h1>
              <p className="mt-14 text-secondary-foreground flex sm:gap-[9px] gap-[1px]">
                <span>{blog.publishDate || 'No date'}</span> / <span>{blog.author}</span>
              </p>
            </div>
          </div>

          <div className="container lg:pt-30 2sm:pt-20 pt-14">
            <div className="grid 2xl:grid-cols-[auto_427px] lg:grid-cols-[auto_400px] 2xl:gap-[130px] lg:gap-16 items-start">
              <div>
                {blog.Content?.map((content, index) => renderContent(content, index))}

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
                          <p className="font-extrabold text-primary-foreground">{blog.quoteAuthor}</p>
                          <span>{blog.quoteTitle}</span>
                        </div>
                      )}
                    </div>
                  </blockquote>
                )}

                <hr className="mt-[22px] mb-12.5" />
              </div>
              <SideBar />
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="[font-size:_clamp(33px,5vw,48px)] font-bold leading-120 text-primary-foreground pb-[32px]">
                  Related Posts
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
            )}
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