"use client";
import { createContext,useContext,useEffect,useMemo,useState,type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase,supabaseConfigured } from "../lib/supabase";

type AuthContextValue={
  user:User|null;
  loading:boolean;
  configured:boolean;
  signIn:(email:string,password:string)=>Promise<void>;
  signUp:(email:string,password:string,name:string)=>Promise<{needsConfirmation:boolean}>;
  signOut:()=>Promise<void>;
  requestPasswordReset:(email:string)=>Promise<void>;
  updatePassword:(password:string)=>Promise<void>;
  updateName:(name:string)=>Promise<void>;
};

const AuthContext=createContext<AuthContextValue|null>(null);

export default function AuthProvider({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null);
  const [loading,setLoading]=useState(true);
  const configured=supabaseConfigured();

  useEffect(()=>{
    const supabase=getSupabase();
    if(!supabase){setLoading(false);return}
    supabase.auth.getUser().then(({data})=>{setUser(data.user??null);setLoading(false)});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setUser(session?.user??null);setLoading(false)});
    return ()=>subscription.unsubscribe();
  },[]);

  const value=useMemo<AuthContextValue>(()=>({
    user,loading,configured,
    signIn:async(email,password)=>{
      const supabase=getSupabase();if(!supabase)throw new Error("Supabase nie jest skonfigurowany.");
      const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;
    },
    signUp:async(email,password,name)=>{
      const supabase=getSupabase();if(!supabase)throw new Error("Supabase nie jest skonfigurowany.");
      const redirectTo=typeof window!=="undefined"?window.location.origin+"/konto":"";
      const {data,error}=await supabase.auth.signUp({email,password,options:{data:{display_name:name.trim()},emailRedirectTo:redirectTo}});
      if(error)throw error;
      return {needsConfirmation:!data.session};
    },
    signOut:async()=>{const supabase=getSupabase();if(supabase){const {error}=await supabase.auth.signOut();if(error)throw error}},
    requestPasswordReset:async(email)=>{
      const supabase=getSupabase();if(!supabase)throw new Error("Supabase nie jest skonfigurowany.");
      const redirectTo=typeof window!=="undefined"?window.location.origin+"/konto?reset=1":"";
      const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo});if(error)throw error;
    },
    updatePassword:async(password)=>{
      const supabase=getSupabase();if(!supabase)throw new Error("Supabase nie jest skonfigurowany.");
      const {error}=await supabase.auth.updateUser({password});if(error)throw error;
    },
    updateName:async(name)=>{
      const supabase=getSupabase();if(!supabase)throw new Error("Supabase nie jest skonfigurowany.");
      const {error}=await supabase.auth.updateUser({data:{display_name:name.trim()}});if(error)throw error;
    }
  }),[user,loading,configured]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth=()=>{
  const ctx=useContext(AuthContext);
  if(!ctx)throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
