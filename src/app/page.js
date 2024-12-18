import AboutOne from '@/components/section/about/aboutOne';
import Feedback from '@/components/section/feedback';
import Gallery from '@/components/section/gallery';
import BannerTwo from '@/components/section/heroes/bannerTwo';
import ProjectsSlider from '@/components/section/projectsSlider';
import Testimonial from '@/components/section/testimonial';
import Counter from '@/components/ui/counter';
import VideoPortfolio from '@/components/section/videoPortfolio';
import HeaderTwo from '@/components/header/headerTwo';
import Footer from '@/components/footer';

export const metadata = {
  title: 'KSCPL - Kalpana Struct-Con Private Limited',
  description: 'Leading Construction & Infrastructure Development Company',
};

const fetchBannerData = async () => {
  try {
    const res = await fetch(
      'https://kscplcms.cubeone.in/api/homepage-banner?populate=*',
      { next: { revalidate: 10 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch banner data');
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching banner data:', error);
    return null; // Handle errors gracefully
  }
};


const Home2 = async () => {
  const bannerData = await fetchBannerData();

  if (!bannerData) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <>
      <HeaderTwo />
      {/* Hero Banner */}
      <BannerTwo bannerData={bannerData} />

      {/* About Section */}
      <AboutOne />

      {/* Counter Section */}
      <Counter />

      {/* Gallery Section */}
      <Gallery />

      {/* Video Portfolio Section */}
      <VideoPortfolio />

      {/* Projects Slider Section */}
      <ProjectsSlider />

      {/* Testimonial Section */}
      <Testimonial />

      {/* Feedback Section */}
      <Feedback />

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Home2;
