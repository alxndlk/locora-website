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
