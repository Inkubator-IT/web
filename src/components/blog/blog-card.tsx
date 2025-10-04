

interface BlogCardProps {
    title: string;
    snippet: string;
    category: string;
    author: string;
    date: string;
    timeRead: string;
    image?: string;
}

export default function BlogCard({
    title,
    snippet,
    category,
    author,
    date,
    timeRead,
    image
}: BlogCardProps) {
    return (
        <div className='flex flex-col gap-2 items-start'>
            {/* Category */}
            <div></div>
        </div>
    );
}

