import React from 'react';

interface TipTapNode{
    type: string;
    attrs?: Record<string, any>;
    content?: TipTapNode[];
    text?: string;
    marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
    }>;
}

interface TipTapJSON {
    type: "doc";
    content: TipTapNode[];
}

export function renderTipTapContent(content: TipTapJSON) {
    if (!content || content.type !== "doc" || !Array.isArray(content.content)) {
        return <p className='text-base text-white'>Invalid content format</p>;
    }

    const renderNode = (node: TipTapNode, index: number): React.ReactNode => {
        switch (node.type) {
            case "paragraph":
                const paragraphContent = node.content ? node.content.map((child, i) => renderNode(child, i)) : "";
                return (
                <p key={index} className="text-base text-white">
                    {paragraphContent}
                </p>
                );

            case "heading":
                const level = node.attrs?.level || 1;
                const headingContent = node.content ? node.content.map((child, i) => renderNode(child, i)) : "";
                const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
                return (
                <HeadingTag
                    key={index}
                    className={`mt-8 mb-4 font-bold text-white ${
                    level === 1
                        ? "text-4xl"
                        : level === 2
                        ? "text-3xl"
                        : level === 3
                            ? "text-2xl"
                            : "text-xl"
                    }`}
                >
                    {headingContent}
                </HeadingTag>
                );

            case "blockquote":
                const quoteContent = node.content ? node.content.map((child, i) => renderNode(child, i)) : "";
                return (
                <blockquote
                    key={index}
                    className="relative pl-4 font-semibold text-white italic"
                >
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#7E67C1] to-[#FFB051]" />
                    {quoteContent}
                </blockquote>
                );

            case "bulletList":
            case "orderedList":
                const listContent = node.content ? node.content.map((child, i) => renderNode(child, i)) : "";
                const ListTag = node.type === "orderedList" ? "ol" : "ul";
                return (
                <ListTag
                    key={index}
                    className={`my-4 ml-6 text-white ${
                    node.type === "orderedList" ? "list-decimal" : "list-disc"
                    }`}
                >
                    {listContent}
                </ListTag>
                );

            case "listItem":
                const itemContent = node.content ? node.content.map((child, i) => renderNode(child, i)) : "";
                return <li key={index}>{itemContent}</li>;

            case "image":
                return (
                <img
                    key={index}
                    src={node.attrs?.src || ""}
                    alt={node.attrs?.alt || ""}
                    className="my-4 w-[100px] h-auto rounded-lg"
                />
                );

            case "hardBreak":
                return <br key={index} />;

            case "text":
                let text: React.ReactNode = node.text || "";
                // Apply marks (bold, italic, etc.)
                if (node.marks) {
                node.marks.forEach((mark) => {
                    switch (mark.type) {
                    case "bold":
                        text = <strong key={`bold-${index}`}>{text}</strong>;
                        break;
                    case "italic":
                        text = <em key={`italic-${index}`}>{text}</em>;
                        break;
                    case "underline":
                        text = <u key={`underline-${index}`}>{text}</u>;
                        break;
                    case "strike":
                        text = <s key={`strike-${index}`}>{text}</s>;
                        break;
                    case "link":
                        text = (
                        <a
                            key={`link-${index}`}
                            href={mark.attrs?.href || "#"}
                            className="text-blue-400 underline"
                            target={mark.attrs?.target || "_self"}
                            rel="noopener noreferrer"
                        >
                            {text}
                        </a>
                        );
                        break;
                    }
                });
                }
                return <React.Fragment key={index}>{text}</React.Fragment>;

            default:
                // Fallback for unknown node types
                if (node.content) {
                return (
                    <React.Fragment key={index}>
                    {node.content.map((child, i) => renderNode(child, i))}
                    </React.Fragment>
                );
                }
                return null;
            }
        };

        return (
            <div className="space-y-4">
            {content.content.map((node: TipTapNode, index: number) =>
                renderNode(node, index),
            )}
            </div>
        );
}