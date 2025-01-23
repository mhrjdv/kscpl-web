"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, FreeMode } from "swiper/modules"
import 'swiper/css';

import RightArrow from '@/assets/icons/rightArrow';
import ButtonFill from '@/components/ui/buttons/buttonFill';
import { staticBluarDataUrl } from '@/lib/staticBluarDataUrl';

const ProjectSingleSliderTwo = ({ images = [] }) => {
    const swiperRef = useRef()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='container'>
            <div className='relative pt-10'>
                <Swiper
                    slidesPerView={1}
                    loop
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : null}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className=''
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image 
                                src={img.url} 
                                width={img.width || 800}
                                height={img.height || 533}
                                alt={`Project image ${index + 1}`}
                                className='w-full h-full max-w-[800px] max-h-[500px] object-cover mx-auto' 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='absolute top-1/2 -translate-y-1/2 z-10 w-full flex justify-between items-center gap-5'>
                    <div onClick={() => swiperRef.current?.slidePrev()}>
                        <ButtonFill className='rotate-180 2sm:h-[90px] h-10 2sm:w-[90px] w-10 2sm:px-6 px-1.5 after:bg-secondary border-secondary hover:border-primary text-primary-foreground hover:text-secondary-foreground hover:bg-primary'><RightArrow width={"35"} height={"22"} /></ButtonFill>
                    </div>
                    <div onClick={() => swiperRef.current?.slideNext()}>
                        <ButtonFill className='2sm:h-[90px] h-10 2sm:w-[90px] w-10 2sm:px-6 px-1.5 border-secondary hover:border-primary after:bg-secondary text-primary-foreground hover:text-secondary-foreground hover:bg-primary'><RightArrow width={"35"} height={"22"} /></ButtonFill>
                    </div>
                </div>
            </div>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={27}
                speed={500}
                breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    750: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1320: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-[35px]"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image 
                            src={img.url}
                            width={img.width || 400}
                            height={img.height || 300}
                            alt={`Thumbnail ${index + 1}`}
                            className='w-full lg:min-h-[250px] min-h-[100px] max-h-[100px] h-full object-cover'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProjectSingleSliderTwo