import { createServerSupabaseClient } from "@/utils/supabase/server";
import ProfileView from "./components/ProfileView";
import { Wrapper } from "@/layout/Wrapper/Wrapper";
import { getUserAchievements } from "@/app/actions/get-user-achievements";

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = (user?.user_metadata ?? {}) as {
    currency?: "USD" | "EUR" | "GBP" | "JPY" | "AUD";
    temp_unit?: "C" | "F";
    time_fmt?: "12" | "24";
  };

  const achievements = await getUserAchievements();

  const { count } = await supabase
    .from("achievements")
    .select("*", { count: "exact", head: true });

  console.log(count);

  return (
    <Wrapper footerLarge={false} blackHeader={true}>
      <ProfileView
        name={user?.user_metadata?.full_name ?? "Traveler"}
        email={user?.email ?? undefined}
        avatarUrl={
          user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture
        }
        memberSince={user?.created_at}
        countries={0}
        cities={0}
        achievements={achievements.map((a) => ({
          id: a.id,
          label: a.label,
          description: a.description ?? "",
          emoji: a.emoji ?? "",
          color: a.color ?? "",
          achieved_at: new Date(a.achieved_at),
        }))}
        totalAchiements={count!}
        initialPrefs={{
          currency: meta.currency ?? "USD",
          temp_unit: meta.temp_unit ?? "C",
          time_fmt: meta.time_fmt ?? "24",
        }}
      />
    </Wrapper>
  );
}
