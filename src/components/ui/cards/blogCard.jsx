import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ id, thumb, date, tag, title, text_muted }) => {
  // Generate slug from the title
  const slug = title.toLowerCase().replace(/ /g, '-');

  return (
    <Link href={`/news-and-updates/${slug}`} className="hover-underline">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={thumb}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-8">
        <p className={cn(`text-primary-foreground flex items-center gap-2 mb-2.5`)}>
          <small className="text-lg">{date}</small> /{' '}
          <small className="text-lg">{tag}</small>
        </p>
        <span className={cn(`text-primary-foreground font-semibold text-2xl ${text_muted}`)}>
          {title}
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;