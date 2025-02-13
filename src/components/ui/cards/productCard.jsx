"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import RightArrow from "@/assets/icons/rightArrow";
import { useRouter } from "next/navigation";

const ProductCard = ({
  product_img,
  product_name,
  text_muted,
  width,
  height,
  id,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/construction/${product_name.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    router.push(`/construction/${product_name.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div>
      <div className="relative group">
        <div className="absolute z-10 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={handleButtonClick}
            className={cn(
              `px-[25px] py-2.5 flex items-center gap-2.5 border-white hover:border-primary text-white border-2 whitespace-nowrap relative z-10 overflow-hidden after:absolute after:left-0 after:top-0 after:bottom-0 after:z-[-1] after:bg-primary after:w-0 after:transition-all after:duration-500 hover:after:w-full text-secondary-foreground hover:text-secondary-foreground transition-all duration-500`
            )}
          >
            {product_name}

            <span className="-rotate-45 ml-2">
              <RightArrow
                height="22"
                width="20"
              />
            </span>
          </button>
        </div>
        <div className="relative after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:h-full group-hover:after:opacity-100 after:h-0 after:w-0 after:opacity-0 after:flex after:justify-center after:items-center after:bg-[rgba(37,_59,_47,_0.38)] group-hover:after:blur-sm">
          <Image
            src={product_img}
            loading="lazy"
            alt={product_name}
            className="w-full h-full max-h-[506px]"
            width={width}
            height={height}
          />
        </div>
      </div>
      <div className="mt-[21px] flex justify-center">
        <Link
          href={`/construction/${product_name.toLowerCase().replace(/ /g, '-')}`}
          onClick={handleLinkClick}
          className={cn(
            `text-2xl font-semibold text-primary-foreground leading-160 hover-underline ${text_muted} flex items-center group`
          )}
        >
          <span>{product_name}</span>
         
        </Link>
        {/* <span className="-rotate-45 text-primary-foreground mt-2 ml-2 opacity-100 group-hover:opacity-100 transition-opacity duration-500 group-hover:no-underline">
            <RightArrow
              height="22"
              width="20"
            />
          </span> */}
      </div>
    </div>
  );
};

export default ProductCard;
