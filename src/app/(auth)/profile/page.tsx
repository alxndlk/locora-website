import { createServerSupabaseClient } from "@/utils/supabase/server";
import ProfileView from "../../components/Profile/ProfileView";
import { Wrapper } from "@/layout/Wrapper/Wrapper";
import { getUserAchievements } from "@/app/actions/get-user-achievements";

async function enrichCities(cityList: { id: number; visited_at: Date }[]) {
  const results = await Promise.all(
    cityList.map(async (city) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/city/${city.id}`,
          {
            cache: "no-store",
            headers: {
              "x-api-key": process.env.INTERNAL_API_KEY ?? "",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch city");
        const data = await res.json();
        return { ...data, visited_at: city.visited_at };
      } catch {
        return { id: city.id, visited_at: city.visited_at };
      }
    })
  );
  return results;
}

async function enrichCountries(
  countryList: { code: string; visited_at: Date }[]
) {
  const results = await Promise.all(
    countryList.map(async (country) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/country/${country.code}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch country");
        const data = await res.json();
        return { ...data, visited_at: country.visited_at };
      } catch {
        return { code: country.code, visited_at: country.visited_at };
      }
    })
  );
  return results;
}

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

  const { data: visited } = await supabase
    .from("user_visited")
    .select(
      "visited_city_id, visited_city_at, visited_country_code, visited_country_at"
    )
    .eq("user_id", user?.id);

  const uniqueCities = new Map<number, { visited_at: Date }>();
  const uniqueCountries = new Map<string, { visited_at: Date }>();

  visited?.forEach((v) => {
    if (v.visited_city_id) {
      const prev = uniqueCities.get(v.visited_city_id);
      if (!prev || new Date(v.visited_city_at) < new Date(prev.visited_at)) {
        uniqueCities.set(v.visited_city_id, { visited_at: v.visited_city_at });
      }
    }

    if (v.visited_country_code) {
      const prev = uniqueCountries.get(v.visited_country_code);
      if (!prev || new Date(v.visited_country_at) < new Date(prev.visited_at)) {
        uniqueCountries.set(v.visited_country_code, {
          visited_at: v.visited_country_at,
        });
      }
    }
  });

  const cityList = Array.from(uniqueCities.entries()).map(
    ([id, { visited_at }]) => ({
      id,
      visited_at: new Date(visited_at),
    })
  );

  const countryList = Array.from(uniqueCountries.entries()).map(
    ([code, { visited_at }]) => ({
      code,
      visited_at: new Date(visited_at),
    })
  );

  const enrichedCities = await enrichCities(cityList);
  const enrichedCountries = await enrichCountries(countryList);

  return (
    <Wrapper footerLarge={false} blackHeader={true}>
      <ProfileView
        name={user?.user_metadata?.full_name ?? "Traveler"}
        email={user?.email ?? undefined}
        avatarUrl={user?.user_metadata?.avatar_url}
        memberSince={user?.created_at}
        countries={enrichedCountries}
        cities={enrichedCities}
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
