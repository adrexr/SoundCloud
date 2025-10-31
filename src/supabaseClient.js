import { createClient } from "@supabase/supabase-js";

// Asegúrate de usar el prefijo VITE_
const supabaseUrl = "https://lupsiqngqvtbqlfcsuru.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1cHNpcW5ncXZ0YnFsZmNzdXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzQ0NzcsImV4cCI6MjA3NDc1MDQ3N30.xYWcXszqlev_jyBL8xOD8L-2E6Ds0R4ixnZyVm3-7Ec"; 

// CLAVE: Si alguna es undefined, la clave es incorrecta
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("ERROR CRÍTICO: Las claves de Supabase no se cargaron desde Vercel.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 