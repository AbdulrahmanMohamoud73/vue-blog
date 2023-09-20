import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL

const anonkey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(url, anonkey)

export default supabase

