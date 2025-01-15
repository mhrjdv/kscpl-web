export async function fetchBlogs() {
  try {
    const response = await fetch('https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
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

export async function fetchSingleBlog(id) {
  try {
    const response = await fetch(
      `https://kscplcms.cubeone.in/api/blogs/${id}?populate=blog.Image&populate=blog.coverImage`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.data) {
      throw new Error('Blog not found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching single blog:', error);
    throw new Error(`Failed to load blog post: ${error.message}`);
  }
}

export async function getRelatedPosts(currentId) {
  const response = await fetch('https://kscplcms.cubeone.in/api/blogs?populate=blog.Image&populate=blog.coverImage');
  if (!response.ok) {
    throw new Error('Failed to fetch related posts');
  }
  const data = await response.json();
  return data.data.filter(post => post.id !== currentId).slice(0, 4);
}
