/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { UserAchievement } from "../../../types";

export async function getUserAchievements(): Promise<UserAchievement[]> {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_achievements")
    .select(
      `
      achieved_at,
      achievement:achievements (
        id, label, description, emoji, color
      )
    `
    )
    .eq("user_id", user.id)
    .order("achieved_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.achievement.id,
    label: row.achievement.label,
    description: row.achievement.description ?? undefined,
    emoji: row.achievement.emoji ?? undefined,
    color: row.achievement.color ?? undefined,
    achieved_at: row.achieved_at,
  }));
}
