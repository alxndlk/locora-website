import { IconType } from "react-icons";

export type NavLink =
  | {
      name: string;
      route: string;
      description: string;
    }
  | {
      name: string;
      href: string;
      icon: IconType;
      description: string;
    };

export type SecondaryButtonProps = {
  text: string;
  icon?: string;
  iconPosition?: "left" | "right";
  popupMessage?: string;
  popupButton?: string;
  iconSize?: number;
  iconColor?: string;
  buttonSize?: number;
  fontSize?: number;
  fontWeight?: 400 | 500 | 600 | 700;
  onClick?: () => void;
  widthButton?: string;
  paddingButton?: string;
  color?: string;
};

export type PrimaryButtonProps = {
  text: string;
  icon?: string;
  iconPosition?: "left" | "right";
  popupMessage?: string;
  popupButton?: string;
  iconSize?: number;
  iconColor?: string;
  buttonSize?: number;
  fontSize?: number;
  fontWeight?: 400 | 500 | 600 | 700;
  onClick?: () => void;
  widthButton?: string;
  paddingButton?: string;
  type?: "submit" | "reset" | "button" | undefined;
  formAction?: (formData: FormData) => void | Promise<void>;
  loading?: boolean;
};

export type OTPInputProps = {
  digits: string[];
  setInputRef: (idx: number) => (el: HTMLInputElement | null) => void;
  handleChange: (idx: number, val: string) => void;
  handleKeyDown: (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  dividerClassName?: string;
  errorNonce?: number;
  forceShakeNonce?: number;
};

export type ResendCodeProps = {
  onResend: (formData: FormData) => void;
  email: string;
  disabled: boolean;
  emailPending: boolean;
  cooldownLeft: number;
  className?: string;
  buttonClassName?: string;
  textClassName?: string;
};

export type Achievements = {
  id: string;
  label: string;
  description: string;
  achieved_at: Date;
  emoji?: string;
  color?: string;
};

export type Countries = {
  country_code: string;
  country_name: string;
  country_flag: string;
  visited_at: Date;
}[];

export type Cities = {
  id: number;
  city_id: string;
  city_name: string;
  country_code: string;
  country_name: string;
  country_flag: string;
  language?: string | null;
  lat: number;
  lon: number;
  currency_code?: string | null;
  currency_symbol?: string | null;
  currency_name?: string | null;
  population?: string;
  visited_at: Date;
  welcome_message_title?: string;
  welcome_message_body?: string;
  welcome_message_image?: string | null;
}[];

export type ProfileViewProps = {
  name: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
  memberSince?: string;

  countries: Countries;
  cities: Cities;

  achievements: Achievements[];
  totalAchiements: number;
};

export type TempUnit = "C" | "F";
export type TimeFmt = "12" | "24";
export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "AUD"
  | "CZK"
  | "UAH";

export type Prefs = {
  currency?: "USD" | "EUR" | "GBP" | "JPY" | "AUD";
  temp_unit?: "C" | "F";
  time_fmt?: "12" | "24";
};

export type UserAchievement = {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  color?: string;
  achieved_at: string;
};
