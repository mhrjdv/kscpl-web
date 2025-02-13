"use client";

import Image from "next/image";
import { useState, useEffect } from "react"; // ...new import...
import { motion } from "framer-motion";
import about_img from "@/assets/images/about-image.jpg";
import SectionTitle from "../../ui/sectionTitle";
import { cardSlideAnimation, cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import SectionSidebarImg from "@/components/ui/sectionSidebarImg";

// ...removed static aboutList...

const AboutOne = ({ text_muted, bg_muted, aboutUsTitle = "", aboutUsSubTitle = "" }) => {
	const { ref, inView } = useInView({
		threshold: 0.0,
		triggerOnce: true,
	});
  
  // Fetch API data and store in state
  const [apiData, setApiData] = useState(null);
  
  useEffect(() => {
    fetch("https://kscplcms.cubeone.in/api/homepage-banner?populate[card][populate]=*")
      .then(res => res.json())
      .then(result => setApiData(result.data))
      .catch(err => console.error(err));
  }, []);
  
  // Merge API data with fallback defaults
  const pageTitle = apiData?.aboutUsTitle || aboutUsTitle || "Default About Us Title";
  const pageSubTitle = apiData?.aboutUsSubTitle || aboutUsSubTitle || "Default About Us Subtitle";
  
  const dynamicAboutList = apiData?.card
		? [
				{ id: "01", item: apiData.card.Title01, item_desc: apiData.card.Description01 },
				{ id: "02", item: apiData.card.Title02, item_desc: apiData.card.Description02 },
				{ id: "03", item: apiData.card.Title03, item_desc: apiData.card.Description03 },
		  ]
		: [
				{
					id: "01",
					item: "refresh the page",
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
  
  // Use dynamic image from API if available, fallback to static import
  const imageSource = apiData?.card?.Image?.url || about_img;

	return (
		<section className="pt-20">
			<div className="container-fluid">
				<SectionTitle
					sectionName={"About Us"}
					sectionTitle={pageTitle}
					sectionDesc={pageSubTitle}
					text_muted={text_muted}
					bg_muted={bg_muted}
				/>
				<div
					className={cn(
						`bg-primary xl:mt-[220px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 mb-0 ${bg_muted}`
					)}
				>
					<div className="container">
						<div className="flex lg:flex-row flex-col items-center gap-[66px]">
							<SectionSidebarImg
								img={imageSource} // updated dynamic image source
								section_name={"about-bg"}
								className="md:-mt-25 -mt-[470px] -mb-25"
							/>
							<ul className="lg:mt-0 mt-20 lg:pb-0 pb-10">
								{dynamicAboutList.map(({ id, item, item_desc }) => (
									<li key={id} className="lg:flex items-start gap-6 pb-10 last:pb-0">
										<svg
											ref={ref}
											strokeWidth="1"
											className={`h-[65px] w-20 relative md:top-0 mr-4 xl:text-6xl text-5xl mb-0 inline-block font-extrabold leading-120 flex-shrink-0 z-10 ${
												inView
													? "animate-text-line-animation stroke-secondary stroke-dasharray-1000 stroke-dashoffset-1000"
													: "fill-transparent stroke-secondary"
											}`}
										>
											<text x="0%" dominantBaseline="middle" y="70%">
												{id}
											</text>
										</svg>
										<div className="max-w-[534px]">
											<h4 className="text-3xl 2sm:text-4xl font-bold leading-135 text-secondary-foreground">
												{item}
											</h4>
											<p className="text-lg text-secondary-foreground font-normal">
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