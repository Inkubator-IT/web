import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: any) => void;
    filter?: boolean;
    onFilter?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function SearchBar({
    placeholder = '',
    value = '',
    onChange,
    onSearch,
    filter: Filter,
    onFilter,
    className,
    disabled = false,
}: SearchBarProps) {
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(value);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={cn('relative', className)}>
            {/* Gradient Shadow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7E67C1] via-[#FFB051]/20 to-[#FFB051] animate-pulse rounded-full blur-sm" />
            
            {/* Search Bar */}
            <div className="relative flex items-center justify-between bg-black rounded-full px-4 z-10">
                <Search size={14} color='white' className='flex-shrink-0 cursor-pointer'/>
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={handleEnter}
                    disabled={disabled}
                    autoFocus={false}
                    className={cn(
                        'w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full outline-none placeholder:font-light',
                        'border-none focus:ring-0 placeholder:text-white/40 text-white text-sm bg-transparent'
                    )}
                />

                {Filter && (
                <button
                    type='button'
                    onClick={onFilter}
                    disabled={disabled}
                    className={cn(
                        'flex-shrink-0 text-white cursor-pointer'
                    )}
                >
                    <SlidersHorizontal size={14} color='white'/>
                </button>
                )}
            </div>
        </div>
    );
}