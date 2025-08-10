import { createServerSupabaseClient } from "@/utils/supabase/server";
import ProfileView from "./components/ProfileView";
import { Wrapper } from "@/layout/Wrapper/Wrapper";

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const stats = {
    totalTrips: 12,
    countries: 7,
    cities: 24,
    daysOnRoad: 86,
  };

  const recentTrips = [
    {
      id: "1",
      city: "Tokyo",
      country: "Japan",
      dateFrom: "2024-05-02",
      dateTo: "2024-05-12",
    },
    {
      id: "2",
      city: "Lisbon",
      country: "Portugal",
      dateFrom: "2024-03-14",
      dateTo: "2024-03-20",
    },
    {
      id: "3",
      city: "Seoul",
      country: "South Korea",
      dateFrom: "2023-11-01",
      dateTo: "2023-11-08",
    },
  ];

  const badges = [
    {
      id: "b1",
      emoji: "👛",
      color: "linear-gradient(135deg, #c94f7c, #b03060)", // глубокий розовый
    },
    {
      id: "b2",
      emoji: "🌍",
      color: "linear-gradient(135deg, #1b5e20, #0d47a1)", // тёмно-зелёный + глубокий синий
    },
    {
      id: "b3",
      emoji: "⚓️",
      color: "linear-gradient(135deg, #004d73, #002f4b)", // насыщенный морской синий
    },
    {
      id: "b4",
      emoji: "📀",
      color: "linear-gradient(135deg, #b8860b, #996515)", // тёмное золото
    },
    {
      id: "b5",
      emoji: "🗽",
      color: "linear-gradient(135deg, #2c5d87, #1a3852)", // глубокий голубовато-синий
    },
    {
      id: "b6",
      emoji: "🗼",
      color: "linear-gradient(135deg, #1d5e42, #0f3a26)", // тёмно-зелёный
    },
    {
      id: "b7",
      emoji: "🚂",
      color: "linear-gradient(135deg, #cc5500, #8b2500)", // тёмный оранжево-красный
    },
  ];

  return (
    <Wrapper footerLarge={false}>
      <ProfileView
        name={user?.user_metadata?.full_name ?? "Traveler"}
        username={user?.user_metadata?.username}
        email={user?.email ?? undefined}
        avatarUrl={
          user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture
        }
        memberSince={user?.created_at}
        bio={user?.user_metadata?.bio}
        totalTrips={stats.totalTrips}
        countries={stats.countries}
        cities={stats.cities}
        daysOnRoad={stats.daysOnRoad}
        recentTrips={recentTrips}
        badges={badges}
        editHref="/settings/profile"
        exportHref="/profile/export"
        privacyHref="/settings/privacy"
      />
    </Wrapper>
  );
}
