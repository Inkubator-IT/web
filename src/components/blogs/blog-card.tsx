import { CalendarDays, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  snippet: string;
  category: string;
  author: string;
  date: string;
  timeRead: string;
  image: string;
}

export default function BlogCard({
  id,
  title,
  snippet,
  category,
  author,
  date,
  timeRead,
  image,
}: BlogCardProps) {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-4">
        {/* Category */}
        <div className="rounded-lg border border-white/20 bg-linear-to-r from-[#7E67C1]/40 to-[#FFB051]/40 px-4 py-1 backdrop-blur-xl">
          <p className="text-sm text-white">{category}</p>
        </div>

        <Link
          href={`/blog/${id}`}
          className="block w-full duration-300 hover:-translate-x-1.5"
        >
          {/* Desktop Layout */}
          <div className="hidden w-full gap-14 xl:flex">
            <div className="flex flex-1 flex-col gap-2">
              {/* Title */}
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              {/* Snippet */}
              <p className="text-justify text-xl font-extralight text-white">
                {snippet}
              </p>

              {/* Meta detail */}
              <div className="flex flex-1 items-end gap-6">
                <div className="flex items-center gap-1">
                  <User size={14} color="white" />
                  <p className="text-sm font-extralight text-white">{author}</p>
                </div>

                <div className="flex items-center gap-1">
                  <CalendarDays size={14} color="white" />
                  <p className="text-sm font-extralight text-white">{date}</p>
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={14} color="white" />
                  <p className="text-sm font-extralight text-white">
                    {timeRead} min
                  </p>
                </div>
              </div>
            </div>

            {/* Image Blog - Desktop */}
            <div className="relative h-[200px] w-[360px] overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="360px"
                priority={false}
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-4 xl:hidden">
            {/* Image Blog */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={false}
              />
            </div>

            <div className="flex flex-col gap-2">
              {/* Title */}
              <h3 className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
                {title}
              </h3>
              {/* Snippet */}
              <p className="text-justify text-base font-extralight text-white sm:text-lg lg:text-xl">
                {snippet}
              </p>

              {/* Meta detail */}
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
                <div className="flex items-center gap-1">
                  <User size={14} color="white" />
                  <p className="text-sm font-extralight text-white">{author}</p>
                </div>

                <div className="flex items-center gap-1">
                  <CalendarDays size={14} color="white" />
                  <p className="text-sm font-extralight text-white">{date}</p>
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={14} color="white" />
                  <p className="text-sm font-extralight text-white">
                    {timeRead} min
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
