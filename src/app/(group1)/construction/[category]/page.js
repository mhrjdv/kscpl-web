// Generate static params for SSG
export async function generateStaticParams() {
    try {
      // Fetch categories dynamically from your API
      const response = await fetch(
        "https://kscplcms.cubeone.in/api/projects?populate=projectDetails.Category"
      );
      const data = await response.json();
  
      if (!data.data || data.data.length === 0) {
        console.warn("No categories found.");
        return [];
      }
  
      // Extract unique categories from the API response
      const uniqueCategories = [
        ...new Set(data.data.map((item) => item.projectDetails.Category.toLowerCase())),
      ];
  
      // Return params for each unique category
      return uniqueCategories.map((category) => ({
        category,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
  
  // Server-side component
  const CategoryPage = ({ params }) => {
    const { category } = params;
  
    return (
      <div>
        <CategoryProjects category={category} />
      </div>
    );
  };
  
  export default CategoryPage;
  