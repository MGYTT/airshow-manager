"use client";
import { getSupabase } from "./supabase";
import { migrateSaveData,type SaveGame } from "./game";

export type CloudSaveInfo={game:SaveGame|null;updatedAt:string|null};

export async function loadCloudSave(userId:string):Promise<CloudSaveInfo>{
  const supabase=getSupabase();
  if(!supabase)return {game:null,updatedAt:null};
  const {data,error}=await supabase.from("game_saves").select("save_data,updated_at").eq("user_id",userId).maybeSingle();
  if(error)throw error;
  return {game:data?.save_data?migrateSaveData(data.save_data):null,updatedAt:data?.updated_at??null};
}

export async function saveCloudGame(userId:string,game:SaveGame){
  const supabase=getSupabase();
  if(!supabase)return;
  const {error}=await supabase.from("game_saves").upsert({
    user_id:userId,
    save_data:game,
    save_version:game.version,
    updated_at:new Date().toISOString()
  },{onConflict:"user_id"});
  if(error)throw error;
}

export async function deleteCloudGame(userId:string){
  const supabase=getSupabase();
  if(!supabase)return;
  const {error}=await supabase.from("game_saves").delete().eq("user_id",userId);
  if(error)throw error;
}
