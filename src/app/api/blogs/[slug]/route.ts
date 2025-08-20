// src\app\api\blogs\[slug]\route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Blog = {
  id: string; 
  views_count: number;
  [key: string]: any; // A fallback for other properties
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Await the params since it's now a Promise
  const { slug } = await params;

  const { data: blog, error: fetchError } = await supabase
    .from("Blogs")
    .select<"*", Blog>("*")
    .eq("slug", slug)
    .single();

  if (fetchError || !blog) {
    console.error("Error fetching blog:", fetchError?.message);
    return NextResponse.json(
      { error: "Blog not found or DB error." },
      { status: 404 }
    );
  }

  const { error: updateError } = await supabase.rpc("increment_views", {
    blog_id: blog.id,
  });

  if (updateError) {
    console.error("Error incrementing view count:", updateError.message);
  }

  // Return the original blog data
  return NextResponse.json(blog);
}