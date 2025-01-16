"use client"; // Mark as a Client Component
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RightArrow from '@/assets/icons/rightArrow';
import InputFiled from './inputFiled';
import ButtonOutline from './buttons/buttonOutline';
import Image from 'next/image';

const SideBar = ({ order }) => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent posts from the API
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(
          'https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recent posts');
        }
        const data = await response.json();
        setRecentPosts(data.data);
        setFilteredPosts(data.data); // Initialize filtered posts with all posts
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        setError('Failed to load recent posts');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter posts based on the search query
    const filtered = recentPosts.filter((post) =>
      post.blog.Title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`lg:sticky lg:top-16 lg:pb-16 ${order}`}>
      {/* Search Section */}
      <div>
        <h1 className="[font-size:_clamp(33px,5vw,48px)] font-semibold leading-[100%] text-primary-foreground mb-[30px]">
          Search
        </h1>
        <InputFiled
          placeholderc={'Type & Hit Enter'}
          type={'text'}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Recent Posts Section */}
      <div className="pt-17.5">
        <h1 className="[font-size:_clamp(33px,5vw,48px)] font-semibold leading-[100%] text-primary-foreground mb-[30px] last:mb-0">
          Recent Posts
        </h1>
        {filteredPosts.slice(0, 3).map(({ id, blog }) => {
          const slug = blog.Title.toLowerCase().replace(/ /g, '-');
          const thumb = blog.coverImage?.url || blog.Image?.url;
          const date = blog.publishDate || 'No date';
          const title = blog.Title;

          return (
            <div key={id} className="flex gap-[26px] mb-7.5 last:mb-0">
              <div className="max-w-[162px]">
                <Image
                  src={thumb}
                  loading="lazy"
                //   placeholder="blur"
                  alt={title}
                  width={162}
                  height={120}
                />
              </div>
              <div>
                <Link
                  href={`/news-and-updates/${slug}`}
                  className="hover-underline text-2xl leading-120 font-semibold"
                >
                  <span>
                    {title.length > 25 ? title.slice(0, 25) + '...' : title}
                  </span>
                </Link>
                <p className="text-primary">{date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;