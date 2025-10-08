'use client';
import { useState, useMemo } from 'react';
import SearchBar from '@/components/search-bar';
import BlogCard from '@/components/blogs/blog-card';
import { getAllBlogPosts } from './[id]/blog-post';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

export default function Blog() {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const allPosts = getAllBlogPosts();
    const blogPostPerPage = 4;
    const pageSlots = 5;

    const totalPages = Math.max(1, Math.ceil(allPosts.length / blogPostPerPage));

    const visiblePosts = useMemo(() => {
        const start = (currentPage - 1) * blogPostPerPage;
        return allPosts.slice(start, start + blogPostPerPage);
    }, [allPosts, currentPage]);

    type PageItem = number | '...';
    const getPaginationItems = (current: number, total: number): PageItem[] => {
        if (total <= pageSlots) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        if (current <= 3) {
            return [1, 2, 3, '...', total];
        }

        if (current >= total - 2) {
            return [1, '...', total - 2, total - 1, total];
        }

        return [current - 1, current, current + 1, '...', total];
    };

    const pageItems = getPaginationItems(currentPage, totalPages);

    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const goFirst = () => setCurrentPage(1);
    const goPrev = () => setCurrentPage(p => Math.max(1, p-1));
    const goNext = () => setCurrentPage(p => Math.min(totalPages, p+1));
    const goLast = () => setCurrentPage(totalPages);

    return (
        <div className="relative px-22 py-12 min-h-screen grid place-items-center overflow-hidden">

            <div className='flex flex-col gap-8'>
                {/* Title */}
                <div className='flex flex-col items-center gap-2'>
                    <h1 
                        className='text-6xl font-semibold word-spacing-tight bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent p-2'
                    >
                        Blog
                    </h1>
                    <p className='text-lg text-white font-light max-w-[700px] text-center'>
                        Discover articles and resources designed to inspire, educate, and 
                        guide businesses in embracing digital transformation.
                    </p>
                    
                    {/* Search Bar */}
                    <SearchBar 
                        placeholder='Search for articles'
                        value={searchValue}
                        onChange={setSearchValue}
                        filter={true}
                        onFilter={() => setSearchValue('')}
                        className='min-w-[620px] mt-8'
                    />
                </div>

                {/* Blog Post */}
                <div className='flex flex-col gap-2 items-start'>
                    {visiblePosts.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            snippet={blog.snippet}
                            category={blog.category}
                            author={blog.author}
                            date={blog.date}
                            timeRead={blog.timeRead}
                            image={blog.image}
                        />
                    ))}
                    {visiblePosts.length === 0 && (
                        <p className='text-white/40'>No result.</p>
                    )}
                </div>   
                
                {/* Pagination */}
                <div className='flex items-center justify-center gap-2 mt-10'>
                    <button
                        type='button'
                        onClick={goFirst}
                        disabled={!canPrev}
                        className='p-3 rounded-md border border-white text-white disabled:opacity-40'
                        aria-label='First page'
                        title='First page'
                    >
                        <ChevronsLeft size={16} color='white' />
                    </button>
                    <button
                        type='button'
                        onClick={goPrev}
                        disabled={!canPrev}
                        className='p-3 rounded-md border border-white text-white disabled:opacity-40'
                        aria-label='Previous page'
                        title='Previous page'
                    >
                        <ChevronLeft size={16} color='white' />
                    </button>
                    {pageItems.map((item, idx) => {
                        if (item === '...') {
                            return (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className='px-4 py-2 rounded-md border border-white p-3 text-white select-none'
                                >
                                    ...
                                </span>
                            )
                        } else {
                            const active = item === currentPage;
                            return (
                                <button
                                    key={item}
                                    type='button'
                                    onClick={() => setCurrentPage((item))}
                                    disabled={active}
                                    className=
                                    {[`px-4 py-2 rounded-md border border-white text-white font-semibold disabled:opacity-40 ${active ? 'bg-gradient-to-r from-[#7E67C1] to-[#FFB051] border-none' : ''}`]
                                    .join(' ')}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    {item}  
                                </button>
                            );
                        }
                    })}
                    <button
                        type='button'
                        onClick={goNext}
                        disabled={!canNext}
                        className='p-3 rounded-md border border-white text-white disabled:opacity-40'
                        aria-label='Next page'
                        title='Next page'
                    >
                        <ChevronRight size={16} color='white' />
                    </button>
                    <button
                        type='button'
                        onClick={goLast}
                        disabled={!canNext}
                        className='p-3 rounded-md border border-white text-white disabled:opacity-40'
                        aria-label='Last page'
                        title='Last page'
                    >
                        <ChevronsRight size={16} color='white' />
                    </button>
                </div> 
            </div>
        </div>
    );
}