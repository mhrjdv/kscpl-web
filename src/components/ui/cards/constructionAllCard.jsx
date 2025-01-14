"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import RightArrow from "@/assets/icons/rightArrow";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const ConstructionAllCard = ({
  img,
  name,
  position,
  slug,
  category,
  text_muted,
  cardVariants,
  prantCalss,
}) => {
  return (
    <motion.div
      className={cn(`mb-16 ${prantCalss}`)}
      initial="offscreen"
      whileInView="onscreen"
      variants={cardVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative group hover-underline">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {/* Hover effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:opacity-100 h-0 w-0 opacity-0 flex justify-center items-center bg-[#D2E0D9CC]">
            <Link
              href={`/construction/${category}/${slug}`}
              className="flex items-center justify-between px-[27px] pt-[9px] pb-[18px]"
            >
              <span
                className={cn(
                  `text-2xl font-bold leading-160 text-primary-foreground cursor-pointer ${text_muted}`
                )}
              >
                View
              </span>
            </Link>
          </div>

          {/* Main Image */}
          <Image
            src={img || staticBluarDataUrl}
            loading="lazy"
            placeholder="blur"
            blurDataURL={staticBluarDataUrl}
            width={400}
            height={300}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Bottom bar with title and position */}
        <div className="bg-secondary absolute left-0 bottom-[-10%] min-w-[295px] transition-all duration-500 group-hover:min-w-full">
          <div>
            <span className="w-full h-[1px] bg-[#253B2F4D] block absolute top-2"></span>
            <span className="w-full h-[1px] bg-[#253B2F4D] block absolute bottom-2"></span>
            <span className="w-[1px] h-full bg-[#253B2F4D] block absolute left-2"></span>
            <span className="w-[1px] h-full bg-[#253B2F4D] block absolute right-2"></span>
          </div>
          <Link
            href={`/construction/${category}/${slug}`}
            className="flex items-center justify-between px-[27px] pt-[9px] pb-[18px]"
          >
            <label>
              <span
                className={cn(
                  `text-2xl font-bold leading-160 text-primary-foreground cursor-pointer ${text_muted}`
                )}
              >
                {name}
              </span>
              <small
                className={cn(
                  `text-primary-foreground text-lg block ${text_muted}`
                )}
              >
                {position}
              </small>
            </label>
            <small className="text-primary-foreground mt-2.5 flex items-center gap-3 transition-all duration-500 opacity-0 group-hover:opacity-100">
              <RightArrow width={"35"} height={"21"} />
            </small>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ConstructionAllCard;
