// components/BlogContent.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Import our client-side Supabase instance
import type { Blog } from "@/app/blogs/[slug]/page"; // Import the Blog type
import { HeartIcon } from "lucide-react";

interface BlogContentProps {
    blog: Blog;
}



export default function BlogContent({ blog }: BlogContentProps) {
    // console.log("req blog: ", blog)
    // Initialize state from the props passed by the Server Component
    const [likes, setLikes] = useState(blog.likes_count ?? 0);
    const [isLiked, setIsLiked] = useState(false); // Prevent multiple clicks

    const handleLike = async () => {
        // Disable the button immediately
        setIsLiked(true);

        // Optimistic UI update: increment the count on the screen instantly
        setLikes((currentLikes) => currentLikes + 1);

        // Call the Supabase RPC function directly from the client
        const { error } = await supabase.rpc("increment_likes", {
            blog_id: blog.id,
        });

        if (error) {
            console.error("Error incrementing likes:", error);
            // If the database update fails, revert the optimistic UI update
            setLikes((currentLikes) => currentLikes - 1);
            // And allow the user to try again
            setIsLiked(false);
        }
        // On success, the button stays disabled for this session as requested
    };

    // A reusable button component to avoid repetition
    const LikeButton = () => (
        <div className="flex items-center gap-4">
            <span className="text-lg text-gray-700">{likes} likes</span>
            <button
                onClick={handleLike}
                disabled={isLiked}
                className={`flex items-center gap-2 px-2 py-1 rounded-3xl font-semibold transition-all ${isLiked
                    ? "bg-rose-400 text-white "
                    : "border-2 border-rose-500 hover:bg-rose-500 hover:text-white cursor-pointer"
                    }`}
            >
                <HeartIcon className={isLiked ? "fill-rose-500 stroke-white" : "fill-rose-500 stroke-white"} />
                {isLiked ? "Liked" : "Like"}
            </button>
        </div>
    );

    return (
        <div>

            <div className="min-h-screen">

                {/* Featured Image */}
                {blog.featured_image && (
                    <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}

                {/* Title */}
                <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

                {/* Date & Meta */}
                <div className="text-gray-500 text-sm mb-4 flex items-center flex-wrap gap-4">
                    {blog.created_at && (
                        <span>{blog.created_at.split("T")[0]}</span>
                    )}
                    {blog.views_count !== undefined && (
                        <span>{blog.views_count} views</span>
                    )}
                </div>

                {/* --- LIKE BUTTON AT THE TOP --- */}
                <div className="mb-8">
                    <LikeButton />
                </div>

                {/* Description */}
                {blog.description && (
                    <p className="text-xl font-semibold text-gray-700 mb-8">{blog.description}</p>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

            </div>

            {/* --- LIKE BUTTON AT THE BOTTOM --- */}
            <div className="mt-10 pt-6 border-t mb-32">
                <p className="text-lg font-semibold mb-3">Did you enjoy this post?</p>
                <LikeButton />
            </div>
        </div>
    );
}