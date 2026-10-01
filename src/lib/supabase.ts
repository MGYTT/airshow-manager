"use client";
import { createClient,type SupabaseClient } from "@supabase/supabase-js";

let client:SupabaseClient|null=null;

export const supabaseConfigured=()=>Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));

export const getSupabase=()=>{
  if(!supabaseConfigured())return null;
  if(!client){
    client=createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
      {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:"pkce"}}
    );
  }
  return client;
};
