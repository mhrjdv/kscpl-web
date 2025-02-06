"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import about_img from "@/assets/images/about-image.jpg";
import SectionTitle from "../../ui/sectionTitle";
import { cardSlideAnimation, cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import SectionSidebarImg from "@/components/ui/sectionSidebarImg";

const aboutList = [
    {
        id: "01",
        item: "Innovation Beyond Boundaries",
        item_desc: "We thrive on challenging the norms, infusing each project with fresh, innovative perspectives that defy convention."
    },
    {
        id: "02",
        item: "Visionaries at Work",
        item_desc: "We thrive on challenging the norms, infusing each project with fresh, innovative perspectives that defy convention."
    },
    {
        id: "03",
        item: "Awards and Acclaim",
        item_desc: "We thrive on challenging the norms, infusing each project with fresh, innovative perspectives that defy convention."
    },
];

const AboutOne = ({ text_muted, bg_muted, aboutUsTitle = "", aboutUsSubTitle = "" }) => {
    const { ref, inView } = useInView({
        threshold: 0.0,
        triggerOnce: true,
    });

    return (
        <section className="pt-6">
            <div className="container-fluid">
                <SectionTitle
                    sectionName={"About Us"}
                    sectionTitle={aboutUsTitle || "Default About Us Title"}
                    sectionDesc={aboutUsSubTitle || "Default About Us Subtitle"}
                    text_muted={text_muted}
                    bg_muted={bg_muted}
                    sectionNameClassName="text-xl"
                />
                <div
                    className={cn(
                        `bg-primary xl:mt-[100px] lg:mt-4 md:mt-10 mt-[200px] xl:mb-6 mb-0 ${bg_muted}`
                    )}
                >
                    <div className="container">
                        <div className="flex lg:flex-row flex-col items-center gap-[40px]">
                            <SectionSidebarImg
                                img={about_img}
                                section_name={"about-bg"}
                                className="md:-mt-8 -mt-[180px] -mb-8"
                            />
                            <ul className="lg:mt-0 mt-16 lg:pb-0 pb-6">
                                {aboutList.map(({ id, item, item_desc }) => (
                                    <li
                                        key={id}
                                        className="lg:flex gap-3 pb-3 last:pb-0 justify-between"
                                    >
                                        <svg
                                            ref={ref}
                                            strokeWidth="1"
                                            className={`h-[40px] w-12 relative -top-2 left-3 xl:text-4xl text-3xl mb-2 lg:mb-0 inline-block font-extrabold leading-120  ${
                                                inView
                                                    ? "animate-text-line-animation stroke-secondary stroke-dasharray-1000 stroke-dashoffset-1000"
                                                    : " fill-transparent stroke-secondary "
                                            }`}
                                        >
                                            <text x="0%" dominantBaseline="middle" y="70%">
                                                {id}
                                            </text>
                                        </svg>
                                        <div className="max-w-[534px]">
                                            <h4 className="text-xl 2sm:text-2xl font-bold leading-135 text-secondary-foreground">
                                                {item}
                                            </h4>
                                            <p className="text-sm text-secondary-foreground font-normal">
                                                {item_desc}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutOne;
