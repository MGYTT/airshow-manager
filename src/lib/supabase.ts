"use client";
import { createClient,type SupabaseClient } from "@supabase/supabase-js";

let client:SupabaseClient|null=null;

const DEFAULT_SUPABASE_URL="https://uuhjvtpuzohzqhjnffzd.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY="sb_publishable_xXPv4DzRT0wiGZm7VbRPtw_c1yCH300";

const supabaseUrl=()=>process.env.NEXT_PUBLIC_SUPABASE_URL||DEFAULT_SUPABASE_URL;
const supabaseKey=()=>process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||DEFAULT_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured=()=>Boolean(supabaseUrl()&&supabaseKey());

export const getSupabase=()=>{
  if(!supabaseConfigured())return null;
  if(!client){
    client=createClient(
      supabaseUrl(),
      supabaseKey(),
      {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:"pkce"}}
    );
  }
  return client;
};
