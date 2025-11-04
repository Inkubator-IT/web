export interface Tag {
  tag_id: number;
  tag_name: string;
  tag_description: string;
}

export type ContentBlockType = "paragraph" | "header" | "quote";

export interface ContentBlock {
  type: ContentBlockType;
  text: string;
}

export interface Blog {
  id: number;
  title: string;
  author: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  content: ContentBlock[];
  time_read: string;
  tag_id: number;
  tag?: Tag;
  created_at: string;
  updated_at: string;
}
