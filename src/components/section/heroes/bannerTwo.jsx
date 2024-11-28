"use client";
import Image from 'next/image';
import Link from 'next/link';
// import hero_2 from "@/assets/images/hero-2.jpg";
import hero_2 from "@/assets/images/HorizonEstate.jpg";
//import hero_3 from "@/assets/images/hero-3.jpg";
import hero_3 from "@/assets/images/Nestor.jpg";
import hero_vector from "@/assets/images/hero-vector-bg.png";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';

import hero_5 from "@/assets/images/hero-5.jpg";
import hero_6 from "@/assets/images/hero-6.jpg";
import hero_7 from "@/assets/images/hero-7.jpg";
// import hero_8 from "@/assets/images/hero-8.jpg";
import hero_8 from "@/assets/images/Nestor-02.jpg";
import ButtonFill from '@/components/ui/buttons/buttonFill';
import ButtonOutline from '@/components/ui/buttons/buttonOutline';
import { useRef } from 'react';
import RightArrow from '@/assets/icons/rightArrow';
import { staticBluarDataUrl } from '@/lib/staticBluarDataUrl';

const bannerData = [
  {
    id: 1,
    title: "Vision.<br>Build.<br>Reality.",
    heading:
      "<span class='text-primary-foreground'>Elegance</span> <span class='outline-text'>Redefined</span>",
    banner_img: hero_8,
  },
  {
    id: 2,
    title: "Quality.<br>Trust.<br>Excellence.",
    heading:
      "<span class='text-primary-foreground'>Elegance</span> <span class='outline-text'>Redefined</span>",
    banner_img: hero_2,
  },
  {
    id: 3,
    title: "Dream.<br>Build.<br>Live.",
    heading:
      "<span class='text-primary-foreground'>Elegance</span> <span class='outline-text'>Redefined</span>",
    banner_img: hero_3,
  },
];

const bannerBottomContent = [
  {
    id: 1,
    banner_img: hero_5,
    title: "Construction Mastery",
  },
  {
    id: 2,
    banner_img: hero_6,
    title: "Realty Solutions",
  },
  {
    id: 3,
    banner_img: hero_7,
    title: "Building Excellence",
  },
];

const BannerTwo = () => {
  const swiperRef = useRef();
  const pagination = {
    clickable: true,
    el: ".hero-pagination",
    renderBullet: function (index, className) {
        return `<span class='${className} text-white translate-y-16 opacity-0 absolute h-0 leading-[90%] [font-size:_clamp(40px,8vw,100px)] font-extrabold lg:text-right'>${bannerData[index].title}</span>`;
    },
  };
  return (
    <section className="banner-two">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Banner Left Side */}
        <div
          className="bg-primary pt-8 pb-10 bg-cover bg-no-repeat bg-right hidden md:block relative"
          style={{ backgroundImage: `url(${hero_vector.src})` }}
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
        <div className="relative">
          {/* Mobile Text Overlay */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-white text-center font-extrabold leading-tight text-4xl sm:text-5xl z-10 px-4 mobile-banner-text"
              dangerouslySetInnerHTML={{ __html: bannerData[0].title }}
            ></div>
                       <div className="flex flex-col items-center justify-center gap-3 mt-5">
              {/* <Link href="/about-us" className="inline-block">
                <ButtonOutline className="px-4 md:px-6 lg:px-8 py-2 border-secondary text-secondary-foreground after:bg-secondary hover:text-primary">
                  <span className="text-sm md:text-base">Construction</span>
                </ButtonOutline>
              </Link> */}
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
            autoplay={{
              delay: 4000,
            }}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="h-full"
            onSlideChange={(swiper) => {
              const currentIndex = swiper.realIndex;
              const paginationText = document.querySelector(".mobile-banner-text");
              if (paginationText) {
                paginationText.innerHTML = bannerData[currentIndex].title;
              }
            }}
          >
            {bannerData.map(({ id, banner_img, heading }) => (
              <SwiperSlide key={id} className="relative">
                <Image
                  src={banner_img}
                  loading="lazy"
                  placeholder="blur"
                  width="auto"
                  height="auto"
                  alt="bg image"
                  className="h-full w-full object-cover"
                />
                {/* Gradient Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
              </SwiperSlide>
            ))}
            <div className="flex justify-between absolute right-0 bottom-0 z-40">
              {/* Next and Prev Arrows */}
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
        {/* Desktop Text Overlay */}
        <div className="hidden md:flex absolute inset-0 items-center justify-start pl-4 md:pl-6 lg:pl-10">
          <div
            className="text-white text-left font-extrabold leading-tight z-10"
            style={{ fontSize: "clamp(60px, 8vw, 120px)", lineHeight: "1.1" }}
            dangerouslySetInnerHTML={{ __html: bannerData[0].title }}
          ></div>
        </div>
      </div>
      {/* Banner Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bannerBottomContent.map(({ id, banner_img, title }) => (
          <div
            key={id}
            className='relative overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-overlay'
          >
            <Image
              src={banner_img}
              loading="lazy"
              placeholder="blur"
              blurDataURL={staticBluarDataUrl}
              alt="banner-bottom-bg"
              width={780}
              height={408}
              className="w-full h-full object-cover"
            />
            <h4 className="text-background text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] leading-none font-extrabold absolute left-3 sm:left-5 md:left-7 lg:left-9 xl:left-12.5 top-1/2 -translate-y-1/2 z-10">
              {title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerTwo;