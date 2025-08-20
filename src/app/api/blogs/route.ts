// src\app\api\blogs\[slug]\route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Blog = {
    id: string;
    views_count: number;
    [key: string]: any; // A fallback for other properties
};

export async function GET(
    request: Request
) {

    const { data: blogs, error: fetchError } = await supabase
        .from("Blogs")
        .select("id, title, slug, description, featured_image, views_count, likes_count, created_at, status")
        .eq("status", "published") // Only show published blogs
        .order("created_at", { ascending: false });


    // const { data: blog, error: fetchError } = await supabase
        // .from("Blogs")
        // .select<"*", Blog>("*")
        // .eq("slug", slug)
        // .single();

    if (fetchError || !blogs) {
        console.error("Error fetching blog:", fetchError?.message);
        return NextResponse.json(
            { error: "Blog not found or DB error." },
            { status: 404 }
        );
    }

    // Return blogs data
    return NextResponse.json(blogs);
}