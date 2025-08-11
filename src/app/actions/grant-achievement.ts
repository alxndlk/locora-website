"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function grantAchievement(achievementId: string) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("user_achievements")
    .upsert(
      { user_id: user.id, achievement_id: achievementId },
      { onConflict: "user_id,achievement_id", ignoreDuplicates: true }
    );

  return { ok: !error, error: error?.message };
}
