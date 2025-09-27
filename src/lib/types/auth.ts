export type OtpState = {
  step: "email" | "code" | "done";
  email?: string;

  message?: string;
  error?: string | boolean;
  loggedIn?: boolean;

  cooldown?: boolean;
  cooldownUntil?: number;

  errorNonce?: number;
  infoNonce?: number;
  forceShakeNonce?: number;
};

export const COOLDOWN_MS = 60_000;
export const SIGNUP_COOLDOWN_MS = 60_000;

export type SignupOtpState = {
  step: "email" | "code" | "done";
  email?: string;
  error?: string;
  message?: string;
  loggedIn?: boolean;
  cooldownUntil?: number;
  errorNonce?: number;
};
