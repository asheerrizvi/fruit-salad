import { createClient } from "@supabase/supabase-js";

// Initialize the supabase client and add it as a default export.
const supabaseUrl = "https://bmkirdgslnowfvxlxlgz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
