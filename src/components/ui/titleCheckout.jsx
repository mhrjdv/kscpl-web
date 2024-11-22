"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion';
import { cn } from '@/lib/utils'

const TitleCheckout = ({ children, size, className }) => {

    // 9.5xl = 130px
    // 10xl = 330px
    // 4xl = 36px
    // 5xl = 48px
    // 8.5xl = 90px
    // 7.5xl = 76px

    const [scroll, setScroll] = useState(false)
    const [scrollHeight, setScrollHeight] = useState(0)
    const containerRef = useRef()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end 0.0"]
    });

    let scrollValue
    if (scroll) {
        scrollValue = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    }
    else {
        scrollValue = useTransform(scrollYProgress, [0, 0], ["0%", `${scrollHeight / 3}px`]);
    }
    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setScroll(true)
            }
            else {
                setScrollHeight(window.scrollY)
                setScroll(false)
            }
        })
    }, [])


    if (size === "10xl") {
        return (
            <motion.h1 ref={containerRef} style={{ translateX: scrollValue, transitionDuration:"1s" }} className={cn(`text-transparent webkit-text-stroke-width-1 webkit-text-stroke-secondary xl:text-[330px] lg:text-[200px] md:text-[170px] sm:text-[140px] text-[100px]  whitespace-nowrap font-extrabold leading-[1.30] overflow-hidden`, className)}>
                {children}
            </motion.h1>
        )
    }
    else if (size === "9.5xl") {
        return (
            <h2 className={cn(`font-extrabold text-muted-foreground [font-size:_clamp(3.25rem,2.125rem+5vw,8.125rem)] leading-[1.10]`, className)}>{children}</h2>
        )
    }
    else if (size === "8.5xl") {
        return (
            <h3 className={cn(`font-extrabold text-muted-foreground [font-size:_clamp(2.5rem,1.7788rem+3.2051vw,5.625rem)] leading-[1.10]`, className)}>{children}</h3>
        )
    }
    else if (size === "5xl") {
        return (
            <h3 className={cn(`font-extrabold text-muted-foreground [font-size:_clamp(1.875rem,1.6154rem+1.1538vw,3rem)] lg:leading-[1.10]`, className)}>{children}</h3>
        )
    }
    else if (size === "7.5xl") {
        return (
            <h5 className={cn(`font-extrabold text-muted-foreground xl:text-[76px] lg:text-6xl text-5xl xl:leading-[100%]`, className)}>{children}</h5>
        )
    }
    else if (size === "4xl") {
        return (
            <h6 className={cn(`font-bold text-muted-foreground [font-size:_clamp(1.25rem,1.0192rem+1.0256vw,2.25rem)] leading-[1.35]`, className)}>{children}</h6>
        )
    }

}

export default TitleCheckout