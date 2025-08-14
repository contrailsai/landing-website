// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import BlogContent from "@/components/blogs/BlogContent"; // Import the new client component
import Top_navbar_title from "@/components/Top_navbar_title";
import Footer from "@/components/Footer";
import Link from "next/link";

// You can export this type from here to be used in BlogContent
export interface Blog {
    id: Number
    slug: string;
    title: string;
    content: string;
    description?: string;
    featured_image?: string;
    meta_description?: string;
    meta_keywords?: string;
    status?: string;
    views_count?: number;
    likes_count?: number;
    created_at?: string;
    updated_st?: string; // Note: You have a typo here, might be updated_at
}

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// export const runtime = 'edge';

// generateMetadata function - now with async params
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params; // Add await here
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return { title: "Blog Not Found" };
    }
    const blog: Blog = await res.json();
    return {
        title: blog.title,
        description: blog.meta_description || blog.description || "",
        keywords: blog.meta_keywords || "",
        openGraph: {
            title: blog.title,
            description: blog.meta_description || "",
            images: blog.featured_image ? [{ url: blog.featured_image }] : [],
        },
    };
}

// This is now a clean Server Component for data fetching
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params; // Add await here

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch blog");
    }

    const blog: Blog = await res.json();

    return (
        <>
            <Top_navbar_title />
            <article className="max-w-4xl mx-auto py-10 px-4">
                {/* breadcrumb     */}
                <div className="flex items-center gap-2 mb-5">
                    <Link className="font-bold text-gray-600" href="/blogs">Blog</Link>
                    /
                    <Link className="font-semibold text-gray-800" href={"/blogs/"+slug}>{slug}</Link>
                </div>

                {/* Pass the server-fetched data to the client component */}
                <BlogContent blog={blog} />
            </article>
            <Footer />
        </>
    );
}