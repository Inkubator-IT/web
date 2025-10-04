'use client';
import { useState } from 'react';
import SearchBar from '@/components/search-bar';

export default function Blog() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="relative bg-black min-h-screen grid place-items-center overflow-hidden">
            {/* Background gradient + subtle stripes */}
            {/* <div className="absolute inset-0 -z-20 bg-gradient-to-br via-[#0b0a0f] from-[#3f2b72] to-[#f5a524]" />
            <div
                className="absolute inset-0 -z-10 opacity-30"
                style={{
                backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 14px)",
                }}
            /> */}

            <div className='flex flex-col items-center'>
                {/* Title */}
                <div className='flex flex-col items-center gap-2'>
                    <h1 
                        className='text-4xl font-semibold bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent p-2'
                    >
                        Blog
                    </h1>
                    <p className='text-sm text-white'>
                        Discover articles and resources designed to inspire, educate, and 
                        guide businesses in embracing digital transformation.
                    </p>
                </div>

                <SearchBar 
                    placeholder='Search for articles'
                    value={searchValue}
                    onChange={setSearchValue}
                    filter={true}
                    onFilter={() => setSearchValue('')}
                    className='w-full'
                />
                
                
            </div>
        </div>
    );
}