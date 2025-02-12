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
import PreLoading from '@/components/ui/preLoading';

export const metadata = {
  title: 'KSCPL - Kalpana Struct-Con Private Limited',
  description: 'Leading Construction & Infrastructure Development Company',
};

const fetchHomePageData = async () => {
  try {
    const res = await fetch(
      'https://kscplcms.cubeone.in/api/homepage-banner?populate=*',
      { next: { revalidate: 10 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch home page data');
    }

    const { data } = await res.json();
    return {
      bannerData: data,
      aboutUsTitle: data?.aboutUsTitle || 'Default About Us Title',
      aboutUsSubTitle: data?.aboutUsSubTitle || 'Default About Us Subtitle',
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      bannerData: null,
      aboutUsTitle: 'Default About Us Title',
      aboutUsSubTitle: 'Default About Us Subtitle',
    }; // Provide default fallback values
  }
};

const Home2 = async () => {
  const homePageData = await fetchHomePageData();

  if (!homePageData.bannerData) {
    return <PreLoading />;
  }

  const { bannerData, aboutUsTitle, aboutUsSubTitle } = homePageData;

  return (
    <>
      <HeaderTwo />
      {/* Hero Banner */}
      <BannerTwo bannerData={bannerData} />

      {/* About Section */}
      <AboutOne aboutUsTitle={aboutUsTitle} aboutUsSubTitle={aboutUsSubTitle} />

      {/* Counter Section */}
      <Counter />

      {/* Gallery Section */}
      <Gallery />

      {/* Video Portfolio Section */}
      <VideoPortfolio />

      {/* Projects Slider Section */}
      {/* <ProjectsSlider /> */}

      {/* Testimonial Section */}
      {/* <Testimonial /> */}

      {/* Feedback Section */}
      <Feedback />

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Home2;
