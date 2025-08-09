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
};
