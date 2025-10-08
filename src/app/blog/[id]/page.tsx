import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User, CalendarDays, Clock, ArrowLeft, ThumbsUp, Share2 } from 'lucide-react';
import Link from 'next/link';
import { blogPosts, getBlogPostById } from './blog-post';
import ContentRenderer from './content-renderer';  

interface BlogDetailPageProps {
    params: {
        id: string;
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
    const blog = getBlogPostById(params.id);

    if (!blog) {
        notFound();
    }

    return (
        <div className='relative px-22 min-h-screen py-8'>
            {/* Back Button */}
            <div className='items-start'>
                <Link
                    href='/blog'
                    className='inline-flex items-center gap-2 text-white group'
                >
                    <ArrowLeft size={16} color='white' className='group-hover:-translate-x-1 duration-300'/>
                    Back
                </Link>
            </div>

            {/* Header */}
            <div className='flex flex-col items-center gap-2'>
                <div className='backdrop-blur-xl bg-gradient-to-r from-[#7E67C1]/40 to-[#FFB051]/40 rounded-lg border border-white/20 px-4 py-1'>
                    <p className='text-white text-sm'>{blog.category}</p>
                </div>
                <h1 className='text-4xl font-bold text-center max-w-[520px] text-white leading-tight text-shadow-4xl text-shadow-white '>
                    {blog.title}
                </h1>

                {/* Meta detail */}
                <div className='flex justify-between gap-12 text-white'>
                    <div className="flex gap-1 items-center">
                        <User size={16} color='white' />
                        <span className='text-sm font-extralight'>{blog.author}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <CalendarDays size={16} color='white' />
                        <span className='text-sm font-extralight'>{blog.date}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Clock size={16} color='white' />
                        <span className='text-sm font-extralight'>{blog.timeRead}</span>
                    </div>
                </div>
            </div>

            {/* Func */}
            <div className='flex flex-col mt-10'>
                <div className='flex gap-2 justify-end items-center'>
                    <div className='flex gap-1'>
                        <ThumbsUp size={16} color='white' />
                        <span className='text-white font-light text-sm'>0</span>
                    </div>
                    <Share2 size={16} color='white' />
                </div>
                <Image
                    src={blog.image || 'https://placehold.co/1450x400'}
                    alt={blog.title}
                    width={1450}
                    height={400}
                    className='mt-6 rounded-lg items-center'
                />
            </div>

            {/* Blog Content */}
            <div className='mt-10 text-justify prose prose-invert max-w-none'>
                <ContentRenderer content={blog.content}/>
            </div>
        </div>
    );
}