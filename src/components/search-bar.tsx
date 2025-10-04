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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7E67C1] to-[#FFB051] rounded-full blur-sm opacity-80" />
            
            {/* Search Bar */}
            <div className="relative flex items-center justify-between bg-black rounded-full px-4 z-10">
                <Search size={12} color='white' className='flex-shrink-0 cursor-pointer'/>
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={handleEnter}
                    disabled={disabled}
                    autoFocus={false}
                    className={cn(
                        'w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full outline-none',
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
                    <SlidersHorizontal size={12} color='white'/>
                </button>
                )}
            </div>
        </div>
    );
}