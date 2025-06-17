import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://ctwjjghwycfthnqajwhy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0d2pqZ2h3eWNmdGhucWFqd2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzYzMzksImV4cCI6MjA2NTc1MjMzOX0.HRTWmjssvwx8ssBhNtdFbIxJCHbntfsU5aVXX9Vlaq4"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
