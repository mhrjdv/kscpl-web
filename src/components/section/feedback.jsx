"use client";
import React from 'react'
import feedback_bg from "@/assets/images/feedback-image.jpg"
import RightArrow from '@/assets/icons/rightArrow'
import ButtonFill from '../ui/buttons/buttonFill'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Feedback = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/contact#inquiry');
  };

  return (
    <section className='container py-20'>
      <div className='bg-cover bg-no-repeat py-10 lg:pl-[117px] pl-10 lg:pr-[133px] 2sm:pr-24 pr-10 flex md:flex-row flex-col justify-between md:items-center items-start' style={{ backgroundImage: `url(${feedback_bg.src})` }}>
        <h1 className='[font-size:_clamp(20px,3vw,45px)] font-extrabold leading-110 text-secondary-foreground max-w-[900px] my-10'>Discover how we deliver excellence with every project!</h1>
        <Link href="/contact#inquiry" onClick={handleClick}>
          <ButtonFill className={"after:left-0 after:bg-secondary text-primary-foreground border-secondary hover:text-secondary-foreground mt-6 ml-2 md:mt-0"}> Let’s Connect <RightArrow width={"35"} height={"22"} /> </ButtonFill>
        </Link>
      </div>
    </section>
  )
}

export default Feedback