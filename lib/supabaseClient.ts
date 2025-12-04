
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbidrnpgrolwtmlqvxkz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiaWRybnBncm9sd3RtbHF2eGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NjAzMDIsImV4cCI6MjA4MDQzNjMwMn0.L9kw1rSDaqT-Gq5V76G-PfuYmW40cKgFFNydhIjJiOA';

export const supabase = createClient(supabaseUrl, supabaseKey);
