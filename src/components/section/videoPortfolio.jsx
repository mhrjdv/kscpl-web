"use client";
import Image from "next/image";
import Link from "next/link";
import RightArrow from "@/assets/icons/rightArrow";
import video_thumb from "@/assets/images/video-image.jpg"; // Re-import video_thumb
import SectionTitle from "../ui/sectionTitle";
import { cn } from "@/lib/utils";
import VideoPlay from "../ui/videoPlay";
import ButtonOutline from "../ui/buttons/buttonOutline";
import { useEffect, useState } from "react";

const VideoPortfolio = ({
  text_muted,
  bg_muted,
  after_bg_muted,
}) => {
  const [brochureUrl, setBrochureUrl] = useState("");
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetch(
      "https://kscplcms.cubeone.in/api/homepage-banner?populate[Video][populate]=*&populate[corporateBrochure][populate]=downloadBrochure"
    )
      .then((response) => response.json())
      .then((data) => {
        setBrochureUrl(
          data?.data?.corporateBrochure?.downloadBrochure?.url
        );
        setVideoData(data?.data?.Video);
      })
      .catch((error) =>
        console.error("Error fetching data:", error)
      );
  }, []);

  // Get the full URL of the video thumbnail
  const thumbnailUrl = videoData?.videoThumbnailImage?.formats?.small?.url || videoData?.videoThumbnailImage?.url;

  return (
    <section className="pt-20">
      <div className="container-fluid ">
        <SectionTitle
          sectionName={videoData?.backgroundTitle || "Video"}
          sectionTitle={videoData?.mainTitle || "Visual Design Odyssey"}
          sectionDesc={
            (videoData?.mainDescription ||
              "Where Imagination Takes Flight, and Excellence Blossoms"
            ).trim()
          }
          bg_muted={bg_muted}
          text_muted={text_muted}
        />
      </div>
      <div className="container-fluid lg:pt-30 2sm:pt-20 pt-14">
        <div
          className={cn(
            ` relative after:contents-[""] after:absolute after:left-0 after:top-0 after:max-w-[1320px] after:w-full z-[1] after:h-full after:bg-primary ${after_bg_muted} py-[90px]`
          )}
        >
          <div className="container flex lg:flex-row flex-col justify-between items-center relative z-10">
            <div className="2xl:max-w-[637px] lg:max-w-[500px] w-full">
              <h4 className="text-secondary-foreground text-3xl 2sm:text-4xl font-bold leading-135">
                {videoData?.cardTitle || "Step into the dynamic world of Visual Design Odyssey"}
              </h4>
              <p className="text-secondary-foreground mt-5">
                {videoData?.cardDescription || "Watch our designs come to life through captivating videos that showcase our creativity, innovation, and the transformation of spaces from concept to reality."}
              </p>
              <ul className="mt-[35px]">
                <li className="text-secondary-foreground flex items-center gap-[27px]">
                  <RightArrow width={"35"} height={"22"} />{" "}
                  <span className="text-secondary-foreground text-2xl leading-160 font-bold">
                    {videoData?.point02 || "Initial Vision"}
                  </span>{" "}
                </li>
                <li className="text-secondary-foreground flex items-center gap-[27px] mt-4">
                  <RightArrow width={"35"} height={"22"} />{" "}
                  <span className="text-secondary-foreground text-2xl leading-160 font-bold">
                    {videoData?.point01 || "Collaborative Design"}
                  </span>{" "}
                </li>
                <li className="text-secondary-foreground flex items-center gap-[27px] mt-4">
                  <RightArrow width={"35"} height={"22"} />{" "}
                  <span className="text-secondary-foreground text-2xl leading-160 font-bold">
                    {videoData?.point03 || "Flawless Execution"}
                  </span>{" "}
                </li>
              </ul>
              {brochureUrl && (
                <Link
                  href={brochureUrl}
                  target="_blank"
                  className="mt-[70px] inline-block"
                >
                  <ButtonOutline
                    className={
                      "border-secondary text-secondary-foreground sm:px-10 px-3 after:hover:bg-secondary after:left-0 hover:text-primary-foreground"
                    }
                  >
                    Download Brochure
                    <span className="rotate-90 ml-2">
                      <RightArrow width={"35"} height={"22"} />
                    </span>
                  </ButtonOutline>
                </Link>
              )}
            </div>
            <div className="2xl:max-w-[637px] lg:max-w-[500px] w-full">
              <VideoPlay
                img={thumbnailUrl || video_thumb}
                videoId={videoData?.videoLink?.split('v=')[1] || "6JCaIEcSZ9U"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPortfolio;
