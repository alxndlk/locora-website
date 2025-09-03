"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Profile = {
  id: string;
  avatar_url?: string;
  full_name?: string;
  email?: string;
};

const ProfileContext = createContext<{
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  loading: boolean;
}>({
  profile: null,
  setProfile: () => {},
  loading: true,
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUserId, setLastUserId] = useState<string | null>(null);

  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", { credentials: "include" });
      const data = await res.json();
      if (data?.id) {
        setProfile({
          ...data,
          avatar_url: data.avatar_url
            ? `${data.avatar_url}?v=${Date.now()}`
            : undefined,
        });
        setLastUserId(data.id);
      } else {
        setProfile(null);
        setLastUserId(null);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setProfile(null);
      setLastUserId(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProfile();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUserId = session?.user?.id ?? null;

      if (newUserId !== lastUserId) {
        if (newUserId) {
          fetchProfile();
        } else {
          setProfile(null);
          setLastUserId(null);
        }
      }
    });

    return () => {
      sub?.subscription.unsubscribe();
    };
  }, [supabase, lastUserId]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
