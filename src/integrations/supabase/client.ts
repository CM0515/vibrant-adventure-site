// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://algyqrycooinowmzxgde.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3lxcnljb29pbm93bXp4Z2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTYzMzIsImV4cCI6MjA1NTk5MjMzMn0.YgniDSle22uTzCqor-4R24hP70PmXm-RVtbxRku6DpM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);