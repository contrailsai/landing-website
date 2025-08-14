"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

// TipTap
import { EditorContent, useEditor, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import CodeBlock from "@tiptap/extension-code-block"
import Blockquote from "@tiptap/extension-blockquote"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"

// Icons
import { 
  Save, ImageIcon, ChevronDown, ChevronUp, Search, Plus, Edit, 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Code, Quote, List, ListOrdered, Undo, Redo, Link2, 
  AlignLeft, AlignCenter, AlignRight, Type, Heading1, 
  Heading2, Heading3, ArrowLeft, Eye, Clock
} from "lucide-react"

// Types
interface Blog {
  id: number
  title: string | null
  slug: string | null
  description: string | null
  content?: string | null
  featured_image?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  status: 'draft' | 'published'
  views_count: number
  likes_count?: number
  created_at: string
  updated_st: string
}

interface BlogListItem {
  id: number
  title: string | null
  slug: string | null
  description: string | null
  meta_keywords: string | null
  status: 'draft' | 'published'
  views_count: number
  created_at: string
  updated_st: string
}

interface EditorToolbarProps {
  editor: Editor | null
}

interface BlogListProps {
  blogs: BlogListItem[]
  onSelectBlog: (blog: BlogListItem) => void
  onCreateNew: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

// Toolbar Component
const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) return null

  const addImage = (): void => {
    const url = window.prompt('Image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = (): void => {
    const url = window.prompt('Link URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1 rounded hover:bg-gray-200"
        disabled={!editor.can().undo()}
        type="button"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1 rounded hover:bg-gray-200"
        disabled={!editor.can().redo()}
        type="button"
      >
        <Redo size={16} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Heading3 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Type size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Strikethrough size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Code size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <AlignRight size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Quote size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-blue-200' : ''}`}
        type="button"
      >
        <Code size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button onClick={addImage} className="p-1 rounded hover:bg-gray-200" type="button">
        <ImageIcon size={16} />
      </button>
      <button onClick={addLink} className="p-1 rounded hover:bg-gray-200" type="button">
        <Link2 size={16} />
      </button>
    </div>
  )
}

// Blog List Component
const BlogList: React.FC<BlogListProps> = ({ blogs, onSelectBlog, onCreateNew, searchTerm, setSearchTerm }) => {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.meta_keywords?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Editor</h1>
          <button
            onClick={onCreateNew}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
            type="button"
          >
            <Plus size={16} />
            New Blog
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Blog List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectBlog(blog)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {blog.title || 'Untitled'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs ${
                    blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {blog.status}
                  </span>
                  <Edit size={14} />
                </div>
              </div>
              
              {blog.description && (
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {blog.description}
                </p>
              )}
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span>/{blog.slug}</span>
                  {blog.meta_keywords && (
                    <span className="truncate max-w-32">{blog.meta_keywords}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {blog.views_count || 0}
                  </span>
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No blogs found</p>
            <button
              onClick={onCreateNew}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              type="button"
            >
              Create your first blog
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Component
const BlogEditorPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [blogs, setBlogs] = useState<BlogListItem[]>([])
  const [selectedBlog, setSelectedBlog] = useState<BlogListItem | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // Blog data
  const [title, setTitle] = useState<string>("")
  const [slug, setSlug] = useState<string>("")
  const [status, setStatus] = useState<'draft' | 'published'>("draft")
  const [description, setDescription] = useState<string>("")
  const [featuredImage, setFeaturedImage] = useState<string>("")
  const [metaDescription, setMetaDescription] = useState<string>("")
  const [metaKeywords, setMetaKeywords] = useState<string>("")
  const [saving, setSaving] = useState<boolean>(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [showDetails, setShowDetails] = useState<boolean>(false)

  useEffect(() => setMounted(true), [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg'
        }
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 rounded p-4'
        }
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4'
        }
      }),
      Link.configure({ 
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: "<p>Start writing your blog...</p>",
    immediatelyRender: false
  }, [mounted])

  // Fetch blogs
  const fetchBlogs = useCallback(async (): Promise<void> => {
    setLoading(true)
    const { data, error } = await supabase
      .from("Blogs")
      .select("id, title, slug, description, meta_keywords, status, views_count, created_at, updated_st")
      .order("updated_st", { ascending: false })

    if (error) {
      console.error("Error fetching blogs:", error)
    } else {
      setBlogs(data as BlogListItem[] || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (mounted) {
      fetchBlogs()
    }
  }, [mounted, fetchBlogs])

  // Auto-save functionality
  useEffect(() => {
    if (view !== 'editor' || !selectedBlog) return

    const interval = setInterval(() => {
      if (title && slug && editor?.getHTML()) {
        handleSave(true) // Silent save
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [view, selectedBlog, title, slug, editor])

  const handleSave = async (silent: boolean = false): Promise<void> => {
    if (!title || !slug) {
      if (!silent) setErrorMsg("Title and slug are required.")
      return
    }
    
    if (!silent) setSaving(true)
    setErrorMsg("")

    const blogData = {
      title,
      slug,
      description,
      content: editor?.getHTML() || "",
      featured_image: featuredImage,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      status
    }

    let error: any = null
    if (selectedBlog) {
      // Update existing blog
      const result = await supabase
        .from("Blogs")
        .update({ ...blogData, updated_st: new Date().toISOString() })
        .eq("id", selectedBlog.id)
      error = result.error
    } else {
      // Create new blog
      const result = await supabase.from("Blogs").insert([{
        ...blogData,
        views_count: 0,
        likes_count: 0
      }])
      error = result.error
    }

    if (!silent) setSaving(false)
    
    if (error) {
      console.error(error)
      if (!silent) setErrorMsg(error.message)
    } else {
      setLastSaved(new Date())
      if (!silent && !selectedBlog) {
        // If creating new blog, refresh list and go back
        await fetchBlogs()
        setView('list')
        resetEditor()
      }
    }
  }

  const resetEditor = (): void => {
    setTitle("")
    setSlug("")
    setStatus("draft")
    setDescription("")
    setFeaturedImage("")
    setMetaDescription("")
    setMetaKeywords("")
    setSelectedBlog(null)
    editor?.commands.setContent("<p>Start writing your blog...</p>")
    setShowDetails(false)
    setLastSaved(null)
  }

  const handleSelectBlog = async (blog: BlogListItem): Promise<void> => {
    setSelectedBlog(blog)
    
    // Fetch full blog content
    const { data, error } = await supabase
      .from("Blogs")
      .select("*")
      .eq("id", blog.id)
      .single()

    if (error) {
      console.error("Error fetching blog:", error)
      return
    }

    const fullBlog = data as Blog

    // Populate editor with blog data
    setTitle(fullBlog.title || "")
    setSlug(fullBlog.slug || "")
    setStatus(fullBlog.status || "draft")
    setDescription(fullBlog.description || "")
    setFeaturedImage(fullBlog.featured_image || "")
    setMetaDescription(fullBlog.meta_description || "")
    setMetaKeywords(fullBlog.meta_keywords || "")
    editor?.commands.setContent(fullBlog.content || "<p>Start writing your blog...</p>")
    
    setView('editor')
  }

  const handleCreateNew = (): void => {
    resetEditor()
    setView('editor')
  }

  const handleBackToList = (): void => {
    setView('list')
    resetEditor()
  }

  if (!mounted) return null

  if (view === 'list') {
    return (
      <BlogList
        blogs={blogs}
        onSelectBlog={handleSelectBlog}
        onCreateNew={handleCreateNew}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="border-b p-4 flex items-center gap-4 bg-white">
        <button
          onClick={handleBackToList}
          className="p-2 hover:bg-gray-100 rounded"
          type="button"
        >
          <ArrowLeft size={16} />
        </button>
        
        <input
          type="text"
          placeholder="Blog title..."
          className="text-xl font-semibold flex-1 outline-none border-b border-gray-200 focus:border-gray-400 transition"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="slug"
          className="text-sm text-gray-500 border-b border-gray-200 outline-none focus:border-gray-400 transition"
          value={slug}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
        />
        
        <select
          className="text-sm border border-gray-200 rounded px-2 py-1"
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as 'draft' | 'published')}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        {lastSaved && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            Saved {lastSaved.toLocaleTimeString()}
          </div>
        )}
        
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
          type="button"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-100 text-red-600 text-sm p-2">{errorMsg}</div>
      )}

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <EditorToolbar editor={editor} />
        
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <EditorContent 
            editor={editor} 
            className="prose prose-lg max-w-none bg-white p-6 rounded shadow-sm min-h-[500px] focus-within:ring-2 focus-within:ring-blue-500" 
          />
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className="border-t bg-white">
        <button
          className="w-full flex justify-between items-center px-4 py-3 text-gray-600 hover:bg-gray-50"
          onClick={() => setShowDetails(!showDetails)}
          type="button"
        >
          <span className="flex items-center gap-2">
            <ImageIcon size={16} /> Blog Details
          </span>
          {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showDetails && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t">
            <textarea
              placeholder="Short description"
              className="border p-2 rounded w-full h-20 resize-none"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Featured image URL"
              className="border p-2 rounded w-full"
              value={featuredImage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeaturedImage(e.target.value)}
            />
            <textarea
              placeholder="Meta description"
              className="border p-2 rounded w-full h-20 resize-none"
              value={metaDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMetaDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Meta keywords (comma separated)"
              className="border p-2 rounded w-full"
              value={metaKeywords}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMetaKeywords(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogEditorPage