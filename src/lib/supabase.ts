import { createClient } from '@supabase/supabase-js'

// Use environment variables for security
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL: "" 
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY: ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
