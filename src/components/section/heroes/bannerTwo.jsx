"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";
import Link from "next/link";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";

const BannerTwo = ({ bannerData }) => {
  const swiperRef = useRef();

  if (!bannerData || !bannerData.heroSlideImages || !bannerData.bottomImages) {
    return <p>Error loading banner data. Please try again later.</p>;
  }

  const pagination = {
    clickable: true,
    el: ".hero-pagination",
    renderBullet: (index, className) => {
      const title = bannerData.heroSlideImages[index]?.title || "Slide";
      return `<span class='${className} text-white translate-y-16 opacity-0 absolute h-0 leading-[90%] [font-size:_clamp(40px,8vw,100px)] font-extrabold lg:text-right'>${title}</span>`;
    },
  };

  return (
    <section className="banner-two">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div
          className="bg-primary pt-8 pb-10 bg-cover bg-no-repeat bg-right hidden md:block relative"
          style={{ backgroundImage: `url(/path-to-vector-image.png)` }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-start pl-4 md:pl-6 lg:pl-10 text-left">
            <div className="hero-pagination"></div>
            <div className="flex flex-col md:flex-row md:items-start justify-start gap-3 md:gap-5 mt-5 md:mt-10">
              <Link href="/about-us">
                <ButtonOutline>
                  <span className="text-sm md:text-base">Construction</span>
                </ButtonOutline>
              </Link>
              <Link href="/project-archive">
                <ButtonFill>
                  <span className="text-sm md:text-base">Realty</span>
                </ButtonFill>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
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
            className="h-full"
          >
            {bannerData.heroSlideImages.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.url}
                    alt={slide.name || "Slide Image"}
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bannerData.bottomImages.map((image) => (
          <div key={image.id} className="relative overflow-hidden">
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
              <img
                src={image.url}
                alt={image.name || "Bottom Image"}
                className="object-cover w-full h-full"
              />
            </div>
            <h4 className="absolute text-background font-extrabold left-5 bottom-5 text-xl md:text-2xl lg:text-3xl">
              {image.title || "Default Title"}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerTwo;
