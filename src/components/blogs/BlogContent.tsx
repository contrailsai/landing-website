// components/BlogContent.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Import our client-side Supabase instance
import type { Blog } from "@/app/blogs/[slug]/page"; // Import the Blog type
import { Share2, BarChartBig, ThumbsUp } from "lucide-react";

interface BlogContentProps {
    blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
    // Initialize state from the props passed by the Server Component
    const [likes, setLikes] = useState(blog.likes_count ?? 0);
    const [isLiked, setIsLiked] = useState(false); // Prevent multiple clicks

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.description || "Check out this blog!",
                    url: window.location.href,
                });
                console.log("Blog shared successfully");
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

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
        <div className="flex items-center gap-1">
            <button
                onClick={handleLike}
                disabled={isLiked}
                className={`flex items-center gap-2 p-1 pb-2 rounded-3xl font-semibold transition-all ${isLiked
                    ? "st"
                    : " hover:scale-105 transition-all cursor-pointer"
                    }`}
            >
                <ThumbsUp className={isLiked ? "stroke-amber-500" : ""} />
            </button>
            <span className="text-lg text-gray-700">{likes}</span>
        </div>
    );

    const date = blog.created_at?.split("T")[0].split("-");

    let date_to_show = ""
    if (date !== undefined) {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Number(date[1]) - 1]; // Fixed index
        const date_end_ranker = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][Number(date[2]) % 10];
        date_to_show = `${date[2] + date_end_ranker} ${month}, ${date[0]}`;
    }

    const read_time = (Number(blog.content.split(" ").length) / 120).toFixed(0);

    return (
        <div>
            <div className="min-h-screen">
                {/* Title */}
                <h1 className="text-5xl font-bold mb-3">{blog.title}</h1>

                {/* Description */}
                {blog.description && (
                    <p className="text-xl text-pretty font-light text-gray-700 mb-8">{blog.description}</p>
                )}

                {/* Date ---------Views | Likes | Share */}
                <div className="text-gray-600 mb-10 flex items-center justify-between flex-wrap gap-4 border-y border-gray-300 py-2">
                    <div className="flex items-center divide-x divide-gray-300">
                        <span className="px-4">
                            {read_time} min read
                        </span>

                        {blog.created_at && (
                            <span className="px-4">
                                {date_to_show}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-5">
                        {blog.views_count !== undefined && (
                            <span className="flex gap-1">
                                <BarChartBig className=" stroke-blue-700" />
                                {blog.views_count}
                            </span>
                        )}
                        {/* --- LIKE BUTTON AT THE TOP --- */}
                        <div className="bg-gray-100 border border-gray-200 rounded-full px-2" >
                            <LikeButton />
                        </div>
                        <div
                            className="cursor-pointer bg-gray-100 rounded-full border border-gray-200 px-2 py-1.5"
                            onClick={handleShare}
                            title="Share this blog"
                        >
                            <Share2 className="stroke-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {blog.featured_image && (
                    <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full aspect-auto object-cover rounded-3xl mb-6"
                    />
                )}

                {/* Content with Enhanced Typography */}
                <div
                    className="prose prose-lg prose-slate max-w-none
                               prose-headings:font-bold 
                               prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                               prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6
                               prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
                               prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4
                               prose-p:mb-4 prose-p:leading-relaxed
                               prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                               prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
                               prose-li:mb-2
                               prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                               prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
                               prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                               prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg
                               prose-strong:font-semibold
                               prose-em:italic"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>

            {/* --- LIKE BUTTON AT THE BOTTOM --- */}
            <div className="mt-16 pt-10 border-t mb-32 flex justify-between items-center">
                <p className="text-xl font-semibold mb-3">Did you enjoy this post?</p>

                <div className="flex gap-5">
                    <div className="bg-gray-100 border border-gray-200 rounded-full px-2" >
                        <LikeButton />
                    </div>
                    <div
                        className="cursor-pointer bg-gray-100 rounded-full border border-gray-200 px-2 py-1.5"
                        onClick={handleShare}
                        title="Share this blog"
                    >
                        <Share2 className="stroke-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}