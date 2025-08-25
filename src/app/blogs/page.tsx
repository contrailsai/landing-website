import { WavyBackground } from "@/components/wavy-background"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase";
import { CircleAlertIcon, Calendar, Eye, Heart, ArrowRight, Clock, BookOpenTextIcon } from "lucide-react"
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { headers } from 'next/headers';

export interface BlogsMetaData {
    id: Number
    title: string;
    slug: string;
    description: string;
    featured_image: string;
    views_count?: number;
    likes_count?: number;
    created_at?: string;
    status?: string;
}

const BlogsPage = async () => {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    const res = await fetch(`${protocol}://${host}/api/blogs`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch blog");
    }

    const blogs: BlogsMetaData[] = await res.json();

    if ( !blogs ) {
        return (
            <div className="flex flex-col items-center justify-center p-20 w-full min-h-screen">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-100">
                    <CircleAlertIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-red-500 text-2xl font-semibold text-center mb-2">
                        Unable to Load Blogs
                    </h2>
                    <p className="text-gray-600 text-center">
                        Please try refreshing the page or contact support if the issue persists.
                    </p>
                </div>
            </div>
        )
    }

    // Helper function to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper function to calculate reading time (assuming 200 words per minute)
    const getReadingTime = (description: string) => {
        const words = description.split(' ').length;
        return Math.ceil(words / 50); // Rough estimate based on description
    };

    return (
        <div className="relative min-h-screen bg-white">
            {/* Wavy Background */}
            <div className="absolute inset-0 z-0 ">
                <WavyBackground
                    className="z-0"
                    // colors={["#2530ff", "#2530ff", "#ffffff", "#ffffff"]}
                    colors={["#0253E4", "#0253E4", "#ffffff", "#ffffff"]}
                    backgroundFill="transparent"
                    blur={10}
                />
            </div>

            <Navbar top_animation={false} />

            {/* Hero Section */}
            <div className="z-20 relative">
                <div className="bg-gradient-to-b from-primary via-white/40 to-white backdrop-blur-sm">
                    <div className="px-6 sm:px-12 lg:px-20 py-12 pb-16">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-black mb-4">
                            Our Blogs
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
                            Discover insights, stories, and knowledge from our latest articles
                        </p>
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="relative z-10 min-h-screen px-6 sm:px-12 lg:px-20 py-12 bg-white">
                {blogs && blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <article key={String(blog.id)} className="group">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#2530ff]/20 hover:-translate-y-2">
                                        {/* Featured Image */}
                                        <div className="relative h-48 bg-gradient-to-br from-[#2530ff]/10 to-[#2530ff]/5 overflow-hidden">
                                            {blog.featured_image ? (
                                                <img
                                                    src={blog.featured_image}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <div className="text-6xl font-bold text-[#2530ff]/20">
                                                        {blog.title.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-black mb-3 group-hover:text-[#2530ff] transition-colors duration-200 line-clamp-2">
                                                {blog.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                                                {blog.description}
                                            </p>

                                            {/* Meta Information */}
                                            <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{formatDate( typeof(blog.created_at) == "string" ? blog.created_at : "" )}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{getReadingTime(blog.description)} min read</span>
                                                </div>
                                            </div>

                                            {/* Stats and CTA */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                        <Eye className="w-4 h-4" />
                                                        <span>{blog.views_count || 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                        <Heart className="w-4 h-4" />
                                                        <span>{blog.likes_count || 0}</span>
                                                    </div>
                                                </div>

                                                {/* Read More Button */}
                                                <div className="flex items-center gap-2 bg-[#2530ff] text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-[#2530ff]/90 transition-colors duration-200">
                                                    Read More
                                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg shadow-primary/30 border border-gray-100 max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <BookOpenTextIcon className="size-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blogs Available</h3>
                            <p className="text-gray-500">Check back soon for new articles and insights!</p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BlogsPage;