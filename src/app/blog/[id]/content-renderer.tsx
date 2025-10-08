interface ContentItem {
    type: 'paragraph' | 'header' | 'quote'; // Bisa ditambah lagi include dari cms
    text: string;
}

interface ContentRendererProps {
    content: ContentItem[];
}

// Function to define cms input as to fe
export default function ContentRenderer({ content }: ContentRendererProps) {
    return (
        <div className='space-y-10'>
            {content.map((item, index) => {
                switch (item.type) {
                    case 'paragraph':
                    default:
                        return (
                            <p
                                key={index}
                                className='text-white text-base'
                            >
                                {item.text}
                            </p> 
                        );
                    case 'quote':
                        return (
                            <blockquote
                                key={index}
                                className='relative italic text-white font-normal pl-4'
                            >
                                <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#7E67C1] to-[#FFB051]'/>
                                {item.text}
                            </blockquote>
                        );
                    case 'header':
                        return (
                            <h2
                                key={index}
                                className='text-2xl font-bold text-white mt-8 mb-4'
                            >
                                {item.text}
                            </h2>
                        );
                }
            })}
        </div>
    );
}