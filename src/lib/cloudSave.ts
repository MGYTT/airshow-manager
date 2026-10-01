"use client";
import { getSupabase } from "./supabase";
import { migrateSaveData,SAVE_KEY,type SaveGame } from "./game";

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


const userCacheKey=(userId:string)=>`${SAVE_KEY}:user:${userId}`;
const LEGACY_OWNER_KEY="airshow-manager-legacy-save-owner";

export function loadUserCache(userId:string):SaveGame|null{
  if(typeof window==="undefined")return null;
  const raw=localStorage.getItem(userCacheKey(userId));
  if(!raw)return null;
  try{return migrateSaveData(JSON.parse(raw))}catch{return null}
}

export function saveUserCache(userId:string,game:SaveGame){
  if(typeof window==="undefined")return;
  localStorage.setItem(userCacheKey(userId),JSON.stringify(game));
}

export function claimLegacyLocalSave(userId:string,legacy:SaveGame|null):SaveGame|null{
  if(typeof window==="undefined"||!legacy)return null;
  const owner=localStorage.getItem(LEGACY_OWNER_KEY);
  if(owner&&owner!==userId)return null;
  localStorage.setItem(LEGACY_OWNER_KEY,userId);
  saveUserCache(userId,legacy);
  return legacy;
}
