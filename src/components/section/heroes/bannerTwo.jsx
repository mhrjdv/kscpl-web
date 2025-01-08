"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import RightArrow from "@/assets/icons/rightArrow";

const defaultBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0dhZglwAAAABJRU5ErkJggg==";

const BannerTwo = ({ bannerData }) => {
  const swiperRef = useRef();

  if (!bannerData || !bannerData.heroSlideImages || !bannerData.bottomImages) {
    return <p>Error loading banner data. Please refresh the page.</p>;
  }

  const pagination = {
    clickable: true,
    el: ".hero-pagination",
    renderBullet: function (index, className) {
      return `<span class='${className} text-white translate-y-16 opacity-0 absolute h-0 leading-[90%] [font-size:_clamp(40px,8vw,100px)] font-extrabold lg:text-right'>${bannerData.heroSlideImagesTitle || "Slide Title"}</span>`;
    },
  };

  return (
    <section className="banner-two overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* Banner Left Side */}
        <div
          className="bg-primary pt-8 pb-10 bg-cover bg-no-repeat bg-right hidden md:block relative h-full"
          style={{ backgroundImage: `url(/path-to-vector-image.png)` }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-start pl-4 md:pl-6 lg:pl-10 text-left">
            <div className="hero-pagination"></div>
            <div className="flex flex-col md:flex-row md:items-start justify-start gap-3 md:gap-5 mt-5 md:mt-10">
              <Link href="/about-us" className="inline-block">
                <ButtonOutline className="px-4 md:px-6 lg:px-8 py-2 border-secondary text-secondary-foreground after:bg-secondary hover:text-primary">
                  <span className="text-sm md:text-base">Construction</span>
                </ButtonOutline>
              </Link>
              <Link href="/project-archive" className="md:mt-0 mt-2 inline-block">
                <ButtonFill className="px-4 md:px-6 lg:px-8 py-2 after:bg-secondary text-primary-foreground border-secondary hover:text-secondary-foreground">
                  <span className="text-sm md:text-base">Realty</span>
                </ButtonFill>
              </Link>
            </div>
          </div>
        </div>

        {/* Banner Right Side */}
        <div className="relative h-full">
          {/* Mobile Text Overlay */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-white text-center font-extrabold leading-tight text-4xl sm:text-5xl z-10 px-4 mobile-banner-text"
              dangerouslySetInnerHTML={{ __html: bannerData.heroSlideImages.Title || "Slide Title" }}
            ></div>
            <div className="flex flex-col items-center justify-center gap-3 mt-5">
              <Link href="/about-us" className="inline-block mt-3">
                <ButtonFill className="px-4 md:px-6 lg:px-8 py-2 border-secondary text-secondary-foreground border-secondary hover:text-primary ">
                  <span className="text-sm md:text-base">Construction</span>
                </ButtonFill>
              </Link>
              <Link href="/project-archive" className="inline-block mt-3">
                <ButtonFill className="px-4 md:px-6 lg:px-8 py-2 after:bg-secondary text-primary-foreground border-secondary hover:text-secondary-foreground">
                  <span className="text-sm md:text-base">Realty</span>
                </ButtonFill>
              </Link>
            </div>
          </div>

          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={pagination}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{ delay: 4000 }}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="h-full w-full"
            onSlideChange={(swiper) => {
              const currentIndex = swiper.realIndex;
              const paginationText = document.querySelector(".mobile-banner-text");
              if (paginationText) {
                paginationText.innerHTML = bannerData.heroSlideImagesTitle || "Slide Title";
              }
            }}
          >
            {bannerData.heroSlideImages.map(({ id, url, title }) => (
              <SwiperSlide key={id} className="relative">
                <Image
                  src={url}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  alt={title || "Slide Image"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
              </SwiperSlide>
            ))}
            <div className="flex justify-between absolute right-0 bottom-0 z-40">
              <div className="flex flex-col w-12 sm:w-16 md:w-[70px] xl:w-[90px] h-28 md:h-36 xl:h-[181px]">
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="bg-primary text-secondary-foreground flex justify-center items-center h-1/2"
                >
                  <RightArrow width="24" height="22" />
                </button>

                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="bg-secondary text-primary-foreground flex justify-center items-center h-1/2 rotate-180"
                >
                  <RightArrow width="24" height="22" />
                </button>
              </div>
            </div>
          </Swiper>
        </div>
      </div>

      {/* Banner Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {bannerData.bottomImages.map(({ id, url, title }) => (
          <div
            key={id}
            className="relative overflow-hidden rounded-md shadow-lg"
          >
            <Image
              src={url}
              loading="lazy"
              placeholder="blur"
              blurDataURL={defaultBlurDataURL}
              alt={title || "Bottom Image"}
              width={780}
              height={408}
              className="w-full h-full object-cover"
            />
            <h4 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold absolute bottom-4 left-4">
              {title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerTwo;

