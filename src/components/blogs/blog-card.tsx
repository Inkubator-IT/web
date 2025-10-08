import Image from 'next/image';
import Link from 'next/link';
import { User, CalendarDays, Clock } from 'lucide-react';

interface BlogCardProps {
    id: string;
    title: string;
    snippet: string;
    category: string;
    author: string;
    date: string;
    timeRead: string;
    image?: string;
}

export default function BlogCard({
    id,
    title,
    snippet,
    category,
    author,
    date,
    timeRead,
    image
}: BlogCardProps) {
    return (
        <>
         <div className='flex flex-col gap-4 items-start'>
                {/* Category */}
                <div className='backdrop-blur-xl bg-gradient-to-r from-[#7E67C1]/40 to-[#FFB051]/40 rounded-lg border border-white/20 px-4 py-1'>
                    <p className='text-white text-sm'>{category}</p>
                </div>
                <Link href={`/blog/${id}`} className='block-w-full hover:-translate-x-1.5 duration-300'>
                    <div className='flex gap-14'>
                        <div className='flex flex-col gap-2'>
                            {/* Title */}
                            <h3 className='text-white font-semibold text-3xl'>
                                {title}
                            </h3>
                            {/* Snippet */}
                            <p className='text-white text-xl font-extralight text-justify'>{snippet}</p>

                            {/* Meta detail */}
                            <div className='flex gap-6 items-center'>
                                <div className='flex gap-1 items-center'>
                                    <User
                                        size={14}
                                        color='white'
                                    />
                                    <p className='text-white text-sm font-extralight'>{author}</p>
                                </div>

                                <div className='flex gap-1 items-center'>
                                    <CalendarDays
                                        size={14}
                                        color='white'
                                    />
                                    <p className='text-white text-sm font-extralight'>{date}</p>
                                </div>

                                <div className='flex gap-1 items-center'>
                                    <Clock
                                        size={14}
                                        color='white'
                                    />
                                    <p className='text-white text-sm font-extralight'>{timeRead}</p>
                                </div>

                            </div>

                        </div>

                        {/* Image Blog*/}
                        <Image 
                            src={image || 'https://placehold.co/400x200'} 
                            alt={title} 
                            width={400} 
                            height={200} 
                            className='rounded-lg'
                        />
                    </div>
                </Link>
            </div>
        </>
        
        
    );
}

