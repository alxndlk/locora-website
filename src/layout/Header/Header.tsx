"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { links } from "@/lib/nav";
import { signout } from "@/lib/auth-actions";
import { User } from "@supabase/supabase-js";
import { useProfile } from "@/context/ProfileContext";
import HeaderView from "@/app/components/ui/Header/HeaderView";

type HeaderProps = { blackHeader?: boolean };

const HeaderContainer: React.FC<HeaderProps> = ({ blackHeader }) => {
  const [isMobileHeader, setMobileHeader] = useState(false);

  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const { profile } = useProfile();
  const router = useRouter();

  const userName = user?.user_metadata?.full_name ?? user?.email ?? "User";

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription.unsubscribe();
    };
  }, [supabase]);

  const go = (href: string) => router.push(href);
  const openMobile = () => setMobileHeader(true);
  const closeMobile = () => setMobileHeader(false);

  const onSignOut = async () => {
    await signout();
    router.push(links.login.route);
  };

  return (
    <HeaderView
      blackHeader={blackHeader}
      isMobileHeader={isMobileHeader}
      openMobile={openMobile}
      closeMobile={closeMobile}
      user={user}
      userName={userName}
      avatarURL={profile?.avatar_url || "/images/default-avatar.png"}
      links={links}
      onGo={go}
      onSignOut={onSignOut}
    />
  );
};

export default HeaderContainer;
