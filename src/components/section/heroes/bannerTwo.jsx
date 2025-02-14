"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import {
  useRef,
  useEffect,
  useState,
} from "react";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import RightArrow from "@/assets/icons/rightArrow";
import hero_vector from "@/assets/images/hero-vector-bg.png"
import PreLoading from '@/components/ui/preLoading';

const defaultBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0dhZglwAAAABJRU5ErkJggg==";

const BannerTwo = () => {
  const swiperRef = useRef();
  const [bannerData, setBannerData] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const res = await fetch(
          "https://kscplcms.cubeone.in/api/homepage-banner?populate=*",
          { next: { revalidate: 10 } }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch banner data"
          );
        }

        const { data } = await res.json();
        setBannerData({
          heroSlideImages:
            data.heroSlideImages.map((image) => ({
              id: image.id,
              url: image.url,
              title: image.name, // Use `name` as the title for heroSlideImages
            })),
          bottomImages: data.bottomImages.map(
            (image) => ({
              id: image.id,
              url: image.url,
              title: image.name, // Use `name` as the title for bottomImages
            })
          ),
          heroSlideImagesTitle:
            data.heroSlideImagesTitle, // Pass the title for hero slides
          topHeroBannerHeading: data.topHeroBannerHeading,
        });
      } catch (error) {
        console.error(
          "Error fetching banner data:",
          error
        );
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (loading) {
    return <PreLoading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (
    !bannerData ||
    !bannerData.heroSlideImages ||
    !bannerData.bottomImages
  ) {
    return (
      <p>
        Error loading banner data. Please refresh
        the page.
      </p>
    );
  }

  const mainTitles = [
    bannerData.topHeroBannerHeading?.headingOne || "",
    bannerData.topHeroBannerHeading?.headingTwo || "",
    bannerData.topHeroBannerHeading?.headingThree || ""
  ];

  const pagination = {
    clickable: true,
    el: ".hero-pagination",
    renderBullet: function (index, className) {
      return `<span class='${className} text-secondary text-left lg:text-right translate-y-16 opacity-0 absolute h-0 leading-[90%] [font-size:_clamp(60px,8vw,80px)] font-bold right-0'>
        ${mainTitles[index]}
      </span>`;
    },
  };

  return (
    <section className="banner-two">
      <div className="grid grid-cols-2">
        {/* Banner Left Side */}
        <div
          className="bg-primary pt-[136px] pb-[148px] bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${hero_vector.src})`,
          }}
        >
          <div className="z-10 relative px-3 md:px-0">
            <div className="hero-pagination flex"></div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-end gap-5 xl:pr-10 pr-3 lg:mt-10 mt-5">
              <Link
                href="/construction"
                className="inline-block"
              >
                <ButtonOutline className="px-4 md:px-6 lg:px-8 py-2 border-secondary text-secondary-foreground after:bg-secondary hover:text-primary">
                  <span className="text-sm md:text-base">
                    Construction
                  </span>
                </ButtonOutline>
              </Link>
              <Link
                href="/realty"
                className="md:mt-0 mt-2 inline-block"
              >
                <ButtonFill className="px-4 md:px-6 lg:px-8 py-2 after:bg-secondary text-primary-foreground border-secondary hover:text-secondary-foreground">
                  <span className="text-sm md:text-base">
                    Realty
                  </span>
                </ButtonFill>
              </Link>
            </div>
          </div>
        </div>

        {/* Banner Right Side */}
        <div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={pagination}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{ delay: 4000 }}
            loop={true}
            modules={[
              Pagination,
              Navigation,
              Autoplay,
            ]}
            className="h-full w-full"
            onSlideChange={(swiper) => {
              const currentIndex =
                swiper.realIndex;
              const paginationText =
                document.querySelector(
                  ".mobile-banner-text"
                );
              if (paginationText) {
                paginationText.innerHTML =
                  bannerData.heroSlideImagesTitle ||
                  "Slide Title";
              }
            }}
          >
            {bannerData.heroSlideImages.map(
              ({ id, url, title }) => (
                <SwiperSlide
                  key={id}
                  className="relative"
                >
                  <Image
                    src={url}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={
                      defaultBlurDataURL
                    }
                    alt={title || "Slide Image"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
                </SwiperSlide>
              )
            )}
            <div className="flex justify-between absolute right-0 bottom-0 z-40">
              <div className="flex flex-col w-12 sm:w-16 md:w-[70px] xl:w-[90px] h-28 md:h-36 xl:h-[181px]">
                <button
                  onClick={() =>
                    swiperRef.current?.slideNext()
                  }
                  className="bg-primary text-secondary-foreground flex justify-center items-center h-1/2"
                >
                  <RightArrow
                    width="24"
                    height="22"
                  />
                </button>

                <button
                  onClick={() =>
                    swiperRef.current?.slidePrev()
                  }
                  className="bg-secondary text-primary-foreground flex justify-center items-center h-1/2 rotate-180"
                >
                  <RightArrow
                    width="24"
                    height="22"
                  />
                </button>
              </div>
            </div>
          </Swiper>
        </div>
      </div>

      {/* Banner Bottom */}
      <div className="grid lg:grid-cols-3 2sm:grid-cols-2">
        {bannerData.bottomImages.map(
          (image, index) => {
            const staticTitles = [
              bannerData.topHeroBannerHeading?.subHeadingOne || "",
              bannerData.topHeroBannerHeading?.subHeadingTwo || "",
              bannerData.topHeroBannerHeading?.subHeadingThree || ""
            ];
            return (
              <div
                key={image.id}
                className='relative overflow-hidden after:contents-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-overlay' // Reduced height by 30%
              >
                <Image
                  src={image.url}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  alt={
                    image.title
                  }
                  width={780}
                  height={408}
                  // className="w-full h-full object-cover"
                />
                <h4 className="text-background 2xl:text md:text-4xl text-3xl leading-[120%] font-bold absolute xl:left-12.5 md:left-9 sm:left-7 left-3 top-1/2 -translate-y-1/2 z-10">
                  {staticTitles[index]}
                </h4>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default BannerTwo;
