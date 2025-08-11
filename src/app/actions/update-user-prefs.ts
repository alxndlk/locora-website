"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type Prefs = {
  currency?: "USD" | "EUR" | "GBP" | "JPY" | "AUD";
  temp_unit?: "C" | "F";
  time_fmt?: "12" | "24";
};

export async function updateUserPrefs(prefs: Prefs) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
    error: getErr,
  } = await supabase.auth.getUser();
  if (getErr || !user) return { ok: false, error: "Not authenticated" };

  const newMeta = { ...(user.user_metadata ?? {}), ...prefs };
  const { error: metaErr } = await supabase.auth.updateUser({ data: newMeta });
  if (metaErr) return { ok: false, error: metaErr.message };

  const patch: Record<string, string> = {};
  if (prefs.currency !== undefined) patch.currency = prefs.currency;
  if (prefs.temp_unit !== undefined) patch.temp_unit = prefs.temp_unit;
  if (prefs.time_fmt !== undefined) patch.time_fmt = prefs.time_fmt;

  if (Object.keys(patch).length > 0) {
    const { error: profErr } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...patch }, { onConflict: "id" });

    if (profErr) return { ok: false, error: profErr.message };
  }

  revalidatePath("/profile");
  return { ok: true };
}
