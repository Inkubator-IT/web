export interface TechStack {
  tech_stack_id: number;
  tech_stack_name: string;
  tech_stack_description: string;
  icon_url: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  owner: string;
  url: string;
  category: string;
  scope: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
  tag_id: number | null;
  testimonial: string | null;
  created_at: string;
  updated_at: string;
  tech_stacks?: TechStack[];
}

export interface ProjectFilters {
  scope?: string;
  category?: string;
  featured?: boolean;
  search?: string;
}
