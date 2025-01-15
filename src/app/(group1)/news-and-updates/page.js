import Feedback from "@/components/section/feedback"
import BlogCard from "@/components/ui/cards/blogCard"
import Pagination from "@/components/ui/pagination"
import SectionTitle from "@/components/ui/sectionTitle"
import { fetchBlogs } from "@/lib/utils/api"
import ErrorMessage from '@/components/ui/errorMessage';

export const metadata = {
    title: "Kalpana Struct-Con -- Blog Archive",
    description: "Kalpana Struct-Con is a next js and tailwind css website",
};

async function BlogArchive() {
    try {
        const blogsData = await fetchBlogs();
        
        if (!blogsData?.data?.length) {
            return <ErrorMessage message="No blog posts found" />;
        }
        
        return (
            <>
                <section>
                    <div className='container-fluid'>
                        <SectionTitle sectionName={"Blog"} sectionTitle={"Design Insights & Inspiration"} sectionDesc={"Unveil the Secrets to Transforming Spaces"} />
                    </div>
                    <div className="container lg:py-30 2sm:py-20 py-14">
                        <div className="grid lg:grid-cols-3 2sm:grid-cols-2 gap-x-5 gap-y-[75px]">
                            {blogsData.data.map(({ id, blog }) => (
                                <div key={id}>
                                    <BlogCard 
                                        id={id}
                                        date={blog.publishDate || 'No date'}
                                        tag={blog.author}
                                        thumb={blog.coverImage?.url || blog.Image?.url}
                                        title={blog.Title}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Pagination />
                </section>
                <Feedback/>
            </>
        )
    } catch (error) {
        console.error('Error in BlogArchive:', error);
        return <ErrorMessage message="Failed to load blog posts" />;
    }
}

export default BlogArchive