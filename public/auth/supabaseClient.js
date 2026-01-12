import { createClient } from '@supabase/supabase-js';

let SUPABASE_URL = "https://djmrrtmkcoyiupmkeblh.supabase.co"
let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseHBjbHRpeW56cXBpd3hrY3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNTgwMjQsImV4cCI6MjA3NDkzNDAyNH0.gKWPPFpPXcN6fiAN72I11uQz714dKwk_Mr_T5ms-oy4"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
