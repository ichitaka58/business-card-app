import { UserCard } from "@/src/types";
import { supabase } from "../supabase/client";

export const fetchCardByUserId = async (userId: string): Promise<UserCard> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if(error) throw error;

  return data as UserCard;
}