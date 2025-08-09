type ISODate = string;

interface UserProfile {
  id: string; // UUID
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  auth_providers?: Array<"google" | "github" | "apple">;
  created_at: ISODate;
  updated_at: ISODate;
  last_login_at?: ISODate;

  preferences?: {
    language?: string; // 'en', 'de'...
    timezone?: string; // 'Europe/Prague'
    currency?: string; // 'USD', 'EUR'
    units?: "metric" | "imperial"; // для расстояний/температуры
    temperature?: "C" | "F";
    notifications?: {
      email?: boolean;
      push?: boolean;
      marketing?: boolean;
    };
    privacy?: {
      share_stats_publicly?: boolean;
    };
  };

  // Локации/интересы
  home_location?: {
    json_name?: string; // лучше ID, чем name
  };

  statistics: {
    visited_cities: Array<{
      json_name?: string; // оставь на пубертатный период
      achieved_at: ISODate;
    }>;
    visited_countries: Array<{
      json_name?: string;
      achieved_at: ISODate;
    }>;
  };

  achievements: Array<{
    key: string;
    achieved_at: ISODate;
  }>;

  // Подписка / план
  plan: {
    name: "basic" | "pro" | "one-time" | "one-time-editing";
    connected_at: ISODate;
  };
}
