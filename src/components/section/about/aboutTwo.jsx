import React from "react";
import Image from "next/image";
import SectionTitle from "../../ui/sectionTitle";
import about_bg from "@/assets/images/about-image-2.jpg";
import SectionSidebarImg from "@/components/ui/sectionSidebarImg";

const AboutTwo = () => {
  return (
    <section>
      <div className="container-fluid">
        <SectionTitle
          sectionName={"About Us"}
          sectionTitle={"About Us"}
          sectionDesc={
            "Unveiling the Passion, Vision, and Expertise Behind Our Work"
          }
        />
        <div
          className={`bg-primary xl:mt-[220px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 mb-0`}
        >
          <div className="container">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-[66px]">
              <div className="md:-mt-25 -mt-[470px] -mb-25">
                <SectionSidebarImg
                  img={about_bg}
                  section_name={"about-bg"}
                />
              </div>
              <div className="max-w-[533px] lg:pt-0 pt-20 lg:pb-0 pb-10">
                <h2 className="text-secondary-foreground text-3xl 2sm:text-4xl font-bold leading-120 mb-14 max-w-[600px]">
                  An Award Winning Team
                </h2>
                <p className=" text-secondary-foreground">
                  Inspiring arches, breathtaking
                  skyscrapers, precision
                  engineered bridges, a fabulous
                  sports complex – changing the
                  country’s skyline by creating
                  success storey – that’s Kalpana
                  Struct-Con Pvt. Ltd. for you! We
                  are a full-fledged construction
                  company with many large projects
                  in Maharashtra, Gujarat,
                  Rajasthan and other places to
                  our credit.
                </p>
                <p className="text-secondary-foreground mt-7">
                  Founded in Mumbai in 1981,
                  initially formed as a
                  partnership firm with the name
                  and style as “KALPANA BUILDERS”
                  was converted in to a Private
                  Limited firm in the said name &
                  style in the year 1989. Kalpana
                  Struct-Con Pvt. Ltd. is a
                  premier construction company in
                  Navi Mumbai with high profile
                  legacy of engineering marvels
                  that scarf the western skies
                  throughout the length and breath
                  of Maharashtra, Rajasthan and
                  Gujrat.{" "}
                </p>
                {/* <p className="text-secondary-foreground mt-7">
                  We pride ourselves on our
                  resources – a sound
                  infrastructure, the latest
                  equipment and a professional and
                  committed team. Quality is our
                  top priority and is monitored at
                  every stage. We have even set up
                  an on-site lab to ensure that
                  only the best materials possible
                  are used. Whether you are
                  looking for a small housing
                  project or a multi-crore
                  shopping mall we can build it
                  for you.{" "}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTwo;
